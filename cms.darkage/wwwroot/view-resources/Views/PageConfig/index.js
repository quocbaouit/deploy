jQuery(document).ready(function () {
    var pageConfigService = abp.services.app.pageConfig,
        l = abp.localization.getSource('DarkAge-vi'),
        modalCreate = $('#CreateModal'),
        modalEdit = $('#EditModal');

    //begin: setup for datatable
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/pageconfig/index',
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
        columns: [{
            field: 'id',
            title: l('Id'),
            sortable: 'desc',
            width: 40,
            type: 'number',
            selector: false,
            textAlign: 'center',
        },
        {
            field: 'key',
            title: l('Key'),
            sortable: 'desc'
        },
        {
            field: 'value',
            title: l('Value'),
            sortable: 'desc'
        },
        {
            field: 'description',
            title: l('Description')
        },
        {
            field: 'Actions',
            title: l('Actions'),
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
                        </a>\
                    ';
            },
        }],

    });
    // default sort is id desc
    datatable.sort('id', 'desc');
    //end: setup for datatable

    function create() {
        _$formCreate = modalCreate.find('form');

        if (!_$formCreate.valid()) {
            return;
        }
        // get object slide from form
        var data = _$formCreate.serializeFormToObject();

        //loading
        abp.ui.setBusy();

        pageConfigService
            .create(data)
            .done(function () {
                abp.notify.success(l('SavedSuccessfully'));
                modalCreate.modal('hide');
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
            url: abp.appPath + 'PageConfig/EditModal?id=' + id,
            type: 'POST',
            dataType: 'html',
            success: function (content) {
                $('#EditModal>div>.modal-content').html(content);
            },
            error: function (e) { },
            complete: function () {
                abp.ui.clearBusy();
            }
        })
    });

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
                    pageConfigService.delete({
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
        var formEdit = modalEdit.find('form');

        if (!formEdit.valid()) {
            return;
        }

        var pageConfig = formEdit.serializeFormToObject();

        abp.ui.setBusy();

        pageConfigService.update(pageConfig)
            .done(function () {
                modalEdit.modal('hide');
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
        var formCreate = modalCreate.find('form');
        formCreate[0].reset();
        resetUploadImage();
    }

});
