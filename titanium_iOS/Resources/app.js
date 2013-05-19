// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//Extended Splash
//var view = Ti.UI.createView({ backgroundImage:'images/Background.png', top:0, width:'100%', height:'100%' });

// var imgview = Ti.UI.createImageView({ image:"images/Logo.png", opacity:0, width:'100%', height:'100%' });
// imgview.animate({ 
        // curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT, 
        // opacity: 1, 
        // duration: 1000,
        // zIndex: 9999999
    // });


// var newTop = imgview.top - 100;
// imgview.animate({ top: newTop, duration: 500 }, function () {
    // imgview.top = newTop; 
// });

//var splashWin = Titanium.UI.createWindow({  
//    title:'',
//    backgroundColor:'#000000',
//    backgroundImage:'images/Background.png',
//    zIndex: 10
//});


//splashWin.add(view);
//splashWin.add(imgview);


//Flip transition to next view -- landingView
	var f = Titanium.UI.createWindow({
		backgroundColor:'#000',
		url:'landingView.js'
	});
	f.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
