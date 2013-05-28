---
layout: post
title: "新输入方式和真正好用的模版 iTimeLog 1.4.5 发布"
description: ""
category: 
tags: [iTimeLog]
---
{% include JB/setup %}

###新输入

本版我们提示另一种输入方法，估且叫作模版式输入，主要的想法就是在输入事件的同时能把类型给填了，而不需要在事件上点击编辑专门去下一个页面填写类型。

![tempinput](http://interbbs.b0.upaiyun.com/iTimeLog/tempinput.png)

模版式输入的格式是“事件：类型”，即你在主界面输入事件的地方，直接填入事件＋冒号（全半角冒号都支持）＋类型，app自动将输入的内容切开，前半部分作为事件名称，后半部分作为类型名称。

###化学反应

这种输入方式极大地简化了类型输入的操作，开发完成后，我们意外地发现它跟模版发生了化学反应，也就是说这使得模版这个东西，真正地好用起来。

模版是iTimeLog 1.3.5版推出的功能，分成事件模版和类型模版，初衷当然是为了更方便地输入，然而分开的模版有个问题，就是多次输入同一事件后，还需要一个个分别是修改它的类型，并不方便，所以我一般也只使用事件模版来处理没有类型的事件。

有了模版式输入之后,这个问题就解决了，以下是我的事件模版：

![tempinputtype](http://interbbs.b0.upaiyun.com/iTimeLog/temp-event-and-type.png)

主要是一些美剧，这类事件对我来说是不定时的，可能一周一次，可能一个月一次，基本不可能是主界面上找到重做按钮，是典型的应该使用模版的事件，而每次输入事件后再输入类型却也很麻烦。于是我把它处理地这样，使用事件模版，同时把事件和类型输入。

至此，模版输入这个功能真正地好用起来了。

###详情页   

![detailwithnote](http://interbbs.b0.upaiyun.com/iTimeLog/detailWithNote.png)

本版在事件详情页也有一个小改进，我们在这个页面把事件笔记展示出来了。在iTimeLog中你可以给每一个事件加笔记，标识当时所思所想，状态，自我效率评价等一切可描述的东西，现在你可以对这一数据时行通览了。我们觉得数据要展现出来，才会有用。

我们好像从来没有正式地介绍过详情页，刚好在这里说一下吧，用过iTimeLog的人应该都知道，iTimeLog的统计分为列表和图表两种。在列表中，列出了某个时间段某个事件的花费时间总和，如果你点击这一记录，事件就会被展开，列出详细时间使用清单。在这个页面，我们还为记录控们准备了一个叫作“全部”的小按钮，于是你可以查看有记录以来，该事件的所有记录，以及时间的总和。