"use strict";
// Class definition

jQuery(document).ready(function () {
    var _serverService = abp.services.app.server,
        l = abp.localization.getSource('Payment-vi'),
        _$modalCreate = $('#CreateModal'),
        _$modalEdit = $('#EditModal');
    var games = [];
    //begin: setup for datatable
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/server/index',
                    // sample custom headers
                    // headers: {'x-my-custom-header': 'some value', 'x-test-header': 'the value'},
                    map: function (raw) {
                        // sample data mapping
                        var dataSet = raw;
                        if (typeof raw !== 'undefined') {
                            dataSet = raw.servers.data;
                            games = raw.games;
                        }
                        return dataSet;
                    },
                },
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
        },

        // layout definition
        layout: {
            scroll: false,
            footer: false,
        },

        // column sorting
        sortable: true,

        pagination: true,

        search: {
            input: $('#kt_datatable_search_query'),
            key: 'generalSearch'
        },

        // columns definition
        columns: [
            {
                field: 'id',
                title: l('id'),
                sortable: 'desc',
                type: 'number',
                selector: false,
                textAlign: 'center'
            },
            {
                field: 'serverId',
                title: 'serverID',
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
                field: 'gameId',
                title: 'Game',
                selector: false,
                textAlign: 'center',
                template: function (row) {
                    return games[row.gameId].name + " (Game ID: " + row.gameId + ")"
                }
            },
        {
            field: 'Actions',
            title: 'Hành Động',
            sortable: false,
            width: 200  ,
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
                         ';
            },
        }],

    });
    // default sort is id desc
    datatable.sort('id', 'desc');
    //end: setup for datatable
    $('#kt_datatable_search_type').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'GameId');
    });

    $('#kt_datatable_search_type').selectpicker();

    function create() {
        var _$formCreate = _$modalCreate.find('form');

        if (!_$formCreate.valid()) {
            return;
        }
        // get object server from form
        var server = _$formCreate.serializeFormToObject();

        if (server.LogoUrl === '') {
            abp.notify.error('Vui lòng chọn hình ảnh!');
            return;
        }

        //loading
        abp.ui.setBusy();

        _serverService
            .create(server)
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
            url: abp.appPath + 'server/EditModal?id=' + id,
            type: 'POST',
            dataType: 'html',
            success: function(content) {
                $('#EditModal>div>.modal-content').html(content);
            },
            error: function(e) {},
            complete: function() {
                abp.ui.clearBusy();
            }
        });
    });

    $(document).on('click', '.makeDisable', function () {
        var id = $(this).attr("data-id");

        disableserver(id);
    });

    function disableserver(id) {
        abp.ui.setBusy();

        $.ajax({
            url: '/server/Disable?id=' + id,
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
                    _serverService.delete({
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

        var server = _$formEdit.serializeFormToObject();

        abp.ui.setBusy();

        _serverService.update(server)
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
        function(e) {
            e.preventDefault();
            edit();
        });

    function resetCreateForm() {
        var _$formCreate = _$modalCreate.find('form');
        _$formCreate[0].reset();
        resetUploadImage();
    }

});
