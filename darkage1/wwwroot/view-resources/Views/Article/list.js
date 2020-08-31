const NEWS = 1,
    EVENT = 2,
    GUIDEINE = 3,
    CARD = 4;

function loadNews() {
    GetArticleTab(NEWS, $('#new'));
}

function loadEvent() {
    GetArticleTab(EVENT, $('#event'));
}

function loadGuideline() {
    GetArticleTab(GUIDEINE, $('#guideline'));
}

function loadCard() {
    GetArticleTab(CARD, $('#card'));
}

function GetArticleTab(articleType, contentContainer) {
    contentContainer.html('Đang tải dữ liệu...');
    $.ajax({
        url: '/Article/TabForList?articleType=' + articleType,
        type: 'POST',
        dataType: 'html',
        success: function (content) {
            contentContainer.html(content);
            CreatePaginationFooter(contentContainer, 1);
        },
        error: function (e) { },
        complete: function () { }
    })
}

function GetArticleContentTab(articleType, pageIndex, contentContainer) {
    contentContainer.find(".tab-content").html('Đang tải dữ liệu...');
    $.ajax({
        url: '/Article/TabContentForList?articleType=' + articleType + '&&page=' + pageIndex,
        type: 'POST',
        dataType: 'html',
        success: function (content) {
            contentContainer.find(".tab-content").html(content);
            CreatePaginationFooter(contentContainer, pageIndex)
        },
        error: function (e) { },
        complete: function () { }
    })
}

function CreatePaginationFooter(contentContainer, pageIndex) {
    contentContainer.find(".pagination").ASPSnippets_Pager({
        ActiveCssClass: "current",
        PagerCssClass: "pagination-link",
        PageIndex: pageIndex,
        PageSize: contentContainer.find("input[name='PageSize']").val(),
        RecordCount: contentContainer.find("input[name='Total']").val()
    });
}

$(document).on("click", "#new .pagination a", function () {
    GetArticleContentTab(NEWS, parseInt($(this).attr('page')), $('#new'));
});

$(document).on("click", "#event .pagination a", function () {
    GetArticleContentTab(EVENT, parseInt($(this).attr('page')), $('#event'));
});

$(document).on("click", "#guideline .pagination a", function () {
    GetArticleContentTab(GUIDEINE, parseInt($(this).attr('page')), $('#guideline'));
});

$(document).ready(function () {
    $("#new").fadeIn(100);
    loadNews();
})