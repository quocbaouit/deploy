"use strict";
// Class definition

jQuery(document).ready(function () {
    var _gameService = abp.services.app.game,
        l = abp.localization.getSource('Payment-vi'),
        _$modalCreate = $('#CreateModal'),
        _$modalEdit = $('#EditModal');

    //begin: setup for datatable
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/game/index',
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
                field: 'gameId',
                title: 'GameID',
                selector: false,
                textAlign: 'center',
            },
            {
                field: 'appId',
                title: 'AppId',
                selector: false,
                textAlign: 'center',
            },
            {
                field: 'name',
                title: 'Name',
                selector: false,
                textAlign: 'center',
            },

            {
                field: 'logoUrl',
                title: 'Hình Ảnh',
                sortable: false,
                template: function (row) {
                    var img = 'background-image:url(\'/' + row.logoUrl + '\')';

                    return '<div class="d-flex align-items-center">\
								<div class="symbol symbol-40 flex-shrink-0">\
									<div class="symbol-label" style="' + img + '"></div>\
								</div>\
							</div>';
                }
            },
            {
                field: 'IsActive',
                title: l('Status'),
                // callback function support for column rendering
                template: function (row) {
                    var status = {
                        0: {
                            'title': l('Active'),
                            'class': ' label-light-success'
                        },
                        1: {
                            'title': l('Deactivated'),
                            'class': ' label-light-danger'
                        }
                    };
                    return '<span class="label font-weight-bold label-lg ' + status[row.isActive ? 0 : 1].class + ' label-inline">' + status[row.isActive ? 0 : 1].title + '</span>';
                },
            },
            {
                field: 'Actions',
                title: 'Hành Động',
                sortable: false,
                width: 200,
                overflow: 'visible',
                autoHide: false,
                template: function (row) {
                    return '\
                        <a href="javascript:;" data-id="' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning mr-2 edit" data-toggle="modal" data-target="#EditModal" title="Edit details">\
                            <i class="flaticon2-edit"></i>\
                        </a>\
                        <a href="javascript:;" data-id="' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-danger btn-hover-danger btn-icon delete" title="Delete">\
                            <i class="flaticon2-trash"></i>\
                        </a>\
                                        <a href="javascript:;" data-id="' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-success btn-hover-success  btn-icon makeDisable" title="Active or Deactive">\
                            <i class="flaticon-multimedia-5"></i>\
                        </a>\
                        <a href="/Denomination/index?gameId=' + row.id +
                        '" class="btn btn-sm btn-icon btn-bg-light btn-icon-info btn-hover-info btn-icon" title="Denomination">\
                                 <i class="flaticon-eye"></i>\
                             </a>\
                         ';
                },
            }],

    });
    // default sort is id desc
    datatable.sort('id', 'desc');
    //end: setup for datatable

    function create() {
        var _$formCreate = _$modalCreate.find('form');

        if (!_$formCreate.valid()) {
            return;
        }
        // get object game from form
        var game = _$formCreate.serializeFormToObject();

        if (game.LogoUrl === '') {
            abp.notify.error('Vui lòng chọn hình ảnh!');
            return;
        }

        //loading
        abp.ui.setBusy();

        _gameService
            .create(game)
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
            url: abp.appPath + 'Game/EditModal?id=' + id,
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

    $(document).on('click', '.makeDisable', function () {
        var id = $(this).attr("data-id");

        disableGame(id);
    });

    function disableGame(id) {
        abp.ui.setBusy();

        $.ajax({
            url: '/Game/Disable?id=' + id,
            type: 'POST',
            dataType: 'json',
            success: function (exist) {
                abp.notify.success(l('Completed'));
                datatable.reload();
            },
            error: function (e) { },
            complete: function () {
                abp.ui.clearBusy();

            }
        });
    }

    $(document).on('click', '.delete', function () {
        var id = $(this).attr("data-id");
        deleteSlide(id);
    });

    function deleteSlide(id) {
        abp.message.confirm(
            abp.utils.formatString(
                l('AreYouSureWantToDelete'), ''),
            null,
            (isConfirmed) => {
                if (isConfirmed) {
                    _gameService.delete({
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

        var game = _$formEdit.serializeFormToObject();

        abp.ui.setBusy();

        _gameService.update(game)
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
