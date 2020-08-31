jQuery(document).ready(function () {
    var _articleService = abp.services.app.article,
        l = abp.localization.getSource('DarkAge-vi');

    // begin: setup for data table
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/article/index',
                    // sample custom headers
                    // headers: {'x-my-custom-header': 'some value', 'x-test-header': 'the value'},
                    map: function (raw) {
                        // sample data mapping
                        var dataSet = raw;
                        if (typeof raw.data !== 'undefined') {
                            dataSet = raw.data;
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
            field: 'creationTime',
            title: l('CreationTime'),
            template: function (row) {
                var date = new Date(row.creationTime)
                return formatDateTime(date);
            }
        },
        {
            field: 'title',
            title: l('Title'),
        },
        {
            field: 'articleType',
            title: l('Type'),
            // callback function support for column rendering
            template: function (row) {
                var status = {
                    1: {
                        'title': 'Tin Tức',
                        'class': ' label-light-success'
                    },
                    2: {
                        'title': 'Sự Kiện',
                        'class': ' label-light-danger'
                    },
                    3: {
                        'title': 'Hướng Dẫn',
                        'class': 'label-light-primary'
                    },
                    4: {
                        'title': 'Nạp Thẻ',
                        'class': 'label-light-warning'
                    }
                };
                return '<span class="label font-weight-bold label-lg ' + status[row.articleType].class + ' label-inline">' + status[row.articleType].title + '</span>';
            },
        },
        {
            field: 'customUrl',
            title: l('Url'),
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
                        <a href="/article/edit/' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning mr-2" title="Edit details">\
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


    $('#kt_datatable_search_type').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'ArticleType');
    });

    $('#kt_datatable_search_type').selectpicker();
    // end: setup for data table

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
                    _articleService.delete({
                        id: id
                    }).done(() => {
                        abp.notify.success(l('SuccessfullyDeleted'));
                        datatable.reload();
                    });
                }
            }
        );
    }
});
