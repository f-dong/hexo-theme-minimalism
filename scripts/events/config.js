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

  hexo.theme.config.highlight = hexo.config.highlight.enable ? {enable: true} : {enable: false};
  hexo.theme.config.prismjs = hexo.config.prismjs.enable ? {enable: true} : {enable: false};
});
