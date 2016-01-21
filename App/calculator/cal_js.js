/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-12-30 08:54:57
 * @version $Id$
 */
window.onload=function(){
var getScreen=document.getElementsByTagName("input")[0];
function screen(inputnum){
     var display=getScreen.value.toString().trim();
     getScreen.value=display+inputnum;
}

/*数字及运算符号输入函数*/
function inputnums(){
  var num=document.getElementsByClassName("num");
  for(i=0;i<num.length;i++){
    num[i].index=i;
    num[i].addEventListener("click", function(){
     var valuenum=num[this.index].innerHTML.toString().trim();
      screen(valuenum);
    },false)
  }
}
inputnums();

/*清除屏幕数字函数*/
function clear(){
  var clear=document.getElementsByClassName("clear")[0];
  clear.addEventListener("click", function(){
    getScreen.value=""
  },false)
}
clear();

/*删除上次输入数字的函数*/
function deletenum(){
  var backspace=document.getElementsByClassName("del")[0];
  backspace.addEventListener("click",function(){
    getScreen.value=getScreen.value.slice(0,getScreen.value.length-1);
  },false)
}
deletenum();

/*运算屏幕中的数学表达式的函数*/
function calculate(){
  var equal=document.getElementsByClassName("run")[0];
  equal.addEventListener("click", function(){
/*利用toFixed()方法使其保留8位小数，同时解决js浮点数运算的错误*/
    getScreen.value=eval(getScreen.value).toFixed(8);
  })
}
calculate();

}

