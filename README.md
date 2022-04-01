# Backup Plugin for Zotero
欢迎关注ShareStuff！全网同名，我在知乎、公众号和B站等您！

该插件用于Windows、Linux平台上备份zotero数据和配置文件，方便多设备恢复还原！

每次备份生成一个日期文件夹【四个子文件夹】：
其中data为数据文件夹，profile为配置文件夹，这两个子文件夹是恢复必须的要的。

jurism_profile_ini和zotero_profile_ini文件夹为路径信息【用不到】，只用于你查看旧电脑的配置文件夹所在位置。

# 使用方法
1. 下载并安装插件；
2. 每次打开zotero软件，都会弹开一次窗口让您选择是否备份数据。

Win默认目录为C:/Users/share【这里应该是你的用户名】/ZoteroBackup

Linux默认目录为/home/share【这里应该是你的用户名】/ZoteroBackup

【Mac用户未测试，不知道支不支持】


* 安装好后，会创建默认目录并备份，生成当天的日期文件夹，这也是第一次备份（有提示信息）。

* 第一次备份后，每次重新打开zotero软件，都会提示您是否备份，按需选择即可。

* 可以根据提示，选择是否只备份配置文件，或者全备份【前者不含数据如pdf等文件，后者全包含】
