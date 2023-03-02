/* global hexo */

'use strict';

// Determine whether the article should be displayed on various pages.
function getHideConfig(hide) {
  if (typeof hide === 'boolean' || !hide) {
    return {
      home_hide: hide || false,
      archive_hide: hide || false,
      category_hide: hide || false,
      tag_hide: hide || false
    };
  }

  if (typeof hide !== 'object') {
    return {
      home_hide: false,
      archive_hide: false,
      category_hide: false,
      tag_hide: false
    };
  }

  const res_hide = {
    home_hide: hide.home_hide || true,
    archive_hide: hide.archive_hide || true,
    category_hide: hide.category_hide || true,
    tag_hide: hide.tag_hide || true
  };

  // The value here may be an array.
  hide.forEach(item => {
    if (item.home_hide === false) {
      res_hide.home_hide = false;
    }
    if (item.archive_hide === false) {
      res_hide.archive_hide = false;
    }
    if (item.category_hide === false) {
      res_hide.category_hide = true;
    }
    if (item.tag_hide === false) {
      res_hide.tag_hide = false;
    }
  });

  return res_hide;
}

// Special handling is required for pagination on the homepage.
hexo.extend.generator.register('index', locals => {
  locals.posts = locals.posts.filter(post => {

    const hide = getHideConfig(post.hide);
    return hide.home_hide === false;
  });

  const pagination = require('hexo-pagination');

  if (hexo.config.index_generator && hexo.config.index_generator.per_page > 0) {
    return pagination(hexo.config.index_generator.path || '', locals.posts, {
      perPage: hexo.config.per_page,
      layout: 'index',
      data: {}
    });
  }

  return {
    path: hexo.config.index_generator ? hexo.config.index_generator.path || '' : '',
    data: locals,
    layout: 'index'
  };
});

// Register a helper function to determine whether to display an article on a page.
hexo.extend.helper.register('is_hide', post => {
  const hide = getHideConfig(post.hide);

  if (hide.archive_hide && this.is_archive()) {
    return true;
  }

  if (hide.category_hide && this.is_category()) {
    return true;
  }

  if (hide.tag_hide && this.is_tag()) {
    return true;
  }

  return false;
});

