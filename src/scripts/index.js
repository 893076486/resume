// js的入口文件

//引入zepto
var $ = require('./components/zepto-modules/_custom')

//引入 IScroll

var IScroll =require('./components/iscroll/iscroll.js');

$("#mainContent").hide();
$(".swiper-container").show();

$("#enter").tap(function(){
	$("#mainContent").show();
	$(".swiper-container").hide();

	//post请求 请求 / api/skill 并把数据列表显示到iscroll里
	$.post('/api/skill', { }, function(response){

		var html = "";
		for(var i=0;i<response.length;i++){
			html +="<li>"+ response[i].name + "</li>"
		}
		$("#scroller ul").html(html);
		//调用 IScroll
		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false); 
	})
	
})





//引入  Swiper

var Swiper = require('./components/swiper/swiper.min.js');

//  引入swiper animate
var  SwiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');





// 打印对象

var mySwiper = new Swiper('.swiper-container', {
	effect: 'cube',
	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    	SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    	SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
	}, 
	onSlideChangeEnd: function(swiper){ 
	    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	}
});


$("#footer div").tap(function(){
	var apiTarget = $(this).attr('id');

	$.post('/api/' +apiTarget, {}, function(response){

		var html = "";
		for(var i=0;i<response.length;i++){
			html +="<li>"+ response[i].name + "</li>"
		}
		$("#scroller ul").html(html); 
	})
	
})


var interval = setInterval(function(){
	if(document.readsState==='complete'){
		clearInterval(interval);
		$("#preload").hide();
		(".swiper-container").show();
		mySwiper.updateContainerSize();
		mySwiper.updateSlidesSize();
	}else{
		$("#preload").show();
	}
},100);