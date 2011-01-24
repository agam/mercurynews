var win = Titanium.UI.currentWindow;

// Global list of sections and corresponding rss feeds
// Note: Obtained these values from http://www.mercurynews.com/rss
// TODO(agam): Determine these dynamically
var sectionFeeds = {
	'Breaking News' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200734.xml',
	'Most E-mailed' : 'feed://extras.mnginteractive.com/live/xsl/memv/xml/568_most_emailed_rss.xml',
	'Sports' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200223.xml',
	'Local News' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200748.xml',
	'Opinion' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200224.xml',
	'Business' : 'feed://feeds.mercurynews.com/mngi/rss/CustomRssServlet/568/200222.xml'
};

Ti.API.info('Window = ' + win.title);

function populateNewsSnippets(xml) {
	var rowData = [];
	var items = xml.documentElement.getElementsByTagName('item');
	var numItems = items.length;
	Ti.API.info('Num items : ' + numItems);
	for (var i = 0; i < numItems; ++i) {
		var row = Titanium.UI.createTableViewRow({height: 'auto'});
		var snippetView = Titanium.UI.createView({
			height: 'auto',
			layout: 'vertical',
			top: 5, right: 5, bottom: 5, left: 5
		});
		// Add an 'optional' image
		var newsSnippetImage = null;
		var newsSnippetTitle = null;
		var newsSnippetText = null;
		var enclosure = items.item(i).getElementsByTagName('enclosure');
		if (enclosure !== null) {
			// TODO(agam): Also verify image type
			newsSnippetImage = Titanium.UI.createImageView({
				image: enclosure.item(0).getAttribute('url'),
				top: 0, left: 0,
				height: 48, width: 48
			});
		}
		// Different layout, depending on whether we're showing an image in this row
		if (newsSnippetImage === null) {
			Ti.API.info('NO IMAGE');
			// Add title
			newsSnippetTitle = Titanium.UI.createLabel({
				text: items.item(i).getElementsByTagName('title').item(0).text,
				left:0, width: 320,
				top: 0, bottom: 2, height: 16,
				textAlign: 'left',
				color: '#444444',
				font: {
					fontFamily: 'Trebuchet MS', fontSize: 14, fontWeight: 'bold'
				}
			});
			// Add actual snippet
			newsSnippetText = Titanium.UI.createLabel({
				text: items.item(i).getElementsByTagName('description').item(0).text,
				left:0, top: 0,
				bottom:2, height: 32,
				width: 320,
				textAlign: 'left',
				font: {fontSize: 14}
			});
			snippetView.add(newsSnippetTitle);
			snippetView.add(newsSnippetText);
		} else {
						Ti.API.info('WE HAVE IMAGE');
			// Add title
			newsSnippetTitle = Titanium.UI.createLabel({
				text: items.item(i).getElementsByTagName('title').item(0).text,
				left: 54, width: 260,
				top: -48, bottom: 2, height: 16,
				textAlign: 'left',
				color: '#444444',
				font: {
					fontFamily: 'Trebuchet MS', fontSize: 14, fontWeight: 'bold'
				}
			});
			// Add actual snippet
			newsSnippetText = Titanium.UI.createLabel({
				text: items.item(i).getElementsByTagName('description').item(0).text,
				left: 54, top: 0,
				bottom: 2, height: 32,
				width: 260,
				textAlign: 'left',
				font: {fontSize: 14}	
			});
			// Add parts of the row view
			snippetView.add(newsSnippetImage);
			snippetView.add(newsSnippetTitle);
			snippetView.add(newsSnippetText);
		}	
		
		// Add this to the current row
		row.add(snippetView);
		row.className = 'item ' + i;
		row.link = items.item(i).getElementsByTagName('link').item(0).text;
		
		// append the row
		rowData[i] = row;
	}
	
	var tableView = Titanium.UI.createTableView({
		data: rowData
	});
	tableView.addEventListener('click', function(e) {
		var webWindow = Titanium.UI.createWindow({
			loadWebURL: e.rowData.link,
			url: "showwebview.js"
		});
		Titanium.UI.currentTab.open(webWindow, {animated: true});
	});
	win.add(tableView);
}

function loadNewsSnippets() {
	var xhr = Titanium.Network.createHTTPClient();
	Ti.API.info('Querying: ' + sectionFeeds[win.title]);
	xhr.open('GET', sectionFeeds[win.title]);
	xhr.onload = function() {
		Ti.API.info(this.responseText);
		var xml = Ti.XML.parseString(this.responseText);
		populateNewsSnippets(xml);
	};
	xhr.send();
}	


loadNewsSnippets();