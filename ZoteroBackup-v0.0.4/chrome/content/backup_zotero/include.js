// Only create main object once
if (!Zotero.backup_zotero) {
	let loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
					.getService(Components.interfaces.mozIJSSubScriptLoader);
	loader.loadSubScript("chrome://backup_zotero/content/backup_zotero.js");
}