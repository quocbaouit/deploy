const NEWS = 1,
    EVENT = 2,
    GUIDEINE = 3,
    CARD = 4;

function loadNews() {
    GetArticleContent(NEWS, $('#new'));
}

function loadEvent() {
    GetArticleContent(EVENT, $('#event'));
}

function loadGuideline() {
    GetArticleContent(GUIDEINE, $('#guideline'));
}

function loadCard() {
    GetArticleContent(CARD, $('#card'));
}

function GetArticleContent(articleType, contentContainer) {
    contentContainer.html('Đang tải dữ liệu...');
    $.ajax({
        url: '/Article/TabContentForHome?articleType=' + articleType,
        type: 'GET',
        dataType: 'html',
        success: function (content) {
            contentContainer.html(content);
        },
        error: function (e) { },
        complete: function () { }
    })
}

$(document).ready(function () {
    $("#new").fadeIn(100);
    loadNews();  
})