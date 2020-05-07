---
title: 让 YYLabel  的 truncationToken 靠右显示
tags: 'iOS,UI'
date: 2020-03-19 11:46:07
---

![需求][image-1]
> 需求很简单，当一个内容超过 4 行时，默认显示 4 行，并显示一个展开按钮，占周完全展开，展开后显示一个收起按钮，点击收起到 4 行。

当然最直接的想法就是利用 `YYLabel` 的 `truncationToken`， truncationToken 天生的含义就是文本无法完整显示的时候接在文本后面作为提示的，默认的样式就是常见的`…`,它是可以自定义的，比如说在这个需求出，就可以设置为展开和收起。

但有一个问题，如下图。

![][image-2]
`truncationToken`是跟在文本后面的。它所跟随的文本行只到显示宽度的一半时，就会变成这样。这个应该是用 truncationToken 无法完成的设置。

于是考虑还是使用一个按钮来实现这个需求，那么问题两个，一个是按钮怎么定位，一个是怎么在文本中留出空间放按钮。

按钮定位很简单， 一直在 YYLabel 的右下角就好了，微调一下边距即可。关键的留空的问题，一开始想的是使用就用 `truncationToken` 来实现，把它设置为一个 N 个空格组成的字符串，比如 「      」，但是不生效, `truncationToken` 看起来忽略了纯的空字符串, 「      ab」就可以，空格后面跟实际的字符的话，空格也会作为 `truncationToken` 的一部分，但是只有空格就是被忽略。后来考虑用不可见字符 比如 \u000000 ，结果一样，被忽略了，CoreText 看起来相当智能。

后来发现了一个鸡贼的做法， `truncationToken` 是一个 `NSAttributedString`， 那就可以设置成实际的字符，但颜色设置为 clearColor，用这种方式实现不可见的占位，然后把按钮放在占位留出来的空间了，就实现了需求。

[image-1]:	https://d2rv2oa7v3ohqh.cloudfront.net/blog/2020/truncion_btn.png
[image-2]:	https://d2rv2oa7v3ohqh.cloudfront.net/blog/2020/truncionDefault.png