var l = abp.localization.getSource('Payment-vi');

(function ($) {
    //Notification handler
    abp.event.on('abp.notifications.received', function (userNotification) {
        abp.notifications.showUiNotifyForUserNotification(userNotification);

        //Desktop notification
        Push.create("Payment", {
            body: userNotification.notification.data.message,
            icon: abp.appPath + 'img/logo.png',
            timeout: 6000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    });

    //serializeFormToObject plugin for jQuery
    $.fn.serializeFormToObject = function (camelCased = false) {
        //serialize to array
        var data = $(this).serializeArray();

        //add also disabled items
        $(':disabled[name]', this).each(function () {
            data.push({ name: this.name, value: $(this).val() });
        });

        //map to object
        var obj = {};
        data.map(function (x) { obj[x.name] = x.value; });

        if (camelCased && camelCased === true) {
            return convertToCamelCasedObject(obj);
        }

        return obj;
    };

    //Configure blockUI
    if ($.blockUI) {
        $.blockUI.defaults.baseZ = 2000;
    }

    //Configure validator
    $.validator.setDefaults({
        highlight: (el) => {
            $(el).addClass('is-invalid');
        },
        unhighlight: (el) => {
            $(el).removeClass('is-invalid');
        },
        errorElement: 'p',
        errorClass: 'text-danger',
        errorPlacement: (error, element) => {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    function convertToCamelCasedObject(obj) {
        var newObj, origKey, newKey, value;
        if (obj instanceof Array) {
            return obj.map(value => {
                if (typeof value === 'object') {
                    value = convertToCamelCasedObject(value);
                }
                return value;
            });
        } else {
            newObj = {};
            for (origKey in obj) {
                if (obj.hasOwnProperty(origKey)) {
                    newKey = (
                        origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
                    ).toString();
                    value = obj[origKey];
                    if (
                        value instanceof Array ||
                        (value !== null && value.constructor === Object)
                    ) {
                        value = convertToCamelCasedObject(value);
                    }
                    newObj[newKey] = value;
                }
            }
        }
        return newObj;
    }

    function initAdvSearch() {
        $('.abp-advanced-search').each((i, obj) => {
            var $advSearch = $(obj);
            setAdvSearchDropdownMenuWidth($advSearch);
            setAdvSearchStopingPropagations($advSearch);
        });
    }

    initAdvSearch();

    $(window).resize(() => {
        clearTimeout(window.resizingFinished);
        window.resizingFinished = setTimeout(() => {
            initAdvSearch();
        }, 500);
    });

    function setAdvSearchDropdownMenuWidth($advSearch) {
        var advSearchWidth = 0;
        $advSearch.each((i, obj) => {
            advSearchWidth += parseInt($(obj).width(), 10);
        });
        $advSearch.find('.dropdown-menu').width(advSearchWidth)
    }

    function setAdvSearchStopingPropagations($advSearch) {
        $advSearch.find('.dd-menu, .btn-search, .txt-search')
            .on('click', (e) => {
                e.stopPropagation();
            });
    }

    $.fn.clearForm = function () {
        var $this = $(this);
        $this.validate().resetForm();
        $('[name]', $this).each((i, obj) => {
            $(obj).removeClass('is-invalid');
        });
        $this[0].reset();
    };
})(jQuery);

$(document).on('change', '.upload-image-input', function (e) {
    // get container
    var container = $(this).closest('.upload-image-container');
    // get host url
    var uploadUrl = $(this).attr("data-url");
    // get and append file that is uploaded to server
    var file_data = $(this).prop('files')[0];
    // no selected file
    if (file_data === undefined) {
        // clear
        container.find('.upload-image-img').attr('src', '');
        container.find('.upload-image-url').val('');

        return;
    }
    var form_data = new FormData();
    form_data.append('file', file_data);

    // loading
    abp.ui.setBusy();

    $.ajax({
        url: uploadUrl,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (response) {
            // display image
            container.find('.upload-image-img').attr('src', '/' + response);
            // set value for input
            container.find('.upload-image-url').val(response);
        },
        error: function (errorMessage) {
            abp.notify.error(l('CanNotUploadImage'));
        },
        complete: function () {
            // delete loading
            abp.ui.clearBusy();
        }
    });
});

function resetUploadImage() {
    $('.upload-image-url').val('');
    $('.upload-image-img').attr('src', '');
    
}

function formatDateTime(date) {
    return ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() +
        ' ' + date.getHours() + ':' + ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes());
}

function checkValidUrl(url) {
    var pattern = /^[a-zA-Z\d-]+$/;
    if (!pattern.test(url)) {
        abp.notify.error(l('InvalidUrl'));
        return false;
    };

    return true;
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

function formatCurrency(money) {
    return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}