---
layout: post
title: "OS X升级到10.8.4之后iOS模拟器问题"
description: ""
category: 
tags: [Tips]
---
{% include JB/setup %}

OS X升级到10.8.4之后，使用iOS模拟器运行程序，有50％左右的机率运行即崩溃，只能重新启动调试的app，而连接真机调试而无此问题。

应该是苹果更新出来的bug,暂时可行的解决办法中，在“Product > Scheme > Edit Scheme”中，将Debugger设成GDB。
