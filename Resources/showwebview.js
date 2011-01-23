var win = Titanium.UI.currentWindow;
var webView = Titanium.UI.createWebView({
	url: win.loadWebURL
});
win.add(webView);