"use strict";
// Class definition

jQuery(document).ready(function () {
    var _characterService = abp.services.app.character,
        l = abp.localization.getSource('DarkAge-vi'),
        _$modalEdit = $('#EditModal');

    //begin: setup for datatable
    var datatable = $('#kt_datatable').KTDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: '/character/index',
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
            field: 'name',
            title: l('CharacterName')
        },
        {
            field: 'imageOfCharacterUrl',
            title: l('Image'),
            sortable: false,
            template: function (row) {
                var img = 'background-image:url(\'/' + row.imageOfCharacterUrl + '\')';

                return '<div class="d-flex align-items-center">\
								<div class="symbol symbol-40 flex-shrink-0">\
									<div class="symbol-label" style="' + img + '"></div>\
								</div>\
							</div>';
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
                return '\
                        <a href="javascript:;" data-id="' + row.id + '" class="btn btn-sm btn-icon btn-bg-light btn-icon-warning btn-hover-warning mr-2 edit" data-toggle="modal" data-target="#EditModal" title="Edit details">\
                            <i class="flaticon2-edit"></i>\
                        </a>\
                    ';
            },
        }],

    });
    // default sort is id desc
    datatable.sort('id', 'asc');
    //end: setup for datatable

    $(document).on('click', '.edit', function (e) {
        e.preventDefault();

        var id = $(this).attr("data-id");
        //loading
        abp.ui.setBusy();

        abp.ajax({
            url: abp.appPath + 'Character/EditModal?id=' + id,
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

    function edit() {
        var _$formEdit = _$modalEdit.find('form');

        if (!_$formEdit.valid()) {
            return;
        }

        var character = _$formEdit.serializeFormToObject();

        if (validate(character) === false) {
            return;
        }

        abp.ui.setBusy();

        _characterService.update(character)
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
        function (e) {
            e.preventDefault();
            edit();
        });

    function validate(character) {
        if (character.ImageOfCharacterUrl === '') {
            abp.notify.error(l('PleaseChooseImageForCharacter'));
            return false;
        }

        if (character.ImageOfNameUrl === '') {
            abp.notify.error(l('PleaseChooseImageForCharacterName'));
            return false;
        }

        return true;
    }
});
