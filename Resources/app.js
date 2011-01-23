// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

Ti.API.info('Starting app !');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'MainPage'});


// TODO(agam): 4 tabs are fixed right now, but in the future, save settings for tabs

// 5 tabs in base window
var tabNames = [
	'Breaking News', 'Opinion', 'Sports', 'Local News', 'More ...'
];

// Create windows for each tab
for (var i = 0, len = tabNames.length; i < len; ++i) {
	var tabName = tabNames[i];
	var win = Titanium.UI.createWindow({
		title: tabName,
		url: 'newsfeed.js',
		backgroundColor:'#fff'
	});
	var tab = Titanium.UI.createTab({
		icon: 'images/newspaper.png',
		title: tabName,
		window: win
	});
	// TODO(agam): populate window with table view corresponding to section feeds
	tabGroup.addTab(tab);
}

// First tab is default
tabGroup.setActiveTab(0);

// open tab group
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

Ti.API.info('Loaded app !');