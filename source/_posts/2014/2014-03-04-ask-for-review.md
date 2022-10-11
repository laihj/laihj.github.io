---
layout: post
title: "[appstore]如何优雅地要求用户评分"
description: ""
category: 
tags: [右舷]
date: 2014-03-04 10:42:33
---

在iTunes的[ASO](http://laihjx.com/2013/12/25/aso-cheat-sheet/)中，用户评分是很重要的一个点，用户的评分会影响搜索的排名，好的分数也会增加潜在用户下载app的概率。

所以现在很多产品运行中会弹出提示框，请求用户去给产品评分，然而频繁的在用户使用过程中打断，又会引起用户的反感，甚至Daring Fireball还发起了[一星运动](http://daringfireball.net/linked/2013/12/05/eff-your-review)。

PM们又开始在弹出框的提示语中用“残忍地拒绝”之类的语句卖萌，或者降低弹出的频率（比如每个版本只弹出3次），又或者选择弹出的时机（在用户用得最爽的时间弹出），以求降低用户的恶感。

最近的人气游戏[THREES](https://itunes.apple.com/cn/app/threes!/id779157948?l=en&mt=8)在这个问题上发现了一种新的实践，他们在版本更新的提示中加入了以下语句。

> We don't fell comfortable interruption your game experience to ask for reviews, but if you are filling generous with your time plaese take a moment and let us know what you think of the game^_^

在请求评分界引起了[盛赞](http://daringfireball.net/linked/2014/02/26/threes-rating),认为THREES不仅游戏做得好，求评分的姿势也很经典。

诚然，Release note几乎是开发者与用户仅有官方沟通渠道之一（除非用户主动，开发者拿不到用户的联系信息），在这里请用户进行评分，不用背负除低用户体验的原罪，然而另一个问题是，效果怎么样？自从iOS7增加了自动更新功能之后，有多少用户会看Relesae note?说实话，就是在手工一个个更新的时间，我也很少认真看这个东西的。

国外有开发者用自己的app做了[小实验](http://blog.supertop.co/post/77962740329/the-effective-way-to-ask-for-an-app-review),他们发了4个小版本，两个带有评分请求，两个不带，结果非常明显。

![rate](http://interbbs.b0.upaiyun.com/rate.png)

他们最后的更新中认为：确实有很多人是不看Release note的，但是看Release note的用户，有更大的比例是你的app的忠实用户，他们关心app每次更新的变化，更有可能去store给你的app评分。

反正这么做不会对牺牲用户体验，何不在下次app更新是尝试一下？



