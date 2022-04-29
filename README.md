<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: ingopro
 * @Date: 2022-04-24 22:08:23
 * @LastEditors: isharestuff
 * @LastEditTime: 2022-04-29 17:15:15
-->
# Backup Plugin for Zotero
欢迎[B站](https://space.bilibili.com/20435673)、[知乎](https://www.zhihu.com/people/ShareStuff/posts)和公众号关注ShareStuff！

![全平台](https://user-images.githubusercontent.com/61663626/163555055-2a800bcf-a139-40cc-b9e1-cc3b7759fd34.jpg)


该插件用于Windows、Linux平台上备份zotero数据和配置文件，方便多设备恢复还原！

每次备份生成一个日期文件夹【四个子文件夹】：
其中data为数据文件夹，profile为配置文件夹，这两个子文件夹是恢复必须的要的。

jurism_profile_ini和zotero_profile_ini文件夹为路径信息【用不到】，只用于你查看旧电脑的配置文件夹所在位置。

# 使用方法
1. 下载并安装插件
[https://github.com/iShareStuff/Backup-Plugin-for-Zotero/releases](https://github.com/iShareStuff/Backup-Plugin-for-Zotero/releases)

![image](https://user-images.githubusercontent.com/61663626/163553784-28dcb2e9-714e-436c-a549-0a9269910fe2.png)

2. 手动备份【注意没有备份进度条，你需要等待一定时间，可以根据文件夹内的文件日期是否继续更新来判断】

![image](https://user-images.githubusercontent.com/61663626/163553876-a8159a6f-d419-4720-85f4-d80890aedc84.png)

* 安装好后，会创建默认目录并备份，生成当天的日期文件夹，这也是第一次备份（有提示信息）。

* 第一次备份后，每次重新打开zotero软件，都会提示您是否备份，按需选择即可。

* 可以根据提示，选择是否只备份配置文件，或者全备份【前者不含数据如pdf等文件，后者全包含】
  
# Quick Start Guide

## Install

- Download the latest release (.xpi file) from the [Releases Page](https://github.com/iShareStuff/Backup-Plugin-for-Zotero/releases)  
  _Note_ If you're using Firefox as your browser, right-click the `.xpi` and select "Save As.."
- In Zotero click `Tools` in the top menu bar and then click `Addons`
- Go to the Extensions page and then click the gear icon in the top right.
- Select `Install Add-on from file`.
- Browse to where you downloaded the `.xpi` file and select it.
- Restart Zotero, by clicking `restart now` in the extensions list where the
  ZoteroTheme plugin is now listed.

## Usage

## Development & Contributing

This add-on is built on the Zotero Addon Template of [zotero-pdf-translate](https://github.com/windingwind/zotero-pdf-translate).

## Disclaimer

Use this code under AGPL(open source required). No warranties are provided. Keep the laws of your locality in mind!

Part of the code of this repo refers to other open-source projects within the allowed scope.

- [zotero-pdf-translate](https://github.com/windingwind/zotero-pdf-translate)
