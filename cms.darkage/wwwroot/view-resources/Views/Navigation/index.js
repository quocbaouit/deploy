"use strict";
// Class definition

jQuery(document).ready(function () {
    // Init Services
    var navigationService = abp.services.app.navigation;
    var l = abp.localization.getSource('DarkAge-vi');

    // Get
    var currentNavigationId = (typeof getUrlParameter('id') === 'undefined') ? 0 : getUrlParameter('id');
    if (currentNavigationId) {
        $('.nav-child-back-btn').show();
    }
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    method: 'POST',
                    url: '/navigation/index?id=' + currentNavigationId,
                    // sample custom headers
                    // headers: {'x-my-custom-header': 'some value', 'x-test-header': 'the value'},
                    map: function (raw) {
                        // sample data mapping
                        var dataSet = raw;
                        if (typeof raw.result !== 'undefined') {
                            dataSet = raw.result;
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
            footer: false
        },

        // column sorting
        sortable: true,
        order: [[1, 'asc']],

        pagination: false,

        search: {
            input: $('#kt_datatable_search_query'),
            key: 'generalSearch'
        },

        // columns definition
        columns: [
            {
                field: 'id',
                title: l('Id'),
                sortable: true,
                width: 30,
                textAlign: 'center'
            },
            {
                field: 'title',
                title: l('Title')
            },
            {
                field: 'navigationType',
                title: l('Type'),
                sortable: false,
                // callback function support for column rendering
                template: function (row) {
                    var status = {
                        1: {
                            'title': 'Dropdown',
                            'class': ' label-light-success'
                        },
                        2: {
                            'title': 'Link',
                            'class': ' label-light-danger'
                        },
                        3: {
                            'title': 'Article',
                            'class': ' label-light-primary'
                        },
                    };
                    return '<span class="label font-weight-bold label-lg ' + status[row.navigationType].class + ' label-inline">' + status[row.navigationType].title + '</span>';
                },
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
                field: 'displayOrder',
                title: l('DisplayOrder'),
                width: 100,
                textAlign: 'center'
            },
            {
                field: 'customUrl',
                title: l('Url')
            },
            {
                field: 'Actions',
                title: l('Actions'),
                sortable: false,
                width: 125,
                overflow: 'visible',
                autoHide: false,
                template: function (row) {
                    var result = '';
   
                    result += '\
                        <a href="#' + row.id + '" data-id="' +
                            row.id +
                            '" ' +
                            'class="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning mr-2 edit"  ' +
                            'data-toggle="modal" data-target="#EditModal" title="Edit details">\
                            <i class="flaticon2-edit"></i>\
                        </a>\
                        <a href="javascript:;" data-id="' +
                            row.id +
                            '" class="btn btn-sm btn-icon btn-bg-light btn-icon-danger btn-hover-danger btn-icon mr-2 delete" title="Delete">\
                            <i class="flaticon2-trash"></i>\
                        </a>';

                    if (parseInt(row.parent) === 0 && parseInt(row.navigationType) === 1) {
                        result += '\<a href="/navigation/index?id=' +
                            row.id +
                            '" data-id="' +
                            row.id +
                            '" class="btn btn-sm btn-icon btn-bg-light btn-icon-info btn-hover-success btn-icon" title="View">\
                            <i class="flaticon-eye"></i>\
                        </a>';
                    }
                    return result;
                }
            }]


    });
    // default sort is id desc
    datatable.sort('id', 'desc');
    //end: setup for datatable

    //init summernote for create
    initSummernote($('#create-summernote'));

    // Declare variables
    var _$modalCreate = $("#CreateModal");
    var _$modalEdit = $("#EditModal");
    var formLink = $('#form-link');
    var formModal = $('#form-modal');
    var createForm = $('#NavigationCreationForm');
    var editForm = $('#NavigationEditForm');
    var formLinkInput = $('input[name=Link]');
    var formContentInput = $('textarea[name=Content]');
    var currentType = 1;
    var dropdownType = 1;
    var linkType = 2;
    var articleType = 3;

    prepareCreateForm();

    $(document).on('click', '#CreateModal button[type=submit]', function (e) {
        e.preventDefault();
        create();
    });

    $(document).on('click', '#EditModal button[type=submit]', function (e) {
        e.preventDefault();
        edit();
    });


    // Edit
    $(document).on('click', '.edit', function (e) {
        e.preventDefault();

        var id = $(this).attr("data-id");
        //loading
        abp.ui.setBusy();
        abp.ajax({
            url: abp.appPath + 'Navigation/EditModal?id=' + id,
            method: "POST",
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

    // Delete
    $(document).on('click', '.delete', function () {
        var id = $(this).attr("data-id");
        deleteNavigation(id);
    });

    function validate(input) {
        var type = parseInt(input.NavigationType);

        if (input.Title === '') {
            abp.notify.error(l('PleaseEnterTitle'));
            return false;
        }

        if (type === articleType) {
            if (input.CustomUrl === '') {
                abp.notify.error(l('PleaseEnterUrl'));
                return false;
            }

            if (!checkValidUrl(input.CustomUrl)) {
                return false;
            }

            if (input.Content === '<p><br></p') {
                abp.notify.error(l('PleaseEnterContent'));
                return false;
            }
        }
        else if (type === linkType){
            if (input.Link === '') {
                abp.notify.error(l('PleaseEnterLink'));
                return false;
            }
        }
        return true;
    }

    // Create 
    function create() {
        if (!createForm.valid()) {
            return;
        }

        var input = createForm.serializeFormToObject();
        input.Content = $('#create-summernote').summernote('code');
        input.Parent = currentNavigationId;

        if (!validate(input)) {
            return;
        }

        abp.ui.setBusy();

        var type = parseInt(input.NavigationType);

        if (type === articleType) {
            $.ajax({
                url: '/Navigation/CheckExistUrl?id=0&&url=' + input.CustomUrl,
                type: 'POST',
                dataType: 'json',
                success: function (exist) {
                    if (exist == true) {
                        abp.notify.error(l('UrlExist'));
                    }
                    else {
                        abp.services.app.navigation.create(input)
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
                },
                error: function (e) { },
                complete: function () {
                    abp.ui.clearBusy();
                }
            })
        } else {
            abp.services.app.navigation.create(input)
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
 
    };

    // Edit
    function edit() {
        var _$formEdit = _$modalEdit.find('form');

        if (!_$formEdit.valid()) {
            return;
        }

        var input = _$formEdit.serializeFormToObject();
        if (parseInt(input.NavigationType) === articleType) {
            input.Content = $('#edit-summernote').summernote('code');
        }
       
        if (!validate(input)) {
            return;
        }

        abp.ui.setBusy();



        if (input.CustomUrl !== '') {
            $.ajax({
                url: '/Navigation/CheckExistUrl?id=' + input.Id + '&&url=' + input.CustomUrl,
                type: 'POST',
                dataType: 'json',
                success: function (exist) {
                    if (exist == true) {
                        abp.notify.error(l('UrlExist'));
                    }
                    else {
                        navigationService.update(input)
                            .done(function () {
                                _$modalEdit.modal('hide');
                                abp.notify.success(l('SavedSuccessfully'));
                                datatable.reload();
                            })
                            .always(function () {
                                abp.ui.clearBusy();
                            });
                    }
                },
                error: function (e) { },
                complete: function () {
                    abp.ui.clearBusy();
                }
            })
        }
        else {
            navigationService.update(input)
                .done(function () {
                    _$modalEdit.modal('hide');
                    abp.notify.success(l('SavedSuccessfully'));
                    datatable.reload();
                })
                .always(function () {
                    abp.ui.clearBusy();
                });
        }


    }

    // Function Util
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    function deleteNavigation(id) {
        abp.message.confirm(
            abp.utils.formatString(
                l('AreYouSureWantToDelete'), ''),
            null,
            (isConfirmed) => {
                if (isConfirmed) {
                    navigationService.delete({
                        id: id
                    }).done(() => {
                        abp.notify.success(l('SuccessfullyDeleted'));
                        datatable.reload();
                    });
                }
            }
        );
    }

    function prepareCreateForm() {
        createForm.find('input:first').focus();
        createForm.validate();

        var navigationType = parseInt($('#NavigationTypeCombobox').val());

        // Show fields depended
        switch (navigationType) {
            case dropdownType:
                currentType = dropdownType;
                formModal.hide();
                formLink.hide();
                break;
            case linkType:
                currentType = linkType;
                formModal.hide();
                formLink.show();
                break;
            case articleType:
                currentType = articleType;
                formModal.show();
                formLink.hide();
                break;
        }
    }

    function resetCreateForm() {
        var $formCreate = _$modalCreate.find('form');
        if ($formCreate[0]) {
            $formCreate[0].reset();
        }
        $('#create-summernote').summernote('code', '');
        prepareCreateForm();
    }

    //function resetEditForm() {
    //    var $formEdit = _$modalEdit.find('form');
    //    if ($formEdit[0]) {
    //        $formEdit[0].reset();
    //    }
    //}

    function formatDateTime(date) {
        return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +
            ' ' + date.getHours() + ':' + ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes());
    }

    // Binding event

    $('#NavigationTypeCombobox').on('change', function (e) {
        var type = parseInt(e.currentTarget.value);

        // Show fields depended
        switch (type) {
            case dropdownType:
                currentType = dropdownType;
                formModal.hide();
                formLink.hide();
                break;
            case linkType:
                currentType = linkType;
                formModal.hide();
                formLink.show();
                break;
            case articleType:
                currentType = articleType;
                formModal.show();
                formLink.hide();
                break;
        }
    });

    $('#kt_datatable_search_status').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'Status');
    });

    $('#kt_datatable_search_type').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'NavigationType');
    });

    //$('.dissmiss').on('click', function () {
    //    resetCreateForm();
    //    resetEditForm();
    //});

    $('#kt_datatable_search_status, #kt_datatable_search_type').selectpicker();

});
