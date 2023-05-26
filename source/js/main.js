/* global window, document */
'use strict';

// 菜单
document.querySelector('.menu-switch').addEventListener('click', function() {
  const menuContainer = document.querySelector('.menu-container');

  if (this.classList.contains('icon-menu-outline')) {
    this.classList.replace('icon-menu-outline', 'icon-close-outline');
    menuContainer.style.opacity = '1';
    menuContainer.style.height = 'auto';
    menuContainer.style['z-index'] = '1024';
  } else {
    this.classList.replace('icon-close-outline', 'icon-menu-outline');
    menuContainer.style.opacity = '0';
    menuContainer.style['z-index'] = '0';

    setTimeout(() => {
      if (this.classList.contains('icon-menu-outline')) {
        menuContainer.style.height = '0';
      }
    }, 600);
  }
});

// 代码复制
function addCopyIcons() {
  const copyIcon = document.createElement('i');
  copyIcon.className = 'fa-solid icon icon-copy copy-code';
  copyIcon.title = '复制代码';

  document.querySelectorAll('.post-detail figure').forEach(figure => {
    figure.appendChild(copyIcon.cloneNode(true));
  });

  document.querySelectorAll('.post-detail pre[class*=language-].line-numbers').forEach(codeBlock => {
    codeBlock.appendChild(copyIcon.cloneNode(true));
  });

  document.querySelectorAll('.post-detail .copy-code').forEach(copyCodeBtn => {
    copyCodeBtn.addEventListener('click', function() {
      const selection = window.getSelection();
      const range = document.createRange();
      const table = this.previousElementSibling.tagName === 'TABLE' ? this.previousElementSibling : null;
      const preElement = table ? table.querySelector('.code pre') : this.previousElementSibling;

      range.selectNodeContents(preElement);
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
  });
}

// 代码语言
function setLanguageAttributes() {
  const setLanguageAttribute = (element, attributeName) => {
    const codeLanguage = element.getAttribute('class');
    if (codeLanguage) {
      const langName = codeLanguage.replace(attributeName, '').trim().replace('language-', '').trim();
      element.setAttribute('data-content-after', langName || 'CODE');
    }
  };

  document.querySelectorAll('code').forEach(codeBlock => {
    setLanguageAttribute(codeBlock, 'line-numbers');
  });

  document.querySelectorAll('.highlight').forEach(highlightBlock => {
    setLanguageAttribute(highlightBlock, 'highlight');
  });
}

// 文章详情侧边目录
function handleScroll() {
  const mainNavLinks = document.querySelectorAll('.top-box a');
  const fromTop = window.scrollY + 100;

  mainNavLinks.forEach((link, index) => {
    const section = document.getElementById(decodeURI(link.hash).substring(1));
    let nextSection = null;
    if (mainNavLinks[index + 1]) {
      nextSection = document.getElementById(decodeURI(mainNavLinks[index + 1].hash).substring(1));
    }

    if (section.offsetTop <= fromTop && (!nextSection || nextSection.offsetTop > fromTop)) {
      link.classList.add('current');
    } else {
      link.classList.remove('current');
    }
  });
}

function bindScrollEvent() {
  window.addEventListener('scroll', () => {
    handleScroll();
  });
}

// 点击锚点滚动条偏移
function bindClickEvent() {
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
function lazyloadLoad() {
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
}

// 初始化页面
function themeBoot() {
  if (window.is_post) {
    addCopyIcons();
    setLanguageAttributes();
    bindScrollEvent();
    bindClickEvent();
  }

  lazyloadLoad();

}

window.addEventListener('DOMContentLoaded', () => {
  themeBoot();
});

// hexo-blog-encrypt See https://github.com/D0n9X1n/hexo-blog-encrypt
window.addEventListener('hexo-blog-decrypt', () => {
  themeBoot();
});
