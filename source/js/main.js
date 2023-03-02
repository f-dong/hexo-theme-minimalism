/* global $, window, document */
'use strict';

// 菜单
$('.menu-switch').click(function() {
  if ($(this).hasClass('icon-menu-outline')) {
    $(this).removeClass(' icon-menu-outline ').addClass('icon-close-outline');
    $('.menu-container').css('opacity', '1').css('height', 'auto');
  } else {
    $(this).addClass(' icon-menu-outline ').removeClass('icon-close-outline');
    $('.menu-container').css('opacity', '0');

    const that = $(this);
    setTimeout(() => { that.hasClass('icon-menu-outline') && $('.menu-container').css('height', '0'); }, 600);
  }
});

if (window.is_post) {
  // 图片放大
  // $(".post-detail img").each(function() {
  //     var currentImage = $(this);
  //     currentImage.wrap("<a href='" + currentImage.attr("src") + "' data-fancybox='lightbox' data-caption='" + currentImage.attr("alt") + "'></a>");
  // });

  // 代码复制
  const $copyIcon = $('<i class="fa-solid icon icon-copy copy-code" title="复制代码"></i>');
  $('.post-detail figure').append($copyIcon);
  $('.post-detail pre[class*=language-].line-numbers').append($copyIcon);
  $('.post-detail .copy-code').on('click', function() {
    const selection = window.getSelection();
    const range = document.createRange();
    const table = $(this).prev('table');
    if (table.length) {
      range.selectNodeContents($(this).prev('table').find('.code').find('pre')[0]);
    } else {
      console.log($(this).prev('code')[0]);
      range.selectNodeContents($(this).prev('code')[0]);
    }

    selection.removeAllRanges();
    selection.addRange(range);
    selection.toString();
    document.execCommand('copy');
    selection.removeAllRanges();

    $(this).html('<span class="copy-success"> 复制成功</span>');
    setTimeout(() => {
      $(this).html('');
    }, 2500);
  });

  // 代码语言
  $(() => {
    $('code').each(function() {
      const code_language = $(this).attr('class');

      if (!code_language) {
        return true;
      }
      const lang_name = code_language.replace('line-numbers', '').trim().replace('highlight', '').trim().replace('language-', '').trim();

      $(this).attr('data-content-after', lang_name || 'CODE');
    });
    $('.highlight').each(function() {
      const code_language = $(this).attr('class');

      if (!code_language) {
        return true;
      }
      const lang_name = code_language.replace('highlight', '').trim();

      $(this).attr('data-content-after', lang_name || 'CODE');
    });
  });

  // 文章详情侧边目录
  const mainNavLinks = document.querySelectorAll('.top-box a');
  window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 100;

    mainNavLinks.forEach((link, index) => {
      const section = document.getElementById(decodeURI(link.hash).substring(1));
      let nextSection = null;
      if (mainNavLinks[index + 1]) {
        nextSection = document.getElementById(decodeURI(mainNavLinks[index + 1].hash).substring(1));
      }
      if (section.offsetTop <= fromTop) {
        if (nextSection) {
          if (nextSection.offsetTop > fromTop) {
            link.classList.add('current');
          } else {
            link.classList.remove('current');
          }
        } else {
          link.classList.add('current');
        }
      } else {
        link.classList.remove('current');
      }
    });
  });

  // 点击锚点滚动条偏移
  $('.top-box-link').click(() => {
    setTimeout(() => {
      $(window).scrollTop($(window).scrollTop() - 54);
      console.log($(window).scrollTop() - 54, '滚动条位置');
    }, 0);
  });
}

function lazyload(imgs, data) {
  data.now = Date.now();
  data.needLoad = Array.from(imgs).some(i => i.hasAttribute('lazyload'));

  const h = window.innerHeight;
  const s = document.documentElement.scrollTop || document.body.scrollTop;

  imgs.forEach(img => {
    if (img.hasAttribute('lazyload') && !img.hasAttribute('loading')) {

      if ((h + s) > img.offsetTop) {
        img.setAttribute('loading', true);
        const loadImageTimeout = setTimeout(() => {
          // eslint-disable-next-line no-undef
          const temp = new Image();
          const src = img.getAttribute('data-src');
          temp.src = src;
          temp.onload = () => {
            img.src = src;
            img.removeAttribute('lazyload');
            img.removeAttribute('loading');
            clearTimeout(loadImageTimeout);
          };
        }, 500);
      }
    }
  });
}

// 图片懒加载
if (window.theme_config.image && window.theme_config.image.lazyload_enable) {
  const imgs = document.querySelectorAll('img');

  const data = {
    now: Date.now(),
    needLoad: true
  };


  lazyload(imgs, data);

  window.onscroll = () => {
    if (Date.now() - data.now > 50 && data.needLoad) {
      lazyload(imgs, data);
    }
  };
}
