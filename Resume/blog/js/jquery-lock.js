;(function ($) {
	$.extend({
		'lock':function () {
			$('<div class="lock"></div>').appendTo('body');
			$('.lock').css({
				width:$(window).width(),
				height:$(document).height()+50,
				backgroundColor:'rgba(0,0,0,0.5)',
				opacity:0.5,
				position:'absolute',
				top:0,
				left:0,
				zIndex:99,
			}).show();
			$(window).resize(function () {
				$('.lock').css({
					width:$(window).width(),
					height:$(document).height()+50
				});
			});
			for (var i=0; i<arguments.length; i++) {
				if (arguments[0].closeButton == true){
					$('<span class="close">X<span>').css({
						width:'100px',
						height:'70px',
						color:'white',
						float:'right',
						fontSize:'50px',
						zIndex:101,
						cursor:'pointer',
						textAlign:'center',
					}).click(function () {
						$('.lock').hide();
					}).appendTo('.lock');
				}
			}
			document.documentElement.style.overflow='hidden';
			return this;
		},
		unlock:function () {
			$('.lock').css({
				backgroundColor:'rgba(0,0,0,0.5)',
				opacity:0.5
			}).hide();
			document.documentElement.style.overflow='auto';
			return this;
		}
	});
})(jQuery);