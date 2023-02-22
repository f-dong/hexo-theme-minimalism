'use strict'
hexo.extend.filter.register(
    'after_post_render',
    function (data) {
        data.content = data.content.replace(
            // Match 'img' tags width the src attribute.
            /<img([^>]*)src="([^"]*)"([^>\/]*)\/?\s*>/gim,
            function (match, attrBegin, src, attrEnd) {
                // Exit if the src doesn't exists.
                if (!src) {
                    return match;
                }

                // alt
                const alt = match.match(/alt="([^"]*)"/);
                const altText = alt ? (alt[1] ? alt[1] : '') : '';

                return `<a href="${src}" data-fancybox='lightbox' data-caption="${altText}"><img ${attrBegin} src="${src}" ${attrEnd} ></a>`;
            }
        )
    },
    1
);
