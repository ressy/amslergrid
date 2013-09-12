// http://devlicio.us/blogs/sergio_pereira/archive/2009/02/09/javascript-5-ways-to-call-a-function.aspx
// http://stackoverflow.com/questions/6486307/default-argument-values-in-javascript-functions
// https://github.com/kayahr/jquery-fullscreen-plugin
// Keyboard shortcuts?
//    - fullscreen
//    - flip color
//    - scale grid

//------ Setup

var opts, form;

$(document).ready(function()
{
	// Find the options div and contained form element, as they're shared
	// across these functions
	opts = $("#amsler_options");
	form = $("#amsler_options form");

	// Set up the event handlers, then reveal the options div
	$("#amsler_options #fullscreen").click(function(){
		fullscreenToggle();
		return(false);
		});
	$("#amsler_options #invert_color").click(function(){
		invertColor();
		return(false);
		});
	$("#amsler_size").slider({
		value: 5,
		min: 1,
		max: 100,
		slide: function( event, ui ) {
			amsler_resize(ui.value);
		}
	});
	opts.show();

	// Set up the mousein/mouseout functionality, and start the delayed
	// fade function manually so the options fade by default
	opts.hover(opts_mousein, opts_mouseout);
	opts_mouseout();
});

//------ Functions

// Scale the grid display by a given factor (expects 1 - 100).
function amsler_resize(value)
{
	var svg = $("#amsler_grid")[0].contentDocument;
	var size = value*1.0+20;
	var radius = value*0.2+5;
	$("pattern", svg).attr("width", size); 
	$("pattern", svg).attr("height", size); 
	var h = $("line#horizontal", svg); 
	h.attr("x2", size);
	var v = $("line#vertical", svg); 
	v.attr("y2", size);
	$("circle", svg).attr("r", radius); 
}

// Bring back the options form
function opts_mousein()
{
	form.stop(true, true);  // Stop all animation
	form.show();            // Immediately show the form
	opts.css("width", "");  // Reset container width
	opts.css("height", ""); // Reset container height
}

// Fade the options form away, after a delay
function opts_mouseout()
{
	form.stop(true, true);             // Stop all animation
	opts.css("width", opts.width());   // Preserve form width
	opts.css("height", opts.height()); // Preserve form height
	form.delay(800).fadeOut(2600);     // Delay, then fade
}

// Flip colors for black-on-white or white-on-black grid
function invertColor()
{
	var svg = $("#amsler_grid")[0].contentDocument;
	var rect = $("pattern rect", svg);
	var circ = $("circle", svg);
	var lines = $("line", svg);
	if (circ.attr("fill") == "#000")
	{
		rect.attr("fill", "#000");
		circ.attr("fill", "#fff");
		lines.css("stroke", "#fff");
	}
	else
	{
		rect.attr("fill", "#fff");
		circ.attr("fill", "#000");
		lines.css("stroke", "#000");
	}
}

// All the fullscreen stuff.  Why can't the browsers just agree?
// http://stackoverflow.com/questions/1125084/how-to-make-in-javascript-full-screen-windows-stretching-all-over-the-screen
// http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/
// http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html

// Toggle fullscreen mode on and off
function fullscreenToggle()
{
	if (fullscreenState())
		cancelFullscreen();
	else
		goFullscreen();
}

// Enter fullscreen mode
function goFullscreen()
{
	var doc = document.documentElement;
	var method = doc.requestFullscreen ||
		doc.mozRequestFullScreen ||
		doc.webkitRequestFullScreen;
	method.call(doc);
}

// Leave fullscreen mode
function cancelFullscreen()
{
	var d = document;
	var cancel = d.cancelFullScreen ||
		d.mozCancelFullScreen ||
		d.webkitCancelFullScreen;
	cancel.call(d);
}

// Return true if fullscreen is currently in effect, false if it isn't, and 
// null if it can't be determined or isn't supported at all.
function fullscreenState()
{
	if (!(document.fullscreen === undefined))
		return document.fullscreen;
	if (!(document.mozFullScreen === undefined))
		return document.mozFullScreen;
	if (!(document.webkitIsFullScreen === undefined))
		return document.webkitIsFullScreen;
	return null;
}
