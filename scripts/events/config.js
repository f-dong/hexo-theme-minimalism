/* global hexo */

'use strict';

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function merge(target, source) {
  for (const key in source) {
    if (isObject(target[key]) && isObject(source[key]) && key !== 'menu') {
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

hexo.on('generateBefore', () => {
  merge(hexo.theme.config, hexo.config.theme_config);

  // hexo v7.0.0 新的配置改动
  if (hexo.config.syntax_highlighter) {
    if (hexo.config.syntax_highlighter === 'prismjs') {
      hexo.theme.config.prismjs = {enable: true};
      hexo.theme.config.highlight = {enable: false};
    } else if (hexo.config.syntax_highlighter === 'highlight.js') {
      hexo.theme.config.prismjs = {enable: false};
      hexo.theme.config.highlight = {enable: true};
    } else {
      hexo.log.warn('Unsupported syntax highlighter: ' + hexo.config.syntax_highlighter);
    }
  } else { // v7.0.0 以下版本
    hexo.theme.config.highlight = hexo.config.highlight.enable ? {enable: true} : {enable: false};
    hexo.theme.config.prismjs = hexo.config.prismjs.enable ? {enable: true} : {enable: false};
  }

  // 评论系统，旧配置兼容
  if (typeof hexo.theme.config.comment !== 'object' && hexo.theme.config.gitalk) {
    hexo.theme.config.comment = {
      enable: hexo.theme.config.gitalk.enable,
      type: 'gitalk',
      config: {
        gitalk: hexo.theme.config.gitalk
      }
    };
  }

});
