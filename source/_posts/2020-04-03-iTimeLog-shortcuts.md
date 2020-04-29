---
title: 使用捷径和 iTimeLog 一起记录时间
date: 2020-04-03 11:24:38
tags: iTimeLog
---

![switch][image-1]

在最近发布的 iTimeLog 4.8.5 中，我们终于支持快捷指令了。
快捷指令是 iOS 12 开始支持的效率工具，可以配合应用快速完成各种任务。这一次，我们让 iTimeLog 可以和快捷指令配合，使时间记录更加方便。这种配合的基本想法，就是在通过系统的快捷指令功能，在进行某些操作的时候，同时触发 iTimeLog 开始时间记录，但比较遗憾的事，并不是所有的结束记录工作都能触发。

这一版中， 我们先开放了五个指令：
> - 开始一个事件
	> 在 iTimeLog 中开始 `事件名`：`类型`
> - 完成一个事件
	>  在 iTimeLog 中完成 `事件名`：`类型`，如果这一事件并没有在记录，忽略它。
> - 完成正进行中事件 
	> 完成进行中的事件
> - 添加或结束事件
	> 在 iTimeLog 中添加 `事件名`：`类型`，如果相同事件正在进行，完成它
> - 添加或继续事件
	> 在 iTimeLog 中添加 `事件名`：`类型`，如果相同事件正在进行，就继续记录

安装了 4.8.5 以上版本之后，你就会在快捷指定的 App 项目中看到 iTimeLog，里面包含了这五条指令。
下面我们通过几个例子看看 iTimeLog 如何与快捷指令配合。

## 上班和下班

![自动化][image-2]

快捷指令的自动化 tab 支持进入一个地点和离开一个地点时触发，就是说你可以把你的公司作为一个触发条件，粗略地记录你在公司上班的时间。

在快捷指令的自动化 tab 中，创建一条个人自动化，选行程中的到达项目，选取位置和时间，然后添加一条「添加或结束事件」就可以了。

当你在特定时间段进入公司时，快捷指定会通知你已进入公司，是否添加一个「工作」记录，你只需要点击运行就可以了，iTimeLog 会帮你记录一件开始上班的记录，而离开公司时，快捷指定也会询问你是否需要结束这条「工作」记录。

稍微麻烦一点的是，地点触发的自动化指定是无法设置成不询问直接记录的，可能是苹果不希望用户在不知情的情况下被执行了一些操作。

## 统计 app 使用时间

在 iOS 中，由于沙盒机制的存在，app 其实不知道有哪些其它的 app 开始运行的。但是在快捷指令的自动化中，有一项是 「打开  app」时，所以我们就可以设置在打开指定的 app 时，触发 iTimeLog 开始记录事件。

例如，我一般用 overcast 听 podcasts，所以我就设置了一条自动化指令，当打开 overcast 时，自动开始记录 「日谈公园：消遣」，在这里我用的是添加或继续事件，而不是开始一个事件指令，因为「打开 app」这一个触发项在 app 从后台到前台的时候也会触发，而我不想在这些时刻都直接开始一条新的记录，使我的日常记录无限变碎。

![日谈公园][image-3]

这是最初的使用方式，几天后，我发现快捷指令是可以放到主屏幕上的，所以最终我改成了同时运行两条指令这种方式，即，我编辑了一条指令，当它执行时，同时记录事件和打开对应的 app，然后我把它放到主屏幕上。
![主屏][image-4]
这样，当我想看最新一集星际迷航：航海家号时，我就直接点击星际迷航图标，系统帮我开始一条 iTimeLog 记录,并同时打开 nplayer。

## 跟 NFC 一起使用

![贴了贴纸的 switch][image-5]

上面说的是在 iPhone 中跟其它 app 协同的记录，这次触发我们做这个捷径功能的其实是 NFC， 新的 iPhone 是支持 NFC 的，最近我看了一些视频，发现 NFC 贴纸是一个非常便宜的东西，而快捷指令是支持 NFC 触发的。这就把 iTimeLog 跟现实世界联系了起来。

![自动化][image-6]

所以我在我的 Mac 上， kindle 上， switch 上和一把椅子上都贴上了 NFC 贴纸。当我的手机扫到 kindle 上时， iTimeLog 开始记录我正在看的电子书，扫椅子时则是最近的一本纸质书，而扫一下 mac，开始记录工作。

在这里，我使用的是「添加或完成事件」指令，当我放下书或者 switch 时，拿手机再扫一下贴纸，就可以完成这条记录了。

## 接下来

我们应该会继续探索使用快捷指令记录时间的方式，在后续版本中推出更多可用的指定，让时间记录这件事更加自动化。

[image-1]:	https://blog-image-1255331452.cos.ap-nanjing.myqcloud.com/blog/itimelog/itl485/switch.png
[image-2]:	https://blog-image-1255331452.cos.ap-nanjing.myqcloud.com/blog/itimelog/itl485/auto.jpeg
[image-3]:	https://blog-image-1255331452.cos.ap-nanjing.myqcloud.com/blog/itimelog/itl485/ritangongyuan.jpeg
[image-4]:	https://blog-image-1255331452.cos.ap-nanjing.myqcloud.com/blog/itimelog/itl485/IMG_3658.jpeg
[image-5]:	https://blog-image-1255331452.cos.ap-nanjing.myqcloud.com/blog/itimelog/itl485/nfc_switch.jpeg
[image-6]:	https://blog-image-1255331452.cos.ap-nanjing.myqcloud.com/blog/itimelog/itl485/my_auto.jpeg