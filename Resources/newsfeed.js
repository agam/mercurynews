var win = Titanium.UI.currentWindow;

Ti.API.info('Created window : ', win.title);

// Create dummy label
var label = Titanium.UI.createLabel({
	color: '#999',
	text: 'Dummy Label !',
	textAign: 'center',
	width: 'auto'
});