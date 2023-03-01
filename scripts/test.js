/* global hexo */

'use strict';

var pagination = require('hexo-pagination');

function getHideConfig(hide) {
    if (typeof hide === 'boolean' || !hide) {
        return {
            home_hide: hide,
            archive_hide: hide,
            category_hide: hide,
            tag_hide: hide
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

    let res_hide = {
        home_hide: hide.home_hide || false,
        archive_hide: hide.archive_hide || false,
        category_hide: hide.category_hide || false,
        tag_hide: hide.tag_hide || false
    }

    // The value here may be an array.
    hide.forEach(function (item) {
        if (item.home_hide) {
            res_hide.home_hide = true;
        } else if (item.archive_hide) {
            res_hide.archive_hide = true;
        } else if (item.category_hide) {
            res_hide.category_hide = true;
        } else if (item.tag_hide) {
            res_hide.tag_hide = true;
        }
    });

    return res_hide;
}

hexo.extend.generator.register('index', locals => {
    locals.posts = locals.posts.filter(function (post) {
        console.log(getHideConfig(post.hide))

        const hide = getHideConfig(post.hide);

        return hide.home_hide === false;
    });

    return pagination('index.html', locals.posts, {
        perPage: hexo.config.per_page,
        layout: 'index',
        data: {}
    });
});

hexo.extend.helper.register('is_hide', function (post) {
    if (this.is_archive() && (post.archive_hide || post.hide)) {
        return false;
    }

    if (this.is_category() && (post.category_hide || post.hide)) {
        return false;
    }

    if (this.is_tag() && (post.tag_hide || post.hide)) {
        return false;
    }

    return true;
});

