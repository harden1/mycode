//左边更多产品
$("#more,#slide").mouseover(function() {
        $("#slide").show();
    }).mouseout(function() {
        $("#slide").hide();
    })
    //搜索历史记录显示
$("#search-inp").focus(function() {
        $(".search-history").show();
        //    删除单条历史记录
        $(".search-history ul li i").click(function() {
            $(this).parent().parent().remove();
            return false;
        });
        //    关闭历史记录
        $(".search-history b:last-child").click(function() {
                $(".search-history").hide();
            })
            //    删除历史记录
        $(".search-history b:nth-child(2)").click(function() {
            $(".search-history").remove();
        })
    }).blur(function() {
        $(".search-history").hide();
    })
    //新闻切换、
$(".s-menu-nav ul li").click(function(index) {
        $(this).addClass("current").siblings().removeClass("current");
        $(".s-news-nav").eq($(this).index()).addClass("current").siblings().removeClass("current");
    $(".set-nav").hide();
    })
    //滚动条显示导航
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var nav=$(".s-menu-cont").offset().top;
    var navl=$(".cont-l").offset().left+573;
    if (scroll >= 0 && scroll < 161) {
        $("#center-search").removeClass("s-center-search");
        $(".search-logo").attr({
            "src": "images/bd_logo1_31bdc765.png",
            "height": "129"
        });
        $(".cont-r").removeAttr("style");
    } else if (scroll >= 161&&scroll<nav) {
        $("#center-search").removeClass(".baidu-search").addClass("s-center-search");
        $(".search-logo").attr("src", "images/logo_top_ca79a146.png").removeAttr("height");
        $(".top-feed").css("visibility","visible");
        $(".cont-r").removeAttr("style");
    }else if(scroll>nav&&$(".s-news-wrapper").hasClass("current")){
       $(".cont-r").css({"position":"fixed","top":"100px","left":navl,"-webkit-transform":"translateZ(0)","transform":"translateZ(0)"});
    }
})
//回到顶部
$(".top-feed").mouseover(function(){
    $(".icon-mask").show();
}).mouseout(function(){
     $(".icon-mask").hide();
});
$(".top-feed").click(function(){
    var speed=400;
    $("body,html").animate({"scrollTop":"0"},speed);
    return false;
});
//设置
$(".s_menu_set").click(function(){
    $(".set-nav").slideToggle(100);
})