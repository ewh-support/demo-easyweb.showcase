var responsiveWidth = 1400;
$(document).ready(function() {
	if ($(".homepage").length > 0) {
		$(".open-menu").click(function() {
			$($(this).data("id")).addClass("open");
		})
		$(".close-menu").click(function() {
			$($(this).data("id")).removeClass("open");
		})
		function setHeightSection() {
			var height = $(window).height();
			$(".fullpage .section").height(height);
		}
		
	}
});

$(document).ready(function() {
	var sections = $("#fullpage .section")
	$('#fullpage').fullpage({
		anchors: ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6', 'slide-7'],
		scrollingSpeed: 700,
		onLeave: function(index, nextIndex, direction) {
			if (sections[nextIndex - 1]) {
				$(".animated", sections[nextIndex - 1]).addClass('go');
			}
			if (nextIndex == sections.length)
				botRegUp();
			else botRegDown();
			refreshAnimation();
		},
		responsiveWidth: responsiveWidth,
		afterLoad: function(anchorLink, index) {
		},
	});
	var botBase = 10;
	function botRegUp() {
		var bot = $("footer.footer").outerHeight();
		$("#bot-reg").css({
			"bottom": bot + botBase
		})
	}
	function botRegDown() {
		$("#bot-reg").css({
			"bottom": botBase
		})
	}
	function refreshAnimation() {
		if ($(window).width() >= responsiveWidth) {
			$(".fixed .animated").removeClass("go");
			var t = $(this);
			setTimeout(function() {
				$(".fixed .animated").addClass("go");
			}, 100);
		}
	}
});
$(document).ready(function() {
	scrollMenuResponsive();
	$(window).resize(function(e) {
		scrollMenuResponsive();
		e.preventDefault();
	});
	function scrollMenuResponsive() {
		var heightContainer = $("#main-menu .menu-container").height();
		var heightTop = $("#main-menu .top-menu").outerHeight(true);
		var heightMenu = $("#main-menu ul.list-item").outerHeight(true);
		var heightBot = $("#main-menu .bot-menu").outerHeight(true);
		if (heightTop + heightMenu + heightBot > heightContainer) {
			$("#main-menu .scroll-responsive").addClass("active");
			$("#main-menu .scroll-responsive").height(heightContainer - heightTop);
		}
	}
	$("#main-menu .scroll-responsive").scroll(function(e) {
		e.stopPropagation()
	})
})
$(document).ready(function() {
	var topOld = $(window).scrollTop();
	$(window).scroll(function(e) {
		e.preventDefault();
		if ($(window).width() <= responsiveWidth) {
			var topNew = $(window).scrollTop();
			if (topOld > topNew) {
				$("#gotop-logo").show();
				$(".button-menu").show();
			} else {
				$("#gotop-logo").hide();
				$(".button-menu").hide();
			}
			topOld = topNew;
		}
	})
})

function getHeight(eViewmore) {
	var result = 0,
		lineCur = 0;
	var lineHeight = ($(window).width() > 1680) ? 23 : 21;
	var lineShow = parseInt(eViewmore.data("lineshow"));
	var marginP = eViewmore.find("p").outerHeight(true) - eViewmore.find("p").outerHeight();
	var eP = eViewmore.find("p");
	eViewmore.find("p").each(function() {
		var height = $(this).outerHeight();
		var line = height / lineHeight;
		var tmp = Math.min(Math.max(0, lineShow - lineCur), line);
		if (tmp > 0) result += marginP;
		result += tmp * lineHeight;
		lineCur += line;
	})
	return result - (lineHeight - 8);
}


function getFullHeight(eViewmore) {
	return eViewmore.prop('scrollHeight');
}


