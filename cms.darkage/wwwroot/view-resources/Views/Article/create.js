(function ($) {
    var l = abp.localization.getSource('DarkAge-vi');
    $(function () {
 
        initSummernote($('#summernote'));
        $('#summernote').summernote('bold');


        var _$form = $('#ArticleCreationForm');

        _$form.find('input:first').focus();

        _$form.validate();

        _$form.find('button[type=submit]')
            .click(function (e) {
                e.preventDefault();

                if (!_$form.valid()) {
                    return;
                }
                // if content is empty, stop
                if ($('#summernote').summernote('isEmpty')) {
                    abp.notify.error(l('PleaseEnterContent'));
                    return;
                }
                // serialize form to object
                var input = _$form.serializeFormToObject();
                input.Content = $('#summernote').summernote('code');

                if (!checkValidUrl(input.CustomUrl)) {
                    return;
                }

                // loading
                abp.ui.setBusy();

                $.ajax({
                    url: '/Article/CheckExistUrl?id=0&&url=' + input.CustomUrl,
                    type: 'POST',
                    dataType: 'json',
                    success: function (exist) {
                        if (exist == true) {
                            abp.notify.error(l('UrlExist'));
                        }
                        else {
                            abp.services.app.article.create(input)
                                .done(function () {
                                    location.href = '/Article/Index';
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


               
            });
    });
})(jQuery);
