jQuery(document).ready(function () {
    var _galleryService = abp.services.app.gallery,
        l = abp.localization.getSource('DarkAge-vi'),
        _$modalCreate = $('#CreateModal'),
        _$modalEdit = $('#EditModal'),
        currentType = 1,
        imageType = 1,
        videoType = 2;

    //begin: setup for datatable
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/gallery/index',
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
            field: 'creationTime',
            title: l('CreationTime'),
            template: function (row) {
                var date = new Date(row.creationTime)
                return formatDateTime(date);
            }
        },
        {
            field: 'ThumbnailUrl',
            title: l('Thumbnail'),
            sortable: false,
            template: function (row) {
                var img = 'background-image:url(\'/' + row.thumbnailUrl + '\')';

                return '<div class="d-flex align-items-center">\
								<div class="symbol symbol-40 flex-shrink-0">\
									<div class="symbol-label" style="' + img + '"></div>\
								</div>\
							</div>';
            }
        },
        {
            field: 'galleryType',
            title: l('Type'),
            sortable: false,
            // callback function support for column rendering
            template: function (row) {
                var status = {
                    1: {
                        'title': 'Image',
                        'class': ' label-light-danger'
                    },
                    2: {
                        'title': 'Video',
                        'class': ' label-light-primary'
                    },
                };
                return '<span class="label font-weight-bold label-lg ' + status[row.galleryType].class + ' label-inline">' + status[row.galleryType].title + '</span>';
            },
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

    prepareCreateGallery();
    prepareEditGallery();

    function prepareCreateGallery() {
        var galleryType = parseInt($("#GalleryTypeCombobox").val());

        // Show fields depended
        switch (galleryType) {
            case imageType:
                currentType = imageType;
                $('.create-video-gallery').hide();
                $('.create-image-gallery').show();
                break;
            case videoType:
                currentType = videoType;
                $('.create-video-gallery').show();
                $('.create-image-gallery').hide();
                break;
        }
    }

    function prepareEditGallery() {
        var galleryType = parseInt($("#EditGalleryTypeCombobox").val());

        // Show fields depended
        switch (galleryType) {
        case imageType:
            currentType = imageType;
                $('.edit-video-gallery').hide();
                $('.edit-image-gallery').show();
            break;
        case videoType:
            currentType = videoType;
                $('.edit-video-gallery').show();
                $('.edit-image-gallery').hide();
            break;
        }
    }

    function create() {
        _$formCreate = _$modalCreate.find('form');

        if (!_$formCreate.valid()) {
            return;
        }
        // get object gallery from form
        var gallery = _$formCreate.serializeFormToObject();

        if (validate(gallery) === false) {
            return;
        }

        //loading
        abp.ui.setBusy();

        _galleryService
            .create(gallery)
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

    function validate(gallery) {
        var galleryType = parseInt(gallery.GalleryType);

        if (gallery.ThumbnailUrl === '') {
            abp.notify.error(l('PleaseChooseThumbnail'));
            return false;
        }

        if (galleryType === imageType) {
            if (gallery.ImageUrl === '') {
                abp.notify.error(l('PleaseChooseImage'));
                return false;
            }
        }

        else if (galleryType === videoType) {
            if (gallery.VideoUrl === '') {
                abp.notify.error(l('PleaseEnterUrl'));
                return false;
            }
        }

        return true;
    }
    $(document).on('click', '#CreateModal button[type=submit]', function (e) {
        e.preventDefault();
        create();
    });

    $(document).on('change',
        '#GalleryTypeCombobox',
        function (e) {
            prepareCreateGallery();
        });

    $(document).on('change',
        '#EditGalleryTypeCombobox',
        function (e) {
            prepareEditGallery();
        });

    $(document).on('click', '.edit', function (e) {
        e.preventDefault();

        var id = $(this).attr("data-id");
        //loading
        abp.ui.setBusy();

        abp.ajax({
            url: abp.appPath + 'Gallery/EditModal?id=' + id,
            type: 'POST',
            dataType: 'html',
            success: function (content) {
                $('#EditModal>div>.modal-content').html(content);
                prepareEditGallery();
            },
            error: function (e) { },
            complete: function () {
                abp.ui.clearBusy();
            }
        })
    });

    $(document).on('click', '.delete', function () {
        var id = $(this).attr("data-id");

        deleteGallery(id);
    });

    function deleteGallery(id) {
        abp.message.confirm(
            abp.utils.formatString(
                l('AreYouSureWantToDelete'), ''),
            null,
            (isConfirmed) => {
                if (isConfirmed) {
                    _galleryService.delete({
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

        var gallery = _$formEdit.serializeFormToObject();
        if (validate(gallery) === false) {
            return;
        }
        abp.ui.setBusy();

        _galleryService.update(gallery)
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
        resetUploadImage();
    }

});
