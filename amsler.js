//------ Setup

$(document).ready(function()
{
	$("#amsler_options").show();
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

	opts = $("#amsler_options");
	form = $("#amsler_options form");
	opts.hover(opts_mousein, opts_mouseout);
	opts_mouseout();
});

//------ Functions

function amsler_resize(value)
{
	size = value*1.0+20;
	radius = value*0.2+5;
	var svg = $("#amsler_grid")[0].contentDocument;
	$("pattern", svg).attr("width", size); 
	$("pattern", svg).attr("height", size); 
	var h = $("line#horizontal", svg); 
	h.attr("x2", size);
	var v = $("line#vertical", svg); 
	v.attr("y2", size);
	$("circle", svg).attr("r", radius); 
}

function opts_mousein()
{
	form.stop(true, true);
	form.show();
	opts.css("width", "");
	opts.css("height", "");
}

function opts_mouseout()
{
	form.stop(true, true);
	opts.css("width", opts.width());
	opts.css("height", opts.height());
	form.delay(800).fadeOut(2600);
}

function squareSize()
{
  var svg = $("#amsler_grid")[0].contentDocument;
  var size = $("pattern", svg).attr("width"); // grid box size, specified in svg file
  return Math.round(size);
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

// Notice the way the second answer in the first link uses ||'s -- I should do that
// http://stackoverflow.com/questions/1125084/how-to-make-in-javascript-full-screen-windows-stretching-all-over-the-screen
// http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/
// http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
function fullscreenToggle()
{
	if (fullscreenState())
	{
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		}
		else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
		else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
	else
	{
		var doc = document.documentElement;
		if (doc.requestFullscreen) {
			    doc.requestFullscreen();
		}
		else if (doc.mozRequestFullScreen) {
			    doc.mozRequestFullScreen();
		}
		else if (doc.webkitRequestFullScreen) {
			    doc.webkitRequestFullScreen();
		}
	}

}

function fullscreenState()
{
	if (!(document.fullscreen === undefined))
	{
		return document.fullscreen;
	}
	if (!(document.mozFullScreen === undefined))
	{
		return document.mozFullScreen;
	}
	if (!(document.webkitIsFullScreen === undefined))
	{
		return document.webkitIsFullScreen;
	}
}
