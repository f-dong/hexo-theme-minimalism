// 菜单
$(".menu-switch").click(function () {
    if ($(this).hasClass('icon-menu-outline')) {
        $(this).removeClass(' icon-menu-outline ').addClass('icon-close-outline');
        $('.menu-container').css('opacity', '1').css('height', 'auto');
    } else {
        $(this).addClass(' icon-menu-outline ').removeClass('icon-close-outline');
        $('.menu-container').css('opacity', '0');

        var that = $(this);
        setTimeout(function () {that.hasClass('icon-menu-outline') && $('.menu-container').css('height', '0')}, 600)
    }
});

if (window.is_post) {
    // 图片放大
    $(".post-detail img").each(function() {
        var currentImage = $(this);
        currentImage.wrap("<a href='" + currentImage.attr("src") + "' data-fancybox='lightbox' data-caption='" + currentImage.attr("alt") + "'></a>");
    });

    // 代码复制
    var $copyIcon = $('<i class="fa-solid icon icon-copy copy-code" title="复制代码"></i>');
    $(".post-detail figure").append($copyIcon);
    $(".post-detail pre[class*=language-].line-numbers").append($copyIcon);
    $('.post-detail .copy-code').on('click', function () {
        var selection = window.getSelection();
        var range = document.createRange();
        var table = $(this).prev('table');
        if (table.length) {
            range.selectNodeContents($(this).prev('table').find('.code').find('pre')[0]);
        } else {
            console.log($(this).prev('code')[0]);
            range.selectNodeContents($(this).prev('code')[0]);
        }

        selection.removeAllRanges();
        selection.addRange(range);
        var text = selection.toString();
        document.execCommand('copy');
        selection.removeAllRanges();

        $(this).html('<span class="copy-success"> 复制成功</span>');
        setTimeout(() => {
            $(this).html('');
        }, 2500)
    });

    // 代码语言
    $(function () {
        $('code').each(function () {
            var code_language = $(this).attr('class');

            if (!code_language) {
                return true;
            }
            var lang_name = code_language.replace("line-numbers", "").trim().replace("highlight", "").trim().replace("language-", "").trim();

            $(this).attr('data-content-after', lang_name || 'CODE');
        });
        $('.highlight').each(function () {
            var code_language = $(this).attr('class');

            if (!code_language) {
                return true;
            }
            var lang_name = code_language.replace("highlight", "").trim();

            $(this).attr('data-content-after', lang_name || 'CODE');
        });
    });

    // 文章详情侧边目录
    let mainNavLinks = document.querySelectorAll(".top-box a");
    window.addEventListener("scroll", event => {
        let fromTop = window.scrollY + 100;

        mainNavLinks.forEach((link, index) => {
            let section = document.getElementById(decodeURI(link.hash).substring(1));
            let nextSection = null
            if (mainNavLinks[index + 1]) {
                nextSection = document.getElementById(decodeURI(mainNavLinks[index + 1].hash).substring(1));
            }
            if (section.offsetTop <= fromTop) {
                if (nextSection) {
                    if (nextSection.offsetTop > fromTop) {
                        link.classList.add("current");
                    } else {
                        link.classList.remove("current");
                    }
                } else {
                    link.classList.add("current");
                }
            } else {
                link.classList.remove("current");
            }
        });
    });

    // 点击锚点滚动条偏移
    $(".top-box-link").click(function(){
        setTimeout(function () {
            $(window).scrollTop($(window).scrollTop() - 54);
            console.log($(window).scrollTop() - 54, '滚动条位置');
        }, 0);
    });
}
