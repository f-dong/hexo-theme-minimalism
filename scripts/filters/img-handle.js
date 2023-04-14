/* global hexo */

'use strict';

hexo.extend.filter.register('after_render:html', appendJs, 1);
hexo.extend.filter.register('after_post_render', render, 1);

function render(data) {
  const image = getConfig();
  if (!image.lazyload_enable && !image.photo_zoom) {
    return;
  }

  data.content = data.content.replace(
    // Match 'img' tags width the src attribute.
    /<img([^>]*)src="([^"]*)"([^>/]*)\/?\s*>/gim,
    (match, attrBegin, src, attrEnd) => {
      // Exit if the src doesn't exists.
      if (!src) {
        return match;
      }

      const static_link = hexo.extend.helper.get('static_link').bind(hexo);
      const loadImg = static_link(image.lazyload_placeholder || '/images/loading.svg');
      let img = `<img ${attrBegin} src="${loadImg}" data-src="${src}" ${attrEnd} lazyload>`;
      if (!image.lazyload_enable) {
        img = `<img ${attrBegin} src="${src}" ${attrEnd}>`;
      }

      if (image.photo_zoom === 'simple-lightbox') {
        return `<a class="simple-lightbox" href="${src}">${img}</a>`;
      } else if (image.photo_zoom === 'fancybox') {
        // alt
        const alt = match.match(/alt="([^"]*)"/);
        const altText = alt && alt[1] ? alt[1] : '';
        return `<a href="${src}" data-fancybox='lightbox' data-caption="${altText}">${img}</a>`;
      }

      return img;
    }
  );
}

function appendJs(str, data) {
  const image = getConfig();
  if (!image.photo_zoom) {
    return str;
  }

  // 没有图片时，不加载js
  if (!data.page.content || data.page.content.indexOf('<img') === -1) {
    return str;
  }

  const css_link = hexo.extend.helper.get('css_link').bind(hexo);
  const js_link = hexo.extend.helper.get('js_link').bind(hexo);
  switch (image.photo_zoom) {
    case 'simple-lightbox':
      str = str.replace('</head>', `<link rel="stylesheet" href="${css_link('simple-lightbox')}"></head>`);
      str = str.replace('</body>', `<script src="${js_link('simple-lightbox')}"></script><script>document.addEventListener('DOMContentLoaded', function() {new SimpleLightbox('.post-detail .simple-lightbox', {fileExt: false,captionsData:'alt'});});</script></body>`);
      break;
    case 'fancybox':
      str = str.replace('</head>', `<link rel="stylesheet" href="${css_link('jquery.fancybox')}"></head>`);
      str = str.replace('</body>', `<script src="${js_link('jquery')}"></script><script src="${js_link('jquery.fancybox')}"></script></body>`);
  }

  return str;
}

function getConfig() {
  const { image } = Object.assign({image: {
    lazyload_enable: true,
    photo_zoom: 'simple-lightbox'
  }}, hexo.theme.config);

  return image;
}
