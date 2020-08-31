jQuery(document).ready(function () {
    var _ticketService = abp.services.app.ticket,
        l = abp.localization.getSource('Payment-vi');
    var pageType = location.search.split('status=')[1];
    var status = 1;
    if (pageType === "open") {
        status = 1;
    }
    if (pageType === "done") {
        status = 2;
    }

    //begin: setup for datatable
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/ticket/index',
                    params: {
                        query: {
                            TicketStatus: status
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
            input: $('#kt_datatable_search_type'),
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
            textAlign: 'center'
        },
        {
            field: 'email',
            title: l('Email')
            },
            {
                field: 'content',
                title: l('Content')
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
            field: 'status',
            title: l('Status'),
            // callback function support for column rendering
            template: function (row) {
                var status = {
                    1: {
                        'title': l('TicketOpen'),
                        'class': ' label-light-danger'
                    },
                    2: {
                        'title': l('TicketDone'),
                        'class': ' label-light-success'
                    }                  
                };
                return '<span class="label font-weight-bold label-lg ' + status[row.status].class + ' label-inline">' + status[row.status].title + '</span>';
            },
        },
        {
            field: 'Actions',
            title: l('Actions'),
            sortable: false,
            width: 125,
            overflow: 'visible',
            autoHide: false,
            template: function (row) {
                var result = '\<a href="/Ticket/detail?id=' +
                    row.id +
                    '" data-id="' +
                    row.id +
                    '" class="btn btn-sm btn-icon btn-bg-light btn-icon-info btn-hover-info btn-icon mr-2" title="' + l('View') + '">\
                            <i class="flaticon-eye"></i>\
                        </a>';


                if (pageType === 'open') {
                    result += '<a href="javascript:;" data-id="' +
                        row.id +
                        '" class="btn btn-sm btn-icon btn-bg-light btn-icon-success btn-hover-success btn-icon complete mr-2" title="' + l('Complete') + '">\
                            <i class="flaticon2-checkmark"></i>\
                        </a>';
                    result += '<a href="javascript:;" data-id="' +
                        row.id +
                        '" class="btn btn-sm btn-icon btn-bg-light btn-icon-danger btn-hover-danger btn-icon delete" title="' + l('Delete') + '">\
                            <i class="flaticon2-trash"></i>\
                        </a>';

                }
                return result;
            },
        }],

    });
    // default sort is id desc
    datatable.sort('id', 'desc');
    //end: setup for datatable

    //init summernote for create
    $('#create-summernote').summernote({
        height: 500
    });

    $(document).on('click', '.delete', function () {
        var id = $(this).attr("data-id");

        deleteTicket(id);
    });

    $(document).on('click', '.complete', function () {
        var id = $(this).attr("data-id");

        completeTicket(id);
    });

    function completeTicket(id) {
        abp.ui.setBusy();

        $.ajax({
            url: '/Ticket/Complete?id=' + id,
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

    function deleteTicket(id) {
        abp.message.confirm(
            abp.utils.formatString(
                l('AreYouSureWantToDelete'), ''),
            null,
            (isConfirmed) => {
                if (isConfirmed) {
                    _ticketService.delete({
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
