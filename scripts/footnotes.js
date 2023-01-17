import marked from "hexo/lib/models/types/moment";

/**
 * Render markdown footnotes
 * @param {String} text
 * @returns {String} text
 */
function renderFootnotes(text) {
    try { // 防止 hexo 版本过低导致报错
        var marked = require('marked');
    } catch (e) {
        return text;
    }

    let footnotes = [];
    let reFootnoteContent = /\[\^(\d+)\]: ?([\S\s]+?)(?=\[\^(?:\d+)\]|\n\n|$)/g;
    let reInlineFootnote = /\[\^(\d+)\]\((.+?)\)/g;
    let reFootnoteIndex = /\[\^(\d+)\]/g;
    let html = '';

    // threat all inline footnotes
    text = text.replace(reInlineFootnote, function (match, index, content) {
        footnotes.push({
            index: index,
            content: content
        });
        // remove content of inline footnote
        return '[^' + index + ']';
    });

    // threat all footnote contents
    text = text.replace(reFootnoteContent, function (match, index, content) {
        footnotes.push({
            index: index,
            content: content
        });
        // remove footnote content
        return '';
    });

    // create map for looking footnotes array
    function createLookMap(field) {
        var map = {}
        for (var i = 0; i < footnotes.length; i++) {
            var item = footnotes[i]
            var key = item[field]
            map[key] = item
        }
        return map
    }

    var indexMap = createLookMap("index")

    // render (HTML) footnotes reference
    text = text.replace(reFootnoteIndex,
        function (match, index) {
            try {
                var tooltip = marked.parse(indexMap[index].content);
            } catch (error) {
                tooltip = indexMap[index].content;
            }

            return '<sup id="fnref:' + index + '">' +
                '<a href="#fn:' + index + '" rel="footnote">' +
                '<span class="hint--top hint--error hint--medium hint--rounded hint--bounce">[' + index + ']</span></a></sup>';
        });

    // sort footnotes by their index
    footnotes.sort(function (a, b) {
        return a.index - b.index;
    });

    // render footnotes (HTML)
    footnotes.forEach(function (footNote) {
        html += '<li id="fn:' + footNote.index + '">';
        html += '<span style="display: inline-block; vertical-align: top; padding-right: 10px; margin-left: -40px">';
        html += footNote.index;
        html += '.</span>';
        html += '<span style="display: inline-block; vertical-align: top; margin-left: 10px;">';
        // 解析markdown
        try {
            html += marked.parse(footNote.content.trim());
        } catch (e) {
            html += footNote.content.trim();
        }
        html += '<a href="#fnref:' + footNote.index + '" rev="footnote"> ↩</a></span></li>';
    });

    // add footnotes at the end of the content
    if (footnotes.length) {
        text += '<div id="footnotes">';
        text += '<hr>';
        text += '<div id="footnotelist">';
        text += '<ol style="list-style: none; padding-left: 0; margin-left: 40px">' + html + '</ol>';
        text += '</div></div>';
    }
    return text;
}

hexo.extend.filter.register('before_post_render', function (data) {
    data.content = renderFootnotes(data.content);
    return data;
});