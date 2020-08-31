"use strict";
// Class definition

jQuery(document).ready(function () {
    var _denominationService = abp.services.app.denomination,
        l = abp.localization.getSource('Payment-vi'),
        _$modalCreate = $('#CreateModal'),
        _$modalEdit = $('#EditModal');

    var currentGameId = (typeof getUrlParameter('gameId') === 'undefined') ? 0 : getUrlParameter('gameId');

    //begin: setup for datatable
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/denomination/index?gameId=' + currentGameId,
                    // sample custom headers
                    // headers: {'x-my-custom-header': 'some value', 'x-test-header': 'the value'},
                    map: function (raw) {
                        // sample data mapping
                        var dataSet = raw;
                        if (typeof raw !== 'undefined') {
                            dataSet = raw;
                        }
                        return dataSet;
                    },
                },
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: true,
        },

        // layout definition
        layout: {
            scroll: false,
            footer: false,
        },

        // column sorting
        sortable: true,

        pagination: false,

        // columns definition
        columns: [
            {
                field: 'id',
                title: 'Id',

            },
            {
                field: 'symbolUrl',
                title: l('Symbol'),
                sortable: false,
                template: function (row) {
                    var img = 'background-image:url(\'/' + row.symbolUrl + '\')';

                    return '<div class="d-flex align-items-center">\
								<div class="symbol symbol-40 flex-shrink-0">\
									<div class="symbol-label" style="' + img + '"></div>\
								</div>\
							</div>';
                }
            },
            {
                field: 'coin',
                title: 'Coin',
                template: function (row) {
                    return formatCurrency(row.coin)
                }
            },
            {
                field: 'money',
                title: 'Denomination',
                template: function (row) {
                    return formatCurrency(row.money)
                }
            },
            {
                field: 'Actions',
                title: 'Hành Động',
                sortable: false,
                width: 125,
                overflow: 'visible',
                autoHide: false,
                template: function (row) {
                    return '\
                        <a href="javascript:;" data-id="' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning mr-2 edit" data-toggle="modal" data-target="#EditModal" title="Edit details">\
                            <i class="flaticon2-edit"></i>\
                        </a>\
                        <a href="javascript:;" data-id="' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-danger btn-hover-danger btn-icon delete" title="Delete">\
                            <i class="flaticon2-trash"></i>\
                    ';
                },
            }],

    });
    // default sort is id desc
    datatable.sort('coin', 'desc');
    //end: setup for datatable

    function create() {
        var _$formCreate = _$modalCreate.find('form');

        if (!_$formCreate.valid()) {
            return;
        }
        // get object denomination from form
        var denomination = _$formCreate.serializeFormToObject();

        if (denomination.SymbolUrl === '') {
            abp.notify.error('Vui lòng chọn biểu tượng!');
            return;
        }

        denomination.GameId = currentGameId;

        //loading
        abp.ui.setBusy();

        _denominationService
            .create(denomination)
            .done(function () {
                abp.notify.success(l('SavedSuccessfully'));
                _$modalCreate.modal('hide');
                resetCreateForm();
                datatable.reload();
            })
            .always(function () {
                abp.ui.clearBusy();
            });
    }

    $(document).on('click', '#CreateModal button[type=submit]', function (e) {
        e.preventDefault();
        create();
    });

    $(document).on('click', '.edit', function (e) {
        e.preventDefault();

        var id = $(this).attr("data-id");
        //loading
        abp.ui.setBusy();

        abp.ajax({
            url: abp.appPath + 'Denomination/EditModal?id=' + id,
            type: 'POST',
            dataType: 'html',
            success: function (content) {
                $('#EditModal>div>.modal-content').html(content);
            },
            error: function (e) { },
            complete: function () {
                abp.ui.clearBusy();
            }
        });
    });

    $(document).on('click', '.delete', function () {
        var id = $(this).attr("data-id");
        deleteDenomination(id);
    });

    function deleteDenomination(id) {
        abp.message.confirm(
            abp.utils.formatString(
                l('AreYouSureWantToDelete'), ''),
            null,
            (isConfirmed) => {
                if (isConfirmed) {
                    _denominationService.delete({
                        id: id
                    }).done(() => {
                        abp.notify.success(l('SuccessfullyDeleted'));
                        datatable.reload();
                    });
                }
            }
        );
    }


    function edit() {
        var _$formEdit = _$modalEdit.find('form');

        if (!_$formEdit.valid()) {
            return;
        }

        var denomination = _$formEdit.serializeFormToObject();

        abp.ui.setBusy();

        _denominationService.update(denomination)
            .done(function () {
                _$modalEdit.modal('hide');
                abp.notify.success(l('SavedSuccessfully'));
                datatable.reload();
            })
            .always(function () {
                abp.ui.clearBusy();
            });
    }

    $(document).on('click',
        '#EditModal button[type=submit]',
        function (e) {
            e.preventDefault();
            edit();
        });

    function resetCreateForm() {
        var _$formCreate = _$modalCreate.find('form');
        _$formCreate[0].reset();
        resetUploadImage();
    }
});
