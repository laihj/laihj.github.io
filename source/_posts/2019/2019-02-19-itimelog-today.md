---

title: iTimeLog 支持 today widget 了
date: 2019-02-19 14:36:38
tags: iTimeLog
---
2019年，我们终于支持 iPhone 的 today widget 了，today widget 就是 iPhone 的桌面小部件，在 iPhone X 系列中，滑到最左边就是 today widget的功能了，在非 X 系统 iPhone 中，需要下通知列表，再左滑才能看到。

iTimeLog 的 today widget 第一版，是一个快速输入系统。输入的简便是 [iTimeLog录入设计](http://laihj.me/2017/12/08/input/) 的最重要目标。

![today](http://blog-image-1255331452.cos.ap-nanjing.myqcloud.com/itimelog/today_widget.jpg)

如图所示，iTimeLog 的  today widget 分为两个部分，用一条浅蓝色的线分割。上半部分第一条常驻按钮是添加一个新的事件，点击它将会调起 iTimeLog 的主程序，并且呼出键盘，接受你的输入。

第二条常驻元素是当前正在进行的事件，点击它将会完成这个事件的记录，如果当前没有记录事件，它的功能就和第一条常驻一样。

下半部分是常用输入事件备选项，一直以来， iTimeLog 都觉得将用户已输入的事件作为事件模板，自然形成最近一段时间的输入备选是一种合理的做法。这里也一样，这个桌面小部件的下半部分最多可以显示五个事件，这五个事件是 iTimeLog 中用户输入的最近五个事件列表，实测对于一个生活比较规律的人来说，可以覆盖 50% 以上的快速录入功能了。

*在这个功能的开发过程中，我买了自己的第一台 X 系列 iPhone，一台红包的 iPhone Xr。实际使用中，我发现 today widget 的使用比想象中还要方便，在手机不解锁的情况下，你也可以在锁屏界面直接左滑使用这个功能。*


