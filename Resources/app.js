// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'MainPage'});

// Global list of sections and corresponding rss feeds
var sectionFeeds = {
	'Breaking News' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200734.xml',
	'Most E-mailed' : 'feed://extras.mnginteractive.com/live/xsl/memv/xml/568_most_emailed_rss.xml',
	'Sports' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200223.xml',
	'Local News' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200748.xml',
	'Opinion' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200224.xml',
	'Business' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200222.xml'
};

// TODO(agam): 4 tabs are fixed right now, but in the future, save settings for tabs

// 5 tabs in base window
var tabNames = [
	'Breaking News', 'Most E-mailed', 'Sports', 'Local News', 'More ...'
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
		title: 'testing...',
		//title: tabName,
		window: win
	});
	// TODO(agam): populate window with table view corresponding to section feeds
	tabGroup.add(tab);
}

// First tab is default
tabGroup.setActiveTab(1);

// open tab group
tabGroup.open();
