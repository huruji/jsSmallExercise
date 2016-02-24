/**
 * 
 * @authors huruji（谢志强） (you@example.org)
 * @date    2016-02-24 14:19:53
 * @version $Id$
 */
 var imgbox=document.getElementsByClassName("container")[0];
		var oli=imgbox.getElementsByTagName("li");
		var arr=[];
		var zindexMin=2;
		/*布局转换*/
		for(i=0;i<oli.length;i++){
           arr[i]={left:oli[i].offsetLeft,top:oli[i].offsetTop}
		};
		for(i=0;i<oli.length;i++){
			oli[i].style.left=arr[i].left+"px";
			oli[i].style.top=arr[i].top+"px";
			oli[i].style.position="absolute";
			oli[i].style.margin=0;
			oli[i].index=i;
		};
		for(i=0;i<oli.length;i++){
			setDrag(oli[i]);
		};
		/*碰撞检测*/
		function pzTest(ele1,ele2){
			var l1=ele1.offsetLeft;
			var a1=l1+ele1.offsetWidth;
			var t1=ele1.offsetTop;
			var b1=t1+ele1.offsetHeight;

			var l2=ele2.offsetLeft;
			var a2=l2+ele2.offsetWidth;
			var t2=ele2.offsetTop;
			var b2=t2+ele2.offsetHeight;
			if(l1>a2||l2>a1||t1>b2||t2>b1){
				return false;
			}else{
				return true;
			}
		};
		function getDis(obj1, obj2)
	{
		var a=obj1.offsetLeft-obj2.offsetLeft;
		var b=obj1.offsetTop-obj2.offsetTop;
		
		return Math.sqrt(a*a+b*b);
	}
	
	function findNearest(obj)	//找到碰上的，并且最近的
	{
		var iMin=999999999;
		var iMinIndex=-1;
		
		for(i=0;i<oli.length;i++)
		{
			if(obj==oli[i])continue;
			
			if(pzTest(obj, oli[i]))
			{
				var dis=getDis(obj, oli[i]);
				
				if(iMin>dis)
				{
					iMin=dis;
					iMinIndex=i;
				}
			}
		}
		
		if(iMinIndex==-1)
		{
			return null;
		}
		else
		{
			return oli[iMinIndex];
		}
	}
		/*拖拽函数*/
		function setDrag(ele){
			ele.onmousedown=function(event){
				var lastLeft=ele.offsetLeft;
				var lastTop=ele.offsetTop;
				var disx=event.clientX-ele.offsetLeft;
				var disy=event.clientY-ele.offsetTop;
				ele.style.cursor="move";
				document.onmousemove=function(event){
					ele.style.zIndex=zindexMin++;
					ele.style.left=event.clientX-disx+"px";
					ele.style.top=event.clientY-disy+"px";
/*					for(i=0;i<oli.length;i++){
						oli[i].className="";
						if(ele==oli[i]) continue;
						if(pzTest(ele,oli[i])){
							oli[i].className="active";
						}
					}*/
					for(i=0;i<oli.length;i++){
						oli[i].className="";
					};
					var onear=findNearest(ele);
					if(onear){
						onear.className="active";
					}
				};
				document.onmouseup=function(){
					document.onmousedown=null;
					document.onmousemove=null;
					ele.style.cursor="auto";
					var onear=findNearest(ele);
					if(onear){
						startmove(ele,arr[onear.index]);
						startmove(onear,arr[ele.index]);
						onear.className="";
						onear.style.zIndex=zindexMin++;
						ele.style.zIndex=zindexMin++;

						var tmp=0;
						tmp=onear.index;
						onear.index=ele.index;
						ele.index=tmp;
					}else{
						startmove(ele,{top:arr[ele.index].top,left:arr[ele.index].left});
					}
				};
				clearInterval(ele.timer);
				return false;//改变浏览器的默认行为
			};
		};
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

