jQuery(document).ready(function () {
    var _faqService = abp.services.app.faq,
        l = abp.localization.getSource('DarkAge-vi'),
        _$modalCreate = $('#CreateModal'),
        _$modalEdit = $('#EditModal');

    //begin: setup for datatable
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/faq/index',
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
            footer: false,
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
            width: 40,
            type: 'number',
            selector: false,
            textAlign: 'center',
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
            field: 'title',
            title: l('Title')
        },
        {
            field: 'displayOrder',
            title: l('DisplayOrder'),
            width: 100,
            textAlign: 'center'
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

    //init summernote for create
    initSummernote($('#create-summernote'));

    function create() {
        _$formCreate = _$modalCreate.find('form');

        if (!_$formCreate.valid()) {
            return;
        }

        // if content is empty, stop
        if ($('#create-summernote').summernote('isEmpty')) {
            abp.notify.error(l('PleaseEnterContent'));
            return;
        }

        // get object from form
        var faq = _$formCreate.serializeFormToObject();
        faq.content = $('#create-summernote').summernote('code');
        //loading
        abp.ui.setBusy();

        _faqService
            .create(faq)
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
            url: abp.appPath + 'Faq/EditModal?id=' + id,
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
                    _faqService.delete({
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
        _$formEdit = _$modalEdit.find('form');

        if (!_$formEdit.valid()) {
            return;
        }

        // if content is empty, stop
        if ($('#edit-summernote').summernote('isEmpty')) {
            abp.notify.error(l('PleaseEnterContent'));
            return;
        }

        // get object from form
        var faq = _$formEdit.serializeFormToObject();
        faq.content = $('#edit-summernote').summernote('code');
        //loading
        abp.ui.setBusy();

        _faqService.update(faq)
            .done(function () {
                _$modalEdit.modal('hide');
                abp.notify.success(l('SavedSuccessfully'));
                datatable.reload();
            })
            .always(function () {
                abp.ui.clearBusy();
            });
    }

    $(document).on('click', '#EditModal button[type=submit]', function (e) {
        e.preventDefault();

        edit();
    })

    function resetCreateForm() {
        _$formCreate = _$modalCreate.find('form');
        _$formCreate[0].reset();
        $('#create-summernote').summernote('code', '');
    }
});
