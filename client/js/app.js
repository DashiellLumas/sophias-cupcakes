(function($){
"use strict";
$('#menu').slicknav({label: ''});
// FLEX SLIDER
if($(".flexslider")[0]) {
	$('.flexslider').flexslider(
	{
		"directionNav" : false,
		"controlNav" : false,
		"animation" : "fade",
		"prevText" : "",
		"nextText" : "",
	}
	);
}
// FLEX SLIDER TESTIMONIALS
if($(".flexslider2")[0]) {
    $('.flexslider2').flexslider(
	{
		"directionNav" : false,
		"controlNav" : true,
		"animation" : "slide",
		"prevText" : "",
		"nextText" : ""
	}
	);
}
// SMOOTH SCROLL
$('a[href*="#"]:not([href="#"])').on('click',function() {
if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  var target = $(this.hash);
  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
    return false;
  }
}
});
// POP IMAGE
$('.parent-container').magnificPopup({
  delegate: 'a', // child items selector, by clicking on it popup will open
  type: 'image',
  gallery:{enabled:true}
});
// SCROLL EFFECTS
$(window).on("scroll",function(){
	if($(window).width()<768)
		return false;
	if($(this).scrollTop()>0){
		$(".info-bar").slideUp();
		$(".navbar").css({"background":"#000","top":"0"})
	}
	else{
		$(".info-bar").slideDown(200);
		$(".navbar").css({"background":"transparent","top":"48px"})
	}
})
})(jQuery)
