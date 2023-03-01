/* global hexo */

'use strict';

/**
 * Export theme config to js
 */
hexo.extend.helper.register('export_config', function() {

  const {theme} = this;

  const theme_config = {
    image: theme.image
  };

  return `<script id="hexo-configurations">
    window.theme_config = ${JSON.stringify(theme_config)};
    window.is_post = ${this.is_post()};
  </script>`;
});
