/* global window, document */
'use strict';

// 菜单
document.querySelector('.menu-switch').addEventListener('click', function() {
  if (this.classList.contains('icon-menu-outline')) {
    this.classList.remove('icon-menu-outline');
    this.classList.add('icon-close-outline');
    document.querySelector('.menu-container').style.opacity = '1';
    document.querySelector('.menu-container').style.height = 'auto';
    document.querySelector('.menu-container').style['z-index'] = 1024;
  } else {
    this.classList.add('icon-menu-outline');
    this.classList.remove('icon-close-outline');
    document.querySelector('.menu-container').style.opacity = '0';
    document.querySelector('.menu-container').style['z-index'] = '0';
    const that = this;
    setTimeout(() => {
      that.classList.contains('icon-menu-outline') && (document.querySelector('.menu-container').style.height = '0');
    }, 600);
  }
});

if (window.is_post) {
  // 图片放大
  // $(".post-detail img").each(function() {
  //     var currentImage = $(this);
  //     currentImage.wrap("<a href='" + currentImage.attr("src") + "' data-fancybox='lightbox' data-caption='" + currentImage.attr("alt") + "'></a>");
  // });

  // 代码复制
  const copyIcon = document.createElement('i');
  copyIcon.className = 'fa-solid icon icon-copy copy-code';
  copyIcon.title = '复制代码';
  const figures = document.querySelectorAll('.post-detail figure');
  for (let i = 0; i < figures.length; i++) {
    figures[i].appendChild(copyIcon.cloneNode(true));
  }
  const codeBlocks = document.querySelectorAll('.post-detail pre[class*=language-].line-numbers');
  for (let i = 0; i < codeBlocks.length; i++) {
    codeBlocks[i].appendChild(copyIcon.cloneNode(true));
  }
  const copyCodeBtns = document.querySelectorAll('.post-detail .copy-code');
  for (let i = 0; i < copyCodeBtns.length; i++) {
    copyCodeBtns[i].addEventListener('click', function() {
      const selection = window.getSelection();
      const range = document.createRange();
      const table = this.previousElementSibling.tagName === 'TABLE' ? this.previousElementSibling : null;
      if (table) {
        range.selectNodeContents(table.querySelector('.code pre'));
      } else {
        range.selectNodeContents(this.previousElementSibling);
      }

      selection.removeAllRanges();
      selection.addRange(range);
      selection.toString();
      document.execCommand('copy');
      selection.removeAllRanges();

      this.innerHTML = '<span class="copy-success"> 复制成功</span>';
      const that = this;
      setTimeout(() => {
        that.innerHTML = '';
      }, 2500);
    });
  }

  // 代码语言
  document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('code');
    for (let i = 0; i < codeBlocks.length; i++) {
      const codeLanguage = codeBlocks[i].getAttribute('class');
      if (!codeLanguage) {
        continue;
      }
      const langName = codeLanguage.replace('line-numbers', '').trim().replace('highlight', '').trim().replace('language-', '').trim();
      codeBlocks[i].setAttribute('data-content-after', langName || 'CODE');
    }

    const highlightBlocks = document.querySelectorAll('.highlight');
    for (let i = 0; i < highlightBlocks.length; i++) {
      const codeLanguage = highlightBlocks[i].getAttribute('class');
      if (!codeLanguage) {
        continue;
      }
      const langName = codeLanguage.replace('highlight', '').trim();
      highlightBlocks[i].setAttribute('data-content-after', langName || 'CODE');
    }
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
  const topBoxLinks = document.querySelectorAll('.top-box-link');
  topBoxLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        window.scrollTo(window.pageXOffset, window.pageYOffset - 54);
        console.log(window.pageYOffset - 54, '滚动条位置');
      }, 0);
    });
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
        }, 300);
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
