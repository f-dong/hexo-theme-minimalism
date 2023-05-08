/* global hexo */

'use strict';

/**
 * Export theme config to js
 */
hexo.extend.helper.register('export_config', function() {

  const {theme} = this;

  const { image } = Object.assign({image: {
    lazyload_enable: true,
    photo_zoom: 'simple-lightbox'
  }}, theme.config);

  const theme_config = {
    image: image
  };

  const script = `<script id="hexo-configurations">
    window.theme_config = ${JSON.stringify(theme_config)};
    window.is_post = ${this.is_post()};
  </script>`;

  // compression
  return script.replace(/\s+/g, ' ');
});
