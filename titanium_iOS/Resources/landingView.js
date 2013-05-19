// APP STYLES
var lightTheme = {};
lightTheme.fontColor = 'white';
lightTheme.backgroundImagePath = '';

var appTheme = lightTheme;

// Setup new window and view
var win = Titanium.UI.currentWindow;
var self = Ti.UI.createView();
win.add(self);

// Facebook keys
Titanium.Facebook.appid = "184691578354933"; // fareplanes on Facebook
Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

// Force modal login (instead of mobile web)
Titanium.Facebook.forceDialogAuth = true;

// Trigger Facebook auth modal if not logged in.
if (!Titanium.Facebook.loggedIn)
{
	Titanium.Facebook.authorize();
}


// On successful Facebook login
	function doLogin(){
		var tableView = Ti.UI.createTableView({minRowHeight:100});
		var win = Ti.UI.createWindow({title:'Facebook Query'});
		win.add(tableView);
		
		var close = Titanium.UI.createButton({
			title:'Close'
		});
		close.addEventListener('click', function() {
			win.close();
		});
		win.setRightNavButton(close);

		var query = "SELECT uid, name, pic_square, status FROM user ";
		query +=  "where uid IN (SELECT uid2 FROM friend WHERE uid1 = " + Titanium.Facebook.uid + ")";
//		query += "order by last_name limit 100";
		Ti.API.info('user id ' + Titanium.Facebook.uid);
		Titanium.Facebook.request('fql.query', {query: query},  function(r) {
			if (!r.success) {
				if (r.error) {
					alert(r.error);
				} else {
					alert("call was unsuccessful");
				}
				return;
			}
			var result = JSON.parse(r.result);
			var data = [];
			for (var c=0;c<result.length;c++)
			{
				var row = result[c];
	
				var tvRow = Ti.UI.createTableViewRow({
					height:'auto',
					selectedBackgroundColor:'#fff',
					backgroundColor:'#fff'
				});
				var imageView;
				imageView = Ti.UI.createImageView({
					image:row.pic_square === null ? '/images/custom_tableview/user.png' : row.pic_square,
					left:10,
					width:50,
					height:50
				});
	
				tvRow.add(imageView);
	
				var userLabel = Ti.UI.createLabel({
					font:{fontSize:16, fontWeight:'bold'},
					left:70,
					top:5,
					right:5,
					height:20,
					color:'#576996',
					text:row.name
				});
				tvRow.add(userLabel);
	
				var statusLabel = Ti.UI.createLabel({
					font:{fontSize:13},
					left:70,
					top:25,
					right:20,
					height:'auto',
					color:'#222',
					text:(!row.status || !row.status.message ? 'No status message' : row.status.message)
				});
				tvRow.add(statusLabel);
	
				tvRow.uid = row.uid;
	
				data[c] = tvRow;
			}
			
			tableView.setData(data, { animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN });
			
			win.open({modal:true});
		});

	}
	
	// capture facebook login event.
	Titanium.Facebook.addEventListener('login', doLogin);
	
	// Add any time and any place image buttons
	var anytimeButton = Titanium.UI.createButton({
		title:'',
		backgroundImage:'images/choose_location.png',
		width:'100%',
		height:'50%',
		top:0
	});
	
	anytimeButton.addEventListener("click", function() {
		Ti.API.info("Opening google");
		Ti.Platform.openURL("http://www.google.com/");
	});
	self.add(anytimeButton);

	var anyplaceButton = Titanium.UI.createButton({
		title:'',
		backgroundImage:'images/choose_date.png',
		width:'100%',
		height:'50%',
		bottom:0
	});
	
	anyplaceButton.addEventListener("click", function() {
		Ti.API.info("Take me anywhere.");
//		Ti.Platform.openURL("http://www.google.com/");

		var f = Titanium.UI.createWindow({
			backgroundColor:'#000',
			url:'datePickerView.js'
		});
		f.open({transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP});

	});
	self.add(anyplaceButton);

	// Add Facebook login/logout button	
	self.add(Titanium.Facebook.createLoginButton({
		style:Ti.Facebook.BUTTON_STYLE_WIDE,
		bottom:30
	}));
