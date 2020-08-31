const MAXIMUM_FILE_SIZE = 2; //Mb
const LIMIT_FILES_UPLOAD = 5;
var crip = "";

$.get('https://www.cloudflare.com/cdn-cgi/trace',
    function(data) {
        crip = data.split("\n")[2];
        $('#ticket').append('<input type="hidden" name="ip" value="' + crip + '">');
    });

$(document).on('click',
    '.box-faq',
    function() {
        var answerContainer = $(this).find('.box-faq-answer');
        if (answerContainer.html() === '') {
            // get id of faq

            var id = $(this).find('.box-faq-question').attr('data-id');


            answerContainer.html('Đang tải dữ liệu...');

            $.ajax({
                url: '/Faq/Answer?id=' + id,
                type: 'GET',
                dataType: 'html',
                success: function(content) {
                    answerContainer.html(content);
                },
                error: function(e) {},
                complete: function() {}
            });
        }
    });

$(document).on('change',
    '#uploadFiles',
    function(e) {
        const files = e.target.files;
        const currentFilesNumber = $('#uploadFiles')[0].files.length;
        $('.file-name-list').empty();
        if (files && (files.length > LIMIT_FILES_UPLOAD) || (files.length + currentFilesNumber) > 5) {
            alert("Maximum 5 files upload");
        }

        Array.from(files).forEach(file => {
            if (file.size / 1024 <= MAXIMUM_FILE_SIZE * 1024) {
                $('#removeAll').css("display","block");
                $('.file-name-list').append("<label class='label'>" + file.name + "</label>");
            }
        });
    });

$(document).on('click', '#removeAll', function() {
    $('#uploadFiles').val('');
    $('.file-name-list').empty();
    $('#removeAll').css("display", "none");
});
