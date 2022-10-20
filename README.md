# hexo 极简风格主题



<p align="center">
<a herf="https://hexo.io"><img src="https://img.shields.io/badge/hexo-%3E%3D%205.0.0-blue.svg"></a>
<a title="license"><img src="https://img.shields.io/badge/license-MIT-green"></a>
</p>

![预览图片](https://user-images.githubusercontent.com/40230452/189160566-c4f4070a-a64e-4843-81eb-7885c45f71c3.png)

* [预览](#预览)
* [特性](#特性)
* [下载](#下载)
* [配置](#配置)
  * [切换主题](#切换主题)
    * [\_config\.yml 文件的其它修改建议:](#_configyml-文件的其它修改建议)
  * [新建标签 tags 页](#新建标签-tags-页)
  * [新建关于我 about 页](#新建关于我-about-页)
  * [新建标签 categories 页(可选的)](#新建标签-categories-页可选的)
  * [菜单导航配置](#菜单导航配置)
    * [配置基本菜单导航的名称、路径url和图标icon\.](#配置基本菜单导航的名称路径url和图标icon)
  * [代码高亮](#代码高亮)
  * [中文链接转拼音（建议安装）](#中文链接转拼音建议安装)
  * [添加emoji表情支持（可选的）](#添加emoji表情支持可选的)
  * [添加 RSS 订阅支持（可选的）](#添加-rss-订阅支持可选的)
* [文章 Front\-matter 介绍](#文章-front-matter-介绍)
  * [Front\-matter 选项详解](#front-matter-选项详解)
  * [最简示例](#最简示例)
  * [最全示例](#最全示例)
* [效果截图](#效果截图)
* [License](#license)

Table of contents generated with [gh-md-toc](https://github.com/ekalinin/github-markdown-toc.go)

[TODO list](./TODO.md)

## 预览

- [codeover.cn](https://www.codeover.cn)


## 特性

- 简洁大方, 文章内容美观易读
- 响应式设计，博客在桌面端、平板、手机等设备上均能很好的展现
- 独特的分类归档页
- [Gitalk](https://gitalk.github.io/) 评论模块支持, 集成了谷歌分析（`Google Analytics`）
- 支持`emoji`表情，用`markdown emoji`语法书写直接生成对应的能**跳跃**的表情
- 语义化标签, 更易于 SEO 优化, 提升博客价值



## 下载

本主题**推荐你使用 Hexo 5.0.0 及以上的版本**。如果，你已经有一个自己的 [Hexo](https://hexo.io/zh-cn/) 博客了，建议你将 Hexo 升级到最新稳定的版本。

点击 [这里](https://codeload.github.com/f-dong/hexo-theme-minimalism/zip/master) 下载 `master` 分支的最新稳定版的代码，解压缩后，将 `hexo-theme-minimalism` 的文件夹复制到你 Hexo 的 `themes` 文件夹中即可。

当然你也可以在你的 `themes` 文件夹下使用 `git clone` 命令来下载:

```bash
git clone https://github.com/f-dong/hexo-theme-minimalism.git
```

## 配置

### 切换主题

修改 Hexo 根目录下的 `_config.yml` 的  `theme` 的值：`theme: hexo-theme-minimalism`

#### `_config.yml` 文件的其它修改建议:

- 请修改 `_config.yml` 的 `url` 的值为你的网站主 `URL`（如：`http://xxx.github.io`）。
- 建议修改两个 `per_page` 的分页条数值为 `6` 的倍数，如：`12`、`18` 等，这样文章列表在各个屏幕下都能较好的显示。
- 建议修改 `language` 的值为 `zh-CN`, 否则部分浏览器将弹出翻译窗口

### 新建标签 tags 页

tags 页是用来展示所有标签的页面, 如果在你的博客 source 目录下还没有 tags/index.md 文件, 那么你就需要新建一个, 命令如下: 

```bash
hexo new page "tags"
```

编辑你刚刚新建的页面文件 `/source/tags/index.md`，至少需要以下内容：

```yaml
---
title: tags
date: 2022-04-26 22:59:30
type: "tags"
layout: "tags"
---
```

### 新建关于我 about 页

`about` 页是用来展示**关于我和我的博客**信息的页面，如果在你的博客 `source` 目录下还没有 `about/index.md` 文件，那么你就需要新建一个，命令如下：

```bash
hexo new page "about"
```

编辑你刚刚新建的页面文件 `/source/about/index.md`，至少需要以下内容：

```yaml
---
title: about
date: 2022-04-26 22:59:30
---
```


### 新建标签 categories 页(可选的)

本主题内置了一个 `categories` 归档页, 用于显示分类下的所有文章, 如果在你的博客 `source` 目录下还没有 `tags/categories.md` 文件, 那么你就需要新建一个, 命令如下:

```bash
hexo new page "categories"
```

编辑你刚刚新建的页面文件 `/source/categories/index.md`, 至少需要以下内容: 

```yaml
---
title: categories
date: 2022-04-26 22:59:30
type: "categories"
layout: "categories"
---
```



### 菜单导航配置

#### 配置基本菜单导航的名称、路径url和图标icon.

1. 菜单导航名称可以是中文也可以是英文(如：`Index` 或 `主页`) 
2. `External` 表示是否在新标签页打开连接
3. 导航地址可以是站内地址也可以是外网地址

```yaml
menu:
  Index:
    url: /
    External: false
    name: 首页
  Tags:
    url: /tags
    External: false
    name: 标签
#  Categories:
#    url: /categories
#    External: false
#    name: 分类
  Archives:
    url: /archives
    External: false
    name: 归档
  About:
    url: /about
    External: false
    name: 关于
```

### 代码高亮

从 Hexo5.0 版本开始自带了 `prismjs` 代码语法高亮的支持，本主题对此进行了改造支持。

如果你的博客中曾经安装过 `hexo-prism-plugin` 的插件，那么你须要执行 `npm uninstall hexo-prism-plugin` 来卸载掉它，否则生成的代码中会有 `&#123;` 和 `&#125;` 的转义字符。

然后，修改 Hexo 根目录下 `_config.yml` 文件中 `highlight.enable` 的值为 `false`，并将 `prismjs.enable` 的值设置为 `true`，主要配置如下：

```yaml
highlight:
  enable: false
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  enable: true
  preprocess: true
  line_number: true
  tab_replace: ''
```

主题中默认的 `prismjs` 主题是 `Tomorrow Night`，如果你想定制自己的主题，可以前往 [prismjs 下载页面](https://prismjs.com/download.html) 定制下载自己喜欢的主题 `css` 文件，然后将此 css 主题文件取名为 `prism.css`，替换掉 `hexo-theme-minimalism` 主题文件夹中的 `source/style/prism.css` 文件即可。

### 中文链接转拼音（建议安装）

如果你的文章名称是中文的，那么 Hexo 默认生成的永久链接也会有中文，这样不利于 `SEO`。我们可以用 [hexo-permalink-pinyin](https://github.com/viko16/hexo-permalink-pinyin) Hexo 插件使在生成文章时生成中文拼音的永久链接。

安装命令如下：

```bash
npm i hexo-permalink-pinyin --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```yaml
permalink_pinyin:
  enable: true
  separator: '-' # default: '-'
```

> **注**：除了此插件外，[hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink) 插件也可以生成非中文的链接。

### 添加emoji表情支持（可选的）

本主题新增了对`emoji`表情的支持，使用到了 [hexo-filter-github-emojis](https://npm.taobao.org/package/hexo-filter-github-emojis) 的 Hexo 插件来支持 `emoji`表情的生成，把对应的`markdown emoji`语法（`::`,例如：`:smile:`）转变成会跳跃的`emoji`表情，安装命令如下：

```bash
npm install hexo-filter-github-emojis --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```yaml
githubEmojis:
  enable: true
  className: github-emoji
  inject: false
  styles:
  customEmojis:
```
执行 `hexo clean && hexo g` 重新生成博客文件，然后就可以在文章中对应位置看到你用`emoji`语法写的表情了。

### 添加 RSS 订阅支持（可选的）

本主题中还使用到了 [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) 的 Hexo 插件来做 `RSS`，安装命令如下：

```bash
npm install hexo-generator-feed --save
```

在 Hexo 根目录下的 `_config.yml` 文件中，新增以下的配置项：

```yaml
feed:
  type: atom
  path: atom.xml
  limit: 20
  hub:
  content:
  content_limit: 140
  content_limit_delim: ' '
  order_by: -date
```

执行 `hexo clean && hexo g` 重新生成博客文件，然后在 `public` 文件夹中即可看到 `atom.xml` 文件，说明你已经安装成功了。

## 文章 Front-matter 介绍

### Front-matter 选项详解

`Front-matter` 选项中的所有内容均为**非必填**的。但我仍然建议至少填写 `title` 和 `date` 的值。

| 配置选项   | 默认值                     | 描述                                                         |
| ---------- | -------------------------- | ------------------------------------------------------------ |
| title      | `Markdown` 的文件标题      | 文章标题，强烈建议填写此选项                                 |
| date       | 文件创建时的日期时间       | 发布时间，强烈建议填写此选项，且最好保证全局唯一             |
| img        | `featureImages` 中的某个值 | 文章特征图，推荐使用图床(腾讯云、七牛云、又拍云等)来做图片的路径.如: `http://xxx.com/xxx.jpg` |
| top        | `true`                     | 推荐文章（文章是否置顶），如果 `top` 值为 `true`，则会作为首页推荐文章 |
| hide       | `false`                    | 隐藏文章，如果`hide`值为`true`，则文章不会在首页显示         |
| cover      | `false`                    | `v1.0.2`版本新增，表示该文章是否需要加入到首页轮播封面中     |
| toc        | `true`                     | 是否开启 TOC，可以针对某篇文章单独关闭 TOC 的功能。前提是在主题的 `config.yml` 中激活了 `toc` 选项 |
| summary    | 无                         | 文章摘要，自定义的文章摘要内容，如果这个属性有值，文章卡片摘要就显示这段文字 |
| description    | 无                         | 用于搜索引擎的 description，如果没值则取 summary 或 截取文章内容 |
| categories | 无                         | 文章分类，本主题的分类表示宏观上大的分类，只建议一篇文章一个分类 |
| tags       | 无                         | 文章标签，一篇文章可以多个标签                               |
| keywords   | 文章标题                   | 文章关键字，SEO 时需要                                       |
| categories | 文章分类                   | 当前文章的所属分类 用户分类归档页                            |
| tags       | 文章标签                   | 可以有多个                                                   |

以下为文章的 `Front-matter` 示例。

### 最简示例

```yaml
---
title: typora-vue-theme主题介绍
date: 2022-04-26 09:25:00
---
```

### 最全示例

```yaml
---
title: typora-vue-theme主题介绍
date: 2022-04-26 09:25:00
author: 张三
img: /source/images/xxx.jpg
top: true
hide: false
cover: true
toc: false
summary: 这是你自定义的文章摘要内容，如果这个属性有值，文章卡片摘要就显示这段文字，否则程序会自动截取文章的部分内容作为摘要
description: 该值主要用于 seo 优化，设置后页面 description 将显示该值，未设置则取 summary 或截取部分文章内容
categories: Markdown
tags:
  - Typora
  - Markdown
---
```

## License
MIT
