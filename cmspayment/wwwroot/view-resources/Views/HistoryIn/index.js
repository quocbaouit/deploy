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
                    url: '/HistoryIn/index',
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
            field: 'ip',
            title: l('Ip'),
        },
        {
            field: 'server',
            title: l('Server'),
        },
        {
            field: 'character',
            title: l('Character'),
        },
        {
            field: 'cardData',
            title: l('CardData'),
        },
        {
            field: 'amount',
            title: l('Amount'),
        }
        //{
        //    field: 'Actions',
        //    title: l('Actions'),
        //    sortable: false,
        //    width: 125,
        //    overflow: 'visible',
        //    autoHide: false,
        //    template: function (row) {
        //        return '\
        //                <a href="/article/edit/' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning mr-2" title="Edit details">\
        //                    <i class="flaticon2-edit"></i>\
        //                </a>\
        //                <a href="javascript:;" data-id="' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-danger btn-hover-danger btn-icon delete" title="Delete">\
        //                    <i class="flaticon2-trash"></i>\
        //                </a>\
        //            ';
        //    },
            //}
        ],

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
