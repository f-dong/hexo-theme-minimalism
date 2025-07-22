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


// 搜索弹窗交互与搜索逻辑
(function() {
  const theme_config = window.theme_config || {};
  if (!theme_config || !theme_config.search || !theme_config.search.enable) {
    return;
  }
  const language = theme_config.language || 'zh-CN';

  // 动态插入搜索弹窗结构到 body
  const modalHtml = `
    <div id="search-modal" class="search-modal" style="display:none;">
      <div class="search-modal-mask"></div>
      <div class="search-modal-content">
        <span class="search-modal-close" id="search-modal-close">&times;</span>
        <div id="search-container">
          <input type="text" id="search-input" placeholder="${theme_config.search.placeholder || (language === 'en' ? 'Enter keyword search...' : '输入关键词搜索...')}">
          <ul id="search-results"></ul>
        </div>
      </div>
    </div>
  `;
  const temp = document.createElement('div');
  temp.innerHTML = modalHtml;
  document.body.appendChild(temp.firstElementChild);

  // 创建右下角悬浮按钮
  const floatBtn = document.createElement('button');
  floatBtn.id = 'search-float-btn';
  floatBtn.title = language === 'en' ? 'Search' : '搜索';
  const searchIcon = '<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#409eff" stroke-width="2" fill="none"/><line x1="17" y1="17" x2="21" y2="21" stroke="#409eff" stroke-width="2" stroke-linecap="round"/></svg>';
  const closeIcon = '<svg width="22" height="22" viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18" stroke="#f56c6c" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="6" x2="6" y2="18" stroke="#f56c6c" stroke-width="2" stroke-linecap="round"/></svg>';
  floatBtn.innerHTML = searchIcon;
  document.body.appendChild(floatBtn);

  const modal = document.getElementById('search-modal');
  const closeBtn = document.getElementById('search-modal-close');
  const mask = document.querySelector('.search-modal-mask');

  // 搜索数据缓存
  let posts = [];
  let algoliaLoaded = false;
  let algoliaIndex = null;

  // 搜索类型
  const searchType = theme_config.search.type || 'json';

  // 打开弹窗时绑定 input 事件
  function openModal() {
    modal.style.display = 'flex';
    floatBtn.innerHTML = closeIcon;
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    setTimeout(() => { input && input.focus(); }, 100);
    // 解绑旧事件，防止多次绑定
    input.oninput = null;
    if (searchType === 'algolia') {
      if (!algoliaLoaded) {
        const appId = theme_config.search.algolia.appID;
        const apiKey = theme_config.search.algolia.apiKey;
        const indexName = theme_config.search.algolia.indexName;
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js';
        script.onload = function() {
          // eslint-disable-next-line no-undef
          const client = algoliasearch(appId, apiKey);
          algoliaIndex = client.initIndex(indexName);
          algoliaLoaded = true;
        };
        document.body.appendChild(script);
      }
      input.oninput = function() {
        if (!algoliaIndex) return;
        const keyword = this.value.trim();
        renderResults(results, []);
        if (!keyword) return;
        algoliaIndex.search(keyword).then(({ hits }) => {
          renderResults(results, hits);
        });
      };
    } else {
      // 本地 JSON
      if (posts.length === 0) {
        fetch('/search.json')
          .then(response => response.json())
          .then(data => { posts = data; });
      }
      input.oninput = function() {
        const keyword = this.value.trim().toLowerCase();
        if (!keyword) return renderResults(results, []);
        const filtered = posts.filter(post =>
          (post.title && post.title.toLowerCase().includes(keyword))
          || (post.content && post.content.toLowerCase().includes(keyword))
        );
        renderResults(results, filtered);
      };
    }
  }

  function closeModal() {
    modal.style.display = 'none';
    floatBtn.innerHTML = searchIcon;
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (input) input.value = '';
    if (results) results.innerHTML = '';
  }

  function renderResults(results, list) {
    results.innerHTML = '';
    if (!list.length) {
      const text = theme_config.language === 'en' ? 'No results found' : '未找到结果';
      results.innerHTML = '<li style="color:#888;padding:1em;">' + text + '</li>';
      return;
    }
    list.forEach(item => {
      let summary = '';
      if (item.content) {
        const clean = item.content.replace(/<[^>]+>/g, '').replace(/\n/g, '');
        summary = clean.length > 80 ? clean.slice(0, 80) + '...' : clean;
      }
      const li = document.createElement('li');
      li.innerHTML = `<a href="${item.url || item.permalink}" target="_blank"><div class="search-title">${item.title}</div><div class="search-summary">${summary}</div></a>`;
      results.appendChild(li);
    });
  }

  // 悬浮按钮切换弹窗显示/隐藏
  floatBtn.onclick = function() {
    if (modal.style.display === 'flex') {
      closeModal();
    } else {
      openModal();
    }
  };
  if (closeBtn) closeBtn.onclick = closeModal;
  if (mask) mask.onclick = closeModal;
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}());
