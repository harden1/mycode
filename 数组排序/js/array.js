var arr = ["a", "x", "b", "d","m", "m", "a", "k", "m", "p", "j", "a"];
var object = {};
var sort = {};
//遍历数组取得每个值及下标值
arr.forEach(function (value, index) {
    if (object[value]) {
        object[value]++;
        sort[value] = sort[value] + "," + index;
    } else {
        object[value] = 1;
        sort[value] = "" + index;
    }
    //            object[value]++;
})
console.log(object);
console.log(sort);
//        计算获取出现最多的字母
var sum = 0;
var num;
for (i in object) {
    if (object[i] >= sum) {
        sum = object[i];
        num = i;
        console.log("出现最多的字母是：" + num);
        console.log("位置分布:" + sort[num]);
    }
}