(function ($) {

    var _articleService = abp.services.app.article,
        l = abp.localization.getSource('DarkAge-vi');
    $(function () {  
        // init summernote
        initSummernote($('#summernote'));

        // set content for summernote
        $('#summernote').summernote('code', $('<textarea/>').html(articleContent).text());

        var _$form = $('#ArticleCreationForm');

        _$form.find('input:first').focus();

        _$form.validate();

        _$form.find('button[type=submit]')
            .click(function (e) {
                e.preventDefault();

                if (!_$form.valid()) {
                    return;
                }

                if ($('#summernote').summernote('isEmpty')) {
                    abp.notify.error('Vui lòng nhập content');
                    return;
                }

                var input = _$form.serializeFormToObject();
                input.Content = $('#summernote').summernote('code');

                if (!checkValidUrl(input.CustomUrl)) {
                    return;
                }

                abp.ui.setBusy();

                $.ajax({
                    url: '/Article/CheckExistUrl?id=' + input.Id + '&&url=' + input.CustomUrl,
                    type: 'POST',
                    dataType: 'json',
                    success: function (exist) {
                        if (exist == true) {
                            abp.notify.error(l('UrlExist'));
                        }
                        else {
                            _articleService.update(input).done(function () {
                                abp.notify.success(l('SavedSuccessfully'));
                            }).always(function () {
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