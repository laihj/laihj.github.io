---
title: 手动安装 iOS simulator runtime
date: 2023-12-27 17:40:51
tags: [Xcode, 工具]
---
![](download_error.png)

希望你不要碰到这种升级了 Xcode 却安装不了最新版本模拟器的情况。
如果不幸遇到了，可以试试用以下方法手动下载安装。

手动从 [Apple Developer website](https://developer.apple.com/download/all/?q=Simulator%20Runtime) 下载 dmg，然后用以下的命令安装

```
    xcode-select -s /Applications/Xcode-beta.app
    xcodebuild -runFirstLaunch
    xcrun simctl runtime add "~/Downloads/watchOS 9 beta Simulator Runtime.dmg"
```