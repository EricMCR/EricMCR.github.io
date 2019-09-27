---
layout: default
title: src与href的区别
category: Web Page
author: EricMCR
date: 2019-09-27 21:51:26
tags:
- HTML
---
<pre>src和href有什么区别？</pre><div><br></div><div><b><font size="5">区别：src 的内容，是页面必不可少的一部分，是引入。href 的内容，是与该页面有关联，是引用。</font></b></div><pre>src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。</pre><div><br></div><div>src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。</div><div><br></div><div>当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。</div><div><br></div><div>href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加</div><div><br></div><div>那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是使用@import方式。</div>