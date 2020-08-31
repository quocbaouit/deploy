jQuery(document).ready(function () {
    var _giftCodeService = abp.services.app.giftCode,
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
                    url: '/giftCode/index',
                    params: {
                        query: {
                            GiftCodeStatus: status
                        },
                    },
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
            serverFiltering: true,
            serverSorting: true,
        },

        // layout definition
        layout: {
            scroll: false,
            footer: false
        },

        // column sorting
        sortable: true,

        pagination: false,

        search: {
            input: $('#kt_datatable_search_query'),
            key: 'generalSearch'
        },
        // columns definition
        columns: [{
            field: 'id',
            title: l('id'),
            sortable: 'desc',
            type: 'number',
            selector: false,
            textAlign: 'center'
        },
        {
            field: 'code',
            title: l('Code')
        },
       
        {
            field: 'creationTime',
            title: l('CreationTime'),
            template: function (row) {
                var date = new Date(row.creationTime)
                return formatDateTime(date);
            }
        },
        {
            field: 'Actions',
            title: l('Actions'),
            sortable: false,
            width: 125,
            overflow: 'visible',
            autoHide: false,
            template: function (row) {
                return '<a href="javascript:;" data-id="' +
                    row.id +
                    '" class="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning mr-2 edit" data-toggle="modal" data-target="#EditModal" title="Edit details">\
                            <i class="flaticon2-edit"></i>\
                        </a>\
                        <a href="javascript:;" data-id="' +
                    row.id +
                    '" class="btn btn-sm btn-icon btn-bg-light btn-icon-danger btn-hover-danger btn-icon delete" title="Delete">\
                            <i class="flaticon2-trash"></i>\
                        </a>';
            }
        }]

    });
    // default sort is id desc
    datatable.sort('id', 'desc');
    //end: setup for datatable

    //init summernote for create
    $('#create-summernote').summernote({
        height: 500
    });
    $(document).on('click', '#CreateModal button[type=submit]', function (e) {
        e.preventDefault();
        create();
    });
    function create() {
        var _$formCreate = _$modalCreate.find('form');

        if (!_$formCreate.valid()) {
            return;
        }
        // get object giftCode from form
        var giftCode = _$formCreate.serializeFormToObject();


        //loading
        abp.ui.setBusy();

        _giftCodeService
            .create(giftCode)
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

    $(document).on('click', '.edit', function (e) {
        e.preventDefault();

        var id = $(this).attr("data-id");
        //loading
        abp.ui.setBusy();

        abp.ajax({
            url: abp.appPath + 'GiftCode/EditModal?id=' + id,
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

    $(document).on('click',
        '#EditModal button[type=submit]',
        function (e) {
            e.preventDefault();
            edit();
        });

    function edit() {
        var _$formEdit = _$modalEdit.find('form');

        if (!_$formEdit.valid()) {
            return;
        }

        var giftCode = _$formEdit.serializeFormToObject();

        abp.ui.setBusy();

        _giftCodeService.update(giftCode)
            .done(function () {
                _$modalEdit.modal('hide');
                abp.notify.success(l('SavedSuccessfully'));
                datatable.reload();
            })
            .always(function () {
                abp.ui.clearBusy();
            });
    }

    $(document).on('click', '.delete', function () {
        var id = $(this).attr("data-id");

        deleteGiftCode(id);
    });

    $(document).on('click', '.complete', function () {
        var id = $(this).attr("data-id");

        completeGiftCode(id);
    });

    function completeGiftCode(id) {
        abp.ui.setBusy();

        $.ajax({
            url: '/GiftCode/Complete?id=' + id,
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

    function deleteGiftCode(id) {
        abp.message.confirm(
            abp.utils.formatString(
                l('AreYouSureWantToDelete'), ''),
            null,
            (isConfirmed) => {
                if (isConfirmed) {
                    _giftCodeService.delete({
                        id: id
                    }).done(() => {
                        abp.notify.success(l('SuccessfullyDeleted'));
                        datatable.reload();
                    });
                }
            }
        );
    }

    function resetCreateForm() {
        var _$formCreate = _$modalCreate.find('form');
        _$formCreate[0].reset();
        resetUploadImage();
    }
});
