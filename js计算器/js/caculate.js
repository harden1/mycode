var number = 0;
var boon = false;
var result; //计算结果值
var express; //表达式
var str = "";
var str1 = "";
var str2 = "";
//    获取结果框跟表达式
function express() {
    result = document.getElementById("result");
    express = document.getElementById("prompt");
}
//    结果输入框显示数字
function liNum(num) {
    if (boon) {
        result.value = num;
        boon = false;
        if (str == "") {
            express.innerHTML = num;
        } else {
            express.innerHTML += num;
        }
    } else {
        if (result.value == "0") {   //第一次输入为0
            result.value = num;
            express.innerHTML = num;
        } else {
            result.value += num;
            express.innerHTML += num;
        }
    }
    str1 = express.innerHTML;
}
//          加减乘除计算
function operate(elem) {
    if (!str1) {
        return;
    }
    var resultTwo = result.value;
    if (boon && str != "=") {
        switch (elem) {
            case "+":
            case "-":
                express.innerHTML = str + elem; //表达式字符串相加
                break;
            case "×":
            case "÷":
                express.innerHTML = "(" + str + ")" + elem; //除法运算增加括号
                break;
            default:
                break;
        }
        str = elem;
    } else {
        boon = true;
        switch (str) { //结果计算
            case "+":
                number += parseFloat(resultTwo);
                break;
            case "-":
                number -= parseFloat(resultTwo);
                break;
            case "×":
                number *= parseFloat(resultTwo);
                break;
            case "÷":
                number /= parseFloat(resultTwo);
                break;
            default:
                number = parseFloat(resultTwo);
                break;
        }
        switch (elem) {
            case "+":
            case "-":
                express.innerHTML += elem;
                break;
            case '×':
            case '÷':
                if (str == "×" || str == "÷" || str == "") {
                    express.innerHTML += elem;
                } else {
                    express.innerHTML = "(" + express.innerHTML + ")" + elem;
                }
                break;
            case "=":
                break;
            default:
                break;
        }
        result.value = number;
        str = elem;
    }
}

function point() { //输入小数点
    var resultThree = result.value;
    if (boon) {
        resultThree = "0.";
        express.innerHTML += "0.";
        boon = false;
    } else {
        if (resultThree.indexOf(".") == -1) {
            resultThree += ".";
            if (express.innerHTML == "") {
                express.innerHTML = "0.";
            } else {
                express.innerHTML += ".";
            }
        }
    }
    result.value = resultThree;
}

function clearall() { //清空所有
    number = 0;
    str = "";
    result.value = "0";
    express.innerHTML = "";
    boon = true;
}

function minus() { //负数计算
    result.value = parseFloat(result.value) * -1;
    express.innerHTML = "-(" + express.innerHTML + ")";
}