/* global hexo */
/* 静态文件路径助手函数 */

'use strict';

hexo.extend.helper.register('css_link', name => {
  const css_list = {
    'theme_main': '/style/main.css',
    'jquery.fancybox': '/style/jquery.fancybox.min.css',
    'gitalk': '/style/gitalk.css',
    'prism': '/style/prism.css',
    'simple-lightbox': '/style/simple-lightbox.min.css'
  };

  const boot_css_list = {
    'theme_main': '/style/main.css',
    'jquery.fancybox': 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css',
    'gitalk': 'https://cdn.bootcdn.net/ajax/libs/gitalk/1.7.2/gitalk.css',
    'prism': '/style/prism.css',
    'simple-lightbox': 'https://cdn.bootcdn.net/ajax/libs/simplelightbox/2.13.0/simple-lightbox.min.css'
  };

  if (hexo.theme.config.use_bootcdn) {
    return boot_css_list[name];
  }

  const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  return url_for(css_list[name]);
});

hexo.extend.helper.register('js_link', name => {

  const css_list = {
    'jquery': '/js/jquery.min.js',
    'jquery.fancybox': '/js/jquery.fancybox.min.js',
    'theme_main': '/js/main.js',
    'gitalk': '/js/gitalk.min.js',
    'simple-lightbox': '/js/simple-lightbox.min.js'
  };

  const boot_css_list = {
    'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.8.0/jquery.min.js',
    'jquery.fancybox': 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js',
    'theme_main': '/js/main.js',
    'gitalk': 'https://cdn.bootcdn.net/ajax/libs/gitalk/1.7.2/gitalk.min.js',
    'simple-lightbox': 'https://cdn.bootcdn.net/ajax/libs/simplelightbox/2.13.0/simple-lightbox.min.js'
  };

  if (hexo.theme.config.use_bootcdn) {
    return boot_css_list[name];
  }

  const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  return url_for(css_list[name]);
});
