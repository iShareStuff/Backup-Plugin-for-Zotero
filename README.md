# 本文使用AGPL v3协议，也就是说，除非获得商业授权，否则无论以何种方式修改或者使用代码，都需要开源。

# Backup Plugin for Zotero
欢迎关注ShareStuff！全网同名，我在知乎、公众号和B站等您！


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



Win默认目录为C:/Users/share【这里应该是你的用户名】/ZoteroBackup

Linux默认目录为/home/share【这里应该是你的用户名】/ZoteroBackup

【Mac用户未测试，不知道支不支持】

# 最新更新【支持自定义路径】，支持Mac系统


* 安装好后，会创建默认目录并备份，生成当天的日期文件夹，这也是第一次备份（有提示信息）。

* 第一次备份后，每次重新打开zotero软件，都会提示您是否备份，按需选择即可。

* 可以根据提示，选择是否只备份配置文件，或者全备份【前者不含数据如pdf等文件，后者全包含】
