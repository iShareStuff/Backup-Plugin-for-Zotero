backupinitPreferences = function () {
  backup_url = Zotero.zoterobackup.backup_url();
  automatic_only = Zotero.zoterobackup.only();

  // Apply setting to
  document.getElementById("id-zoterobackup-only").checked = automatic_only;
  document.getElementById("id-zoterobackup-backup-url").value = backup_url;
};
Zotero.zoterobackup = new (function () {
  (this.backup_url = function () {
    // Set default if not set.
    if (Zotero.Prefs.get("zoterobackup.backup_url") === undefined) {
      Zotero.Prefs.set("zoterobackup.backup_url", OS.Constants.Path.homeDir);
    }
    return Zotero.Prefs.get("zoterobackup.backup_url");
  }),
    (this.only = function () {
      // Set default if not set.
      if (Zotero.Prefs.get("zoterobackup.only") === undefined) {
        Zotero.Prefs.set("zoterobackup.only", true);
      }
      return Zotero.Prefs.get("zoterobackup.only");
    }),
    (this.init = async function () {
      // 设置
      Zotero.backup.backup_url();
      Zotero.backup.only();
      automatic_only = Zotero.Prefs.get("zoterobackup.only");
      //运行
      if (!(automatic_only === undefined) && automatic_only == true) {
        alert("Only backup the profiles data" + "\n" + "\n");
        Zotero.backup.updateAll();
      } else {
        alert("Backup all data" + "\n" + "\n");
        Zotero.backup.updateAll();
      }
    }),
    (this.updateAll = async function () {
      //运行
      automatic_only = Zotero.Prefs.get("zoterobackup.only");
      //如果只备份设置文件
      if (!(automatic_only === undefined) && automatic_only == true) {
        alert("Only backup the profiles data" + "\n" + "\n");
        var baseURL = Zotero.Prefs.get("zoterobackup.backup_url");
        var user_path = OS.Path.join(baseURL, "ZoteroBackup"); // 用户指定备份目录
        var cur_date = new Date().toISOString().split("T")[0]; // 返回当前日期
        var back_path = OS.Path.join(user_path, cur_date); // 将用户目录与当前日期目录组合
        var profile = Zotero.Profile.dir; // 配置目录
        var back_path_profile = OS.Path.join(back_path, "profile"); // 配置备份目录
        var zotero_profile_ini_back = OS.Path.join(
          back_path,
          "zotero_profile_ini"
        );
        var jurism_profile_ini_back = OS.Path.join(
          back_path,
          "jurism_profile_ini"
        );
        //是否第一次备份
        if (await OS.File.exists(baseURL)) {
          var truthBeTold1 = window.confirm(
            "Do you want to backup today? Today is " +
              cur_date +
              ".\n" +
              "\n" +
              "click OK to backup" +
              "\n" +
              "\n" +
              "click Cancel to stop"
          );
          //不是第一次备份,今日是否备份
          if (truthBeTold1) {
            //今日已备份，是否需要替换今日备份
            if (await OS.File.exists(back_path)) {
              var truthBeTold2 = window.confirm(
                "The directory:  " +
                  back_path +
                  "  exists" +
                  "\n" +
                  "\n" +
                  "click OK to replace" +
                  "\n" +
                  "\n" +
                  "click Cancel to stop"
              );
              if (truthBeTold2) {
                //替换备份
                alert(
                  "profile backup in:  " +
                    back_path_profile +
                    "\n" +
                    "\n" +
                    "profiles.ini backup in:  " +
                    back_path
                );
                back_up_only();
                alert(
                  "Please wait, Backup is running, the profile files are replacing!"
                );
              }
            }
            //今日还未备份
            else {
              alert(
                "profile backup in:  " +
                  back_path_profile +
                  "\n" +
                  "\n" +
                  "profiles.ini backup in:  " +
                  back_path
              );
              back_up_only();
              alert("Please wait, Backup is running with the profile files");
            }
          }
        }

        // 备份profile和profiles.ini
        async function back_up_only() {
          await make_dir(user_path);
          await make_dir(back_path);
          await make_dir(back_path_profile); // 新建目录

          //await Zotero.File.copyDirectory(profile, back_path_profile);
          await Zotero.File.iterateDirectory(profile, async function (entry) {
            //备份profile
            if (entry.name != "parent.lock") {
              // 不为parent.lock则复制
              var dest_profile = OS.Path.join(back_path_profile, entry.name);
              if (entry.isDir) {
                Zotero.File.copyDirectory(entry.path, dest_profile);
              } else {
                OS.File.copy(entry.path, dest_profile);
              }
            }
          });
          await back_up_profiles_ini(); //备份prifiles.ini
        }

        // 备份profiles.ini未完成
        async function back_up_profiles_ini() {
          var os_user_path = OS.Constants.Path.homeDir; // 得到当前用户目录
          zotero_profile_ini = "AppData\\Roaming\\Zotero\\Zotero\\profiles.ini"; // Zotero profiles.ini后缀
          jurism_profile_ini = "AppData\\Roaming\\Jurism\\Zotero\\profiles.ini"; // Jurism profiles.ini后缀

          full_zotero_profile_ini = OS.Path.join(
            os_user_path,
            zotero_profile_ini
          ); // 完整zotero profiles.ini目录
          full_jurism_profile_ini = OS.Path.join(
            os_user_path,
            jurism_profile_ini
          ); // 完整jurism profiles.ini目录
          if (await OS.File.exists(full_zotero_profile_ini)) {
            // 备份zotero中profiles.ini
            await make_dir(zotero_profile_ini_back);
            await OS.File.copy(
              full_zotero_profile_ini,
              OS.Path.join(zotero_profile_ini_back, "profiles.ini")
            );
          }
          if (await OS.File.exists(full_jurism_profile_ini)) {
            // 备份Jurism中profiles.ini
            await make_dir(jurism_profile_ini_back);
            await OS.File.copy(
              full_jurism_profile_ini,
              OS.Path.join(jurism_profile_ini_back, "profiles.ini")
            );
          }
        }

        // 新建目录函数
        async function make_dir(path) {
          if (!(await OS.File.exists(path))) {
            OS.File.makeDir(path, {
              ignoreExisting: true,
              unixMode: 0o755,
            });
          }
        }
      } else {
        alert("Backup all data" + "\n" + "\n");
        var baseURL = Zotero.Prefs.get("zoterobackup.backup_url");
        var user_path = OS.Path.join(baseURL, "ZoteroBackup"); // 用户指定备份目录
        var cur_date = new Date().toISOString().split("T")[0]; // 返回当前日期
        var back_path = OS.Path.join(user_path, cur_date); // 将用户目录与当前日期目录组合
        var profile = Zotero.Profile.dir; // 配置目录
        var data = Zotero.DataDirectory.dir; // 数据目录
        var back_path_profile = OS.Path.join(back_path, "profile"); // 配置备份目录
        var back_path_data = OS.Path.join(back_path, "data"); // 数据备份目录
        var zotero_profile_ini_back = OS.Path.join(
          back_path,
          "zotero_profile_ini"
        );
        var jurism_profile_ini_back = OS.Path.join(
          back_path,
          "jurism_profile_ini"
        );
        //是否第一次备份
        if (await OS.File.exists(baseURL)) {
          var truthBeTold1 = window.confirm(
            "Do you want to backup today? Today is " +
              cur_date +
              ".\n" +
              "\n" +
              "click OK to backup" +
              "\n" +
              "\n" +
              "click Cancel to stop"
          );
          //不是第一次备份,今日是否备份
          if (truthBeTold1) {
            //今日已备份，是否需要替换今日备份
            if (await OS.File.exists(back_path)) {
              var truthBeTold2 = window.confirm(
                "The directory:  " +
                  back_path +
                  "  exists" +
                  "\n" +
                  "\n" +
                  "click OK to replace" +
                  "\n" +
                  "\n" +
                  "click Cancel to stop"
              );
              if (truthBeTold2) {
                //替换备份
                alert(
                  "profile backup in:  " +
                    back_path_profile +
                    "\n" +
                    "\n" +
                    "data backup in:  " +
                    back_path_data +
                    "\n" +
                    "\n" +
                    "profiles.ini backup in:  " +
                    back_path
                );
                back_up();
                alert(
                  "Please wait, Backup is running, the profile and data files are replacing!"
                );
              }
            }
            //今日还未备份
            else {
              alert(
                "profile backup in:  " +
                  back_path_profile +
                  "\n" +
                  "\n" +
                  "data backup in:  " +
                  back_path_data +
                  "\n" +
                  "\n" +
                  "profiles.ini backup in:  " +
                  back_path
              );
              back_up();
              alert(
                "Please wait, Backup is running with the profile and data files"
              );
            }
          }
        }

        // 备份数据、profile和profiles.ini
        async function back_up() {
          await make_dir(user_path);
          await make_dir(back_path);
          await make_dir(back_path_profile); // 新建目录
          await make_dir(back_path_data); // 新建目录

          await Zotero.File.copyDirectory(data, back_path_data); // 备份数据
          //await Zotero.File.copyDirectory(profile, back_path_profile);
          await Zotero.File.iterateDirectory(profile, async function (entry) {
            //备份profile
            if (entry.name != "parent.lock") {
              // 不为parent.lock则复制
              var dest_profile = OS.Path.join(back_path_profile, entry.name);
              if (entry.isDir) {
                Zotero.File.copyDirectory(entry.path, dest_profile);
              } else {
                OS.File.copy(entry.path, dest_profile);
              }
            }
          });
          await back_up_profiles_ini(); //备份prifiles.ini
        }

        // 备份profiles.ini未完成
        async function back_up_profiles_ini() {
          var os_user_path = OS.Constants.Path.homeDir; // 得到当前用户目录
          zotero_profile_ini = "AppData\\Roaming\\Zotero\\Zotero\\profiles.ini"; // Zotero profiles.ini后缀
          jurism_profile_ini = "AppData\\Roaming\\Jurism\\Zotero\\profiles.ini"; // Jurism profiles.ini后缀

          full_zotero_profile_ini = OS.Path.join(
            os_user_path,
            zotero_profile_ini
          ); // 完整zotero profiles.ini目录
          full_jurism_profile_ini = OS.Path.join(
            os_user_path,
            jurism_profile_ini
          ); // 完整jurism profiles.ini目录
          if (await OS.File.exists(full_zotero_profile_ini)) {
            // 备份zotero中profiles.ini
            await make_dir(zotero_profile_ini_back);
            await OS.File.copy(
              full_zotero_profile_ini,
              OS.Path.join(zotero_profile_ini_back, "profiles.ini")
            );
          }
          if (await OS.File.exists(full_jurism_profile_ini)) {
            // 备份Jurism中profiles.ini
            await make_dir(jurism_profile_ini_back);
            await OS.File.copy(
              full_jurism_profile_ini,
              OS.Path.join(jurism_profile_ini_back, "profiles.ini")
            );
          }
        }

        // 新建目录函数
        async function make_dir(path) {
          if (!(await OS.File.exists(path))) {
            OS.File.makeDir(path, {
              ignoreExisting: true,
              unixMode: 0o755,
            });
          }
        }
      }
    });
})();

window.addEventListener(
  "load",
  function (e) {
    Zotero.backup.init();
  },
  false
);
