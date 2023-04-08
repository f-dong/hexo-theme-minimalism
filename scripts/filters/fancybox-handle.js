/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', render, 1);

function render(data) {
  const { image } = Object.assign({image: {
    lazyload_enable: true,
    photo_zoom: 'simple-lightbox'
  }}, hexo.theme.config);
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

      let img = `<img ${attrBegin} src="/images/loading.svg" data-src="${src}" ${attrEnd} lazyload>`;
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

  // const url_for = hexo.extend.helper.get('url_for').bind(hexo);
  switch (image.photo_zoom) {
    case 'simple-lightbox':
      data.content = data.content.replace('</head>', `<link rel="stylesheet" href="${css}"></head>`);
      data.content = data.content.replace('</body>', `<script src="${js}"></script><script>document.addEventListener('DOMContentLoaded', function() {new SimpleLightbox('.post-detail simple-lightbox');});</script></body>`);
      break;
    case 'fancybox':
      data.content = data.content.replace('</head>', `<link rel="stylesheet" href="${css2}"></head>`);
      data.content = data.content.replace('</body>', `<script src="${js2}"></script></body>`);
  }
}
