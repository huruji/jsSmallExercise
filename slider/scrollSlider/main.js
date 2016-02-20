/**
 * 
 * @authors huruji(谢志强) (you@example.org)
 * @date    2016-02-19 19:16:30
 * @version $Id$
 */
var imgs=document.getElementsByClassName("slider_img")[0].getElementsByTagName("li");

var imgarr=[];
var imgarr2=[[1,2,3],[4,5,6]]
var leftBtn=document.getElementsByClassName("pre")[0];
var rightBtn=document.getElementsByClassName("next")[0];

for(i=0;i<imgs.length;i++){
	imgarr.push([parseInt(getStyle(imgs[i],"top")),parseInt(getStyle(imgs[i],"left")),parseInt(getStyle(imgs[i],"zIndex")),parseInt((getStyle(imgs[i],"opacity")*100)),parseInt(getStyle(imgs[i].getElementsByTagName("img")[0],"width"))])

}
/*    for(i=0;i<arrimg.length;i++){
        attArr.push([parseInt(getStyle(arrimg[i],"left")),parseInt(getStyle(arrimg[i],"top"))]);
    }*/

leftBtn.onclick=function(){
	imgarr.push(imgarr[0]);
	imgarr.shift(imgarr[0]);
	for(i=0;i<imgarr.length;i++){
        imgs[i].style.zIndex=imgarr[i][2];
        imgarr[i].index=i;
        imgs[i].getElementsByTagName("img")[0].style.width=imgarr[i][4]+"px";
		startmove(imgs[i],{top:imgarr[i][0],left:imgarr[i][1],opacity:imgarr[i][3]}
        )
	}
}
 rightBtn.onclick=function(){
    imgarr.unshift(imgarr[imgarr.length-1]);
    imgarr.pop(imgarr[imgarr.length-1]);
    for(i=0;i<imgarr.length;i++){
        imgs[i].style.zIndex=imgarr[i][2];
        imgarr[i].index=i;
        imgs[i].getElementsByTagName("img")[0].style.width=imgarr[i][4]+"px";
        startmove(imgs[i],{top:imgarr[i][0],left:imgarr[i][1],opacity:imgarr[i][3]}
        )
    }

 }
/*获取元素的属性函数*/
    function getStyle(ele,att){
        if(ele.currentStyle){
            return ele.currentStyle[att];
        }else{
            return getComputedStyle(ele)[att];
        }
    }
/*缓冲运动函数*/
    function startmove(ele,json,fn){
        clearInterval(ele.timer);
        ele.timer=setInterval(function(){
        	var btnstop=true;//用以解决多个属性变化不能到达目标值的问题
        	for(attr in json){
        		if(attr=="opacity"){
        		var cur=parseInt(parseFloat(getStyle(ele,attr))*100);
        	}
        	else{
                var cur=parseInt(getStyle(ele,attr));//parseInt将getstyle的东西转换为整数，并将单位忽略
        	}
        	var ispeed=(json[attr]-cur)/7;
        	if(ispeed>0){
        		ispeed=Math.ceil(ispeed);
        	}else{
        		ispeed=Math.floor(ispeed);//解决当cur大于itarget时的问题
        	}
        		if(attr=="opacity"){
        			ele.style[attr]=(cur+ispeed)/100;
        			ele.style.filter="alpha(opacity:"+cur+ispeed+")";
        		}else{
        			ele.style[attr]=cur+ispeed+"px";
        		}
        		if(cur!=json[attr]){
        		btnstop=false
        	}
        	}

        	if(btnstop){
               clearInterval(ele.timer);
               if(fn){
               	fn();
               }
        	}
        }, 30)
}