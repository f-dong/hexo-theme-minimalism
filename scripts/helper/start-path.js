/* global hexo */
/* 静态文件路径助手函数 */

'use strict';

const { version } = require('../../package.json');
const themeVersion = version;

hexo.extend.helper.register('static_link', name => {
  const css_list = {
    '/images/loading.svg': '/images/loading.svg'
  };

  const path = renderPath(css_list[name]);
  if (path.indexOf('http') === 0 || path.indexOf('//') === 0) {
    return path;
  }

  const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  return url_for(path);
});

hexo.extend.helper.register('css_link', name => {
  const config = cdnConfig();
  const css_list = {
    'theme_main': '/style/main.css',
    'jquery.fancybox': '/style/jquery.fancybox.min.css',
    'gitalk': '/style/gitalk.min.css',
    'simple-lightbox': '/style/simple-lightbox.min.css'
  };

  const boot_css_list = {
    'theme_main': '/style/main.css',
    'jquery.fancybox': 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css',
    'gitalk': 'https://cdn.bootcdn.net/ajax/libs/gitalk/1.7.2/gitalk.min.css',
    'simple-lightbox': 'https://cdn.bootcdn.net/ajax/libs/simplelightbox/2.13.0/simple-lightbox.min.css'
  };

  let path = renderPath(css_list[name] ? css_list[name] : name);

  if (config.enable && config.provider === 'bootcdn') {
    path = boot_css_list[name] ? boot_css_list[name] : name;
  }

  if (path.indexOf('http') === 0 || path.indexOf('//') === 0) {
    return path;
  }

  const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  return url_for(path);
});

hexo.extend.helper.register('js_link', name => {
  const config = cdnConfig();
  const js_list = {
    'jquery': '/js/jquery.min.js',
    'jquery.fancybox': '/js/jquery.fancybox.min.js',
    'theme_main': '/js/main.js',
    'gitalk': '/js/gitalk.min.js',
    'simple-lightbox': '/js/simple-lightbox.min.js',
    'twikoo': '/js/twikoo.min.js'
  };

  const boot_js_list = {
    'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.8.0/jquery.min.js',
    'jquery.fancybox': 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js',
    'theme_main': '/js/main.js',
    'gitalk': 'https://cdn.bootcdn.net/ajax/libs/gitalk/1.7.2/gitalk.min.js',
    'simple-lightbox': 'https://cdn.bootcdn.net/ajax/libs/simplelightbox/2.13.0/simple-lightbox.min.js',
    'twikoo': 'https://cdn.bootcdn.net/ajax/libs/twikoo/1.6.16/twikoo.min.js'
  };

  let path = renderPath(js_list[name] ? js_list[name] : name);

  if (config.enable && config.provider === 'bootcdn') {
    path = boot_js_list[name] ? boot_js_list[name] : name;
  }

  if (path.indexOf('http') === 0 || path.indexOf('//') === 0) {
    return path;
  }

  const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  return url_for(path);
});

function cdnConfig() {
  const { cdn } = Object.assign({cdn: {
    enable: false,
    provider: 'jsdelivr'
  }}, hexo.theme.config);

  // 兼容历史配置
  if (cdn.use_bootcdn && !cdn.enable) {
    cdn.enable = true;
    cdn.provider = 'bootcdn';
  }

  return cdn;
}

function renderPath(path) {
  const config = cdnConfig();

  path = path.replace(/^\//, '');

  if (config.enable) {
    switch (config.provider) {
      case 'jsdelivr':
        return `https://cdn.jsdelivr.net/npm/hexo-theme-minimalism@${themeVersion}/source/${path}`;
      case 'unpkg':
        return `https://unpkg.com/hexo-theme-minimalism@${themeVersion}/source/${path}`;
    }
  }

  return path;
}
