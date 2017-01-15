

//2016.8.29

 // 1.解决类名的兼容问题（js 中）
 function getClass(classname,father){
   father=father||document
 	if(father.getElementsByClassName){//判断浏览器；如果是现代浏览器
 		return father.getElementsByClassName(classname)//直接输出
 	}else{
 		    var all=father.getElementsByTagName("*") //如果不是搜索所有的标签名
 		    var arr=[]
	 		for( var i=0;i<all.length;i++){//遍历标签名
	        if(checkRep(classname,all[i].className)){//判断标签名和输入的类名
	        	arr.push(all[i])//加入新数组
	        }
	 	}
	 	return arr//返回数组
 	}
}
function checkRep(val,string){//判断类名和字符串
// 	// 字符串转换数组
	var arr=string.split(" ")
	for(var i in arr){//遍历数组
		if(arr[i]==val){//判断数组和类名
			return true//返回真
		}
	}
	return false//不一样返回假
}


// 2016.8.29
// 2.获取样式的值得兼容函数
function getstyle(obj,arrt){
	if(obj.currentStyle){
	return obj.parseInt(currentStyle[arrt])//"width"
	}else{
	return parseInt(getComputedStyle(obj,null)[arrt])
	}
}


// 2016.8.31
// 3.获取元素的兼容函数（可以支持标签，ID，class）
function $(selector,father){//selector 标签名
	father=father||document
    if(typeof selector=="string"){//判断标签是否为字符串类型
    	selector=selector.replace(/^\s*|\s*$/g,"")//删除空格
    	if(selector.charAt(0)=="."){//如果第一个元素是“.”
    		return getClass(selector.substring(1),father)
    		//截取出“.”以外的类名,和父元素
    	}else if(selector.charAt(0)=="#"){//如果第一个元素是“#”
    		return document.getElementById(selector.substring(1))
    		//截取出“#”以外的类名
    	}else if(/^[a-z][1-6a-z]*/g.test(selector)){
    		//用正则获取标签表
    		return father.getElementsByTagName(selector)
    		//返回标签名
    	}
    }else if(typeof selector=="function"){
    	//判断类型为函数
    	// window.onload=function(){
     //        // 文档加载完成
    	// 	selector()
    	// 	// 回调自己
        addevent(window,"load",function(){
    selector()
       })	
    }
}

//4.获取所有的子节点的兼容函数
//father指定父节点
//type   "a"只有元素节点
//       "b"元素节点和文本节点
function getChild(father,type){
    type=type||"a"
     var ain=father.childNodes;
     var newarr=[]
     for(var i=0;i<ain.length;i++){
        if(type=="a"){
          if(ain[i].nodeType==1){
            newarr.push(ain[i])
          }
       }else if(type=="b"){
        if(ain[i].nodeType==1 || (ain[i].nodeType==3 && ain[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
             newarr.push(ain[i])
          }
       }

     }
   return newarr
}

//5.第一个子节点
function getFrist(father){
    return getChild(father)[0]
}

//6、最后一个子节点
function getLast(father){
    return getChild(father)[getChild(father).length-1]
}
//7、获取任意一个子节点
function getNum(father,xiaobiao){
    return getChild(father)[xiaobiao]
} 



//8.事件绑定的兼容问题
function addevent(obj,event,fun){
    obj[fun]=function(){//fun=属性名，不是形参。.不是变量
            fun.call(obj)
        }
    if(obj.attachEvent){
        obj.attachEvent("on"+event,obj[fun])
    }else {
        obj.addEventListener(event,obj[fun],false)
    }
}

//9.事件移出的兼容函数
function removeEvent(obj,event,fun){
    if(obj.detachEvent){
       obj.detachEvent("on"+event,obj[fun])
    }else{
        obj.removeEventListener(event,obj[fun],false)}
}

//鼠标的滚轮问题；
function mouseWheel(obj,up,down){//obj;对象；up：向上；down：向下
      if(obj.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn);
      }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);
        obj.addEventListener("DOMMouseScroll",scrollFn,false);
      }
       function scrollFn(e){
        e=e||window.event;
        if(e.preventDefault){
          e.preventDefault()
        }else{
          e.returnValue=false;
        }
        var f=e.detail||e.wheelDelta;
        if(f==-3 || f==120){
            if(up()){
                up()
            }
        }else if(f==-120 ||f==3){
            if(down()){
                down()
            }
        }

       }
}

//hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/