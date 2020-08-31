"use strict";
// Class definition

jQuery(document).ready(function () {
    var _slideService = abp.services.app.slide,
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
                    url: '/slide/index',
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
            title: 'Id',
            sortable: 'desc',
            width: 40,
            type: 'number',
            selector: false,
            textAlign: 'center',
        },
        {
            field: 'creationTime',
            title: 'Ngày Tạo',
            template: function (row) {
                var date = new Date(row.creationTime)
                return formatDateTime(date);
            } 
        },
        {
            field: 'imageUrl',
            title: 'Hình Ảnh',
            sortable: false,
            template: function (row) {
                var img = 'background-image:url(\'/' + row.imageUrl + '\')';

                return '<div class="d-flex align-items-center">\
								<div class="symbol symbol-40 flex-shrink-0">\
									<div class="symbol-label" style="' + img + '"></div>\
								</div>\
							</div>';
            }
        },
        {
            field: 'link',
            title: 'Link',
            template: function (row) {
                return '<a href="' + row.link + '" target="_blank">' + row.link + '</a>';
            } 
        },
        {
            field: 'displayOrder',
            title: 'Thứ Tự',
            width: 100,
            textAlign: 'center'
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
        // get object slide from form
        var slide = _$formCreate.serializeFormToObject();

        if (slide.ImageUrl === '') {
            abp.notify.error('Vui lòng chọn hình ảnh!');
            return;
        }

        //loading
        abp.ui.setBusy();

        _slideService
            .create(slide)
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
            url: abp.appPath + 'Slide/EditModal?id=' + id,
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
                    _slideService.delete({
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

        var slide = _$formEdit.serializeFormToObject();

        abp.ui.setBusy();

        _slideService.update(slide)
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
