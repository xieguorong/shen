$(function(){
	var canvas_box=document.querySelector(".canvas_box");
	var cx=canvas_box.offsetWidth;
	var cy=canvas_box.offsetHeight;
	var canvas=document.querySelector("canvas");
	var cobj=canvas.getContext("2d");
	var copy=document.querySelector(".copy");
	canvas.width=cx;
	canvas.height=cy;
	var drawObj=new shape(canvas,copy,cobj);
	 //$("body").mousedown(function(e){
    //    e.preventDefault();  //阻止浏览器的默认行为
    //})
    //$("body").mousemove(function(e){
    //    e.preventDefault();
    //})
	/*画图*/
	$(".menu_left .menu_list:nth-child(2) .inner_list").click(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		var fn=$(this).attr("data-role");
		if(fn!=="pen"){
			drawObj.type=fn;
			drawObj.draw();
		}else{
			drawObj.pen();
		}
	})
	$(".menu_left .menu_list:nth-child(2)  .inner_list .number2").change(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		drawObj.bianNum=$(this).val();
		drawObj.draw();
	})
	$(".menu_left .menu_list:nth-child(2) .inner_list .number1").change(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		drawObj.jiaoNum=$(this).val();
		drawObj.draw();

	})
	/*画图的方式*/
	$(".menu_left .menu_list:nth-child(3) .inner_list").click(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		var fn=$(this).attr("data-role");
		drawObj.style=fn;
		drawObj.draw();
	})
// 画图的颜色
	$(".menu_right .menu_list:nth-child(1) input").change(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
   	 drawObj[$(this).attr("data-role")]=$(this).val();
   	 drawObj.draw();
   })
//线条的粗细
	$(".menu_right .menu_list:nth-child(2) .inner_list").click(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		var num=$(this).attr("data-role");
		if(num!=="null"){
			drawObj.linew=num;
			drawObj.draw();
		}
	})
	$(".menu_right .menu_list:nth-child(2) input").change(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		var num=$(this).val();
		drawObj.linew=num;
		drawObj.draw();
	})
//文件新建
	$(".menu_left .menu_list:nth-child(1) .inner_list1").click(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		if((drawObj).historys.length>0){
			var yes=confirm("是否保存");
			if(yes){
				var url=canvas.toDataURL();
				var newurl=url.replace("image/png","stream/octet");
				location.href=newurl;
			}
		}
		cobj.clearRect(0,0,canvas.width,canvas.height);
		drawObj.historys=[];
	})
//文件下载
	$(".menu_left .menu_list:nth-child(1) .inner_list2").click(function(){
		  $(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		if((drawObj).historys.length>0){
			var url=canvas.toDataURL();
			var newurl=url.replace("image/png","stream/octet");
			location.href=newurl;
		}else{
			$(".box_small").css("display","block");
		}
	})
//文件返回
	$(".menu_left .menu_list:nth-child(1) .inner_list3").click(function(){
		$(".xp").css({display:"none"});
       drawObj.isshowxp=false;
		if(drawObj.historys.length==0){
			cobj.clearRect(0,0,canvas.width,canvas.height);
			setTimeout(function(){
				$(".box_small").css("display","block");
			},10)
		}else{
			if (drawObj.isback) {
				if (drawObj.historys.length == 1) {
					drawObj.historys.pop();
					cobj.clearRect(0, 0, canvas.width, canvas.height);
				} else {
					drawObj.historys.pop();
	                 cobj.putImageData(drawObj.historys.pop(), 0, 0);
				}
			} 
			else {
                 cobj.putImageData(drawObj.historys.pop(), 0, 0);
			}
			drawObj.isback = false;
		}
	})
	//擦除
		var xpObj=$(".xp");
	$(".menu_right .menu_list:nth-child(3) .inner_list").click(function(){
		drawObj.isshowxp=true;
		drawObj.xp(xpObj);
	})
	$(".menu_right .menu_list:nth-child(3) .inner_list input").change(function(){
		drawObj.xpsize = $(this).val();
		$(".xp").css({
			width:$(this).val() + "px",
			height:$(this).val() + "px"
		})
		drawObj.xp(xpObj);
	})
 //  $(".inner_list ").click(function(){
	// 		   $(".xp").hide();
	//             drawObj.isshowxp=false;

	// })
//关闭信息
	$(".box_small button").click(function(){
		$(".box_small").css("display","none");
	})
})

