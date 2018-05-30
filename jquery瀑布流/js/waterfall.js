$(document).ready(function(){
    $(window).on("load",function(){
        imglocation();
    })
})
//图片排放
function imglocation(){
    var box=$(".box");
    var boxWidth=box.eq(0).width;
    var num=Math.floor($(window).width()/boxWidth);     //计算一行能方的图片个数
    var arr=[];
    box.each(function(index,value){
        var boxHeight=box.eq(index).height();
        if(index<num){
            arr[index]=boxHeight;
        }else{
            var minHeight=Math.min.apply(null,arr);
            var minIndex=$.inArray(minHeight,arr);
            $(value).css({
                "position":"absolute",
                "top":minHeight,
                "left":box.eq(minIndex).position().left
            })
            arr[minIndex]+=box.eq(index).height();
        }
    })
}