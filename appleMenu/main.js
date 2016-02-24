/**
 * 
 * @authors huruji（谢志强） (you@example.org)
 * @date    2016-02-24 14:22:06
 * @version $Id$
 */
 document.onmousemove=function(event){
			var imgarr=document.getElementsByTagName("img");
			var odiv=document.getElementById("imgbox");
			for(i=0;i<imgarr.length;i++){
				var x=imgarr[i].offsetLeft+imgarr[i].offsetWidth/2;
				var y=imgarr[i].offsetTop+odiv.offsetTop+imgarr[i].offsetHeight/2;
				var a=x-event.clientX;
				var b=y-event.clientY;
				var dis=Math.sqrt(a*a+b*b);
				var pro=1-dis/200;
				if(pro>0){
					imgarr[i].style.width=64*(1+pro)+"px";
				}else{
					imgarr[i].style.width=64+"px";
				}
			}
		}

