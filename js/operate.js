var gridsarr = new Array();
var bool = true;
var winbool=false;
$(function() {
	$("#ts").css("background-color","deepskyblue");
	var index = 1;
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			var html = "<div class='style' rgb='' id='" + index + "' cr='" + (i + 1) + "" + (j + 1) + "'></div>"
			$(".grid").append(html)
			index++;
		}
	}
	$("#28").css("background-image","url(img/red.png)");
	$("#28").attr("rgb", "red");
	$("#29").css("background-image","url(img/blue.png)");
	$("#29").attr("rgb", "blue");
	$("#37").css("background-image","url(img/red.png)");
	$("#37").attr("rgb", "red");
	$("#36").css("background-image","url(img/blue.png)");
	$("#36").attr("rgb", "blue");
	var arr = $(".grid div");
	//提示功能方法
	Prompt(arr,"blue");
	
	$(".grid div").click(function() {
		if($(this).attr("rgb") == "lightgrey") {
			if(bool) {//蓝色点击
				$(this).css("background-image","url(img/blue.png)");
				$(this).attr("rgb", "blue")
				//覆盖方法
				overlap($(this),"blue")
				$("div div[rgb=lightgrey]").css("background-image","none");
				$("div div[rgb=lightgrey]").attr("rgb","");
				Prompt(arr,"red")
				var hy = $(".grid div[rgb=lightgrey]")
				if(hy.length==0){
					if(wink("red","y")){
						return;
					}
					Prompt(arr,"blue")
					var hy1 = $(".grid div[rgb=lightgrey]")
					if(hy1.length==0){
						winbool=true;
						if(wink(null,"n")){
							return;
						}
					}
					alert("红色方无棋可下,你继续!")
					return;
				}
				bool = false;
				$("#ts").css("background-color","red");
				wink("red","y")
			} else {//红色点击
				$(this).css("background-image","url(img/red.png)");
				$(this).attr("rgb", "red")
				//覆盖方法
				overlap($(this),"red")
				$("div div[rgb=lightgrey]").css("background-image","none");
				$("div div[rgb=lightgrey]").attr("rgb","");
				Prompt(arr,"blue")
				var hy = $(".grid div[rgb=lightgrey]")
				if(hy.length==0){
					if(wink("blue","y")){
						return;
					}
					Prompt(arr,"red")
					var hy1 = $(".grid div[rgb=lightgrey]")
					if(hy1.length==0){
						winbool=true;
						if(wink(null,"n")){
							return;
						}
					}
					alert("蓝色方无棋可下,你继续!")
					return;
				}
				bool = true;
				$("#ts").css("background-color","deepskyblue");
				wink("blue","y")
			}
		}
	})
})

//判断输赢的方法
function wink(co,win) {
	var arr = $(".grid div[rgb="+co+"]")
	var name = co=="red"?"blue":"red";
	var rednum = $(".grid div[rgb=red]")
	var bluenum = $(".grid div[rgb=blue]")
	if(win=="y"){
		if(arr.length==0){
			alert(name+"赢了")
			return;
		}
	}
	if(win=="n"){
		if(rednum.length+bluenum.length==64||winbool){
			if(rednum.length>bluenum.length){
				alert("红方胜利"+rednum.length+":"+bluenum.length)
				return true;
			}else if(rednum.length<bluenum.length){
				alert("蓝方胜利"+rednum.length+":"+bluenum.length)
				return true;
			}else{
				alert("平局"+rednum.length+":"+bluenum.length)
			}
		}
	}
}

//提示功能方法
function Prompt(arr,co) {
	//判断右边可点击的地方
	rightdock(arr,co);
	//判断左边可点击的地方
	leftdock(arr,co);
	//判断上边可点击的地方
	topdock(arr,co);
	//判断下边可点击的地方
	underdock(arr,co);
	
	//判断右上边可点击的地方
	righttopdock(arr,co);
	//判断左上边可点击的地方
	lefttopdock(arr,co);
	//判断左下边可点击的地方
	leftunderdock(arr,co);
	//判断右下边可点击的地方
	rightunderdock(arr,co);
}

//覆盖方法
function overlap(th,co) {
	var str = th.attr("cr");
	var row = str.substring(0,1);
	var col = str.substring(1);
	//往左边开始扩散
	leftoverlap(row,col,co)
	//往右边开始扩散
	rightoverlap(row,col,co)
	//往上边开始扩散
	topoverlap(row,col,co)
	//往下边开始扩散
	underoverlap(row,col,co)
	
	//往右上边开始扩散
	righttopoverlap(row,col,co)
	//往左上边开始扩散
	lefttopoverlap(row,col,co)
	//往左下边开始扩散
	leftunderoverlap(row,col,co)
	//往右下边开始扩散
	rightunderoverlap(row,col,co)
}

//往右下边开始扩散
function rightunderoverlap(row,col,co) {
	var row1=0;
	var col1=0;
	var bool1 = true;
	for (var i = parseInt(row)+1,j = parseInt(col)+1; i <=8 ,j <=8; i++,j++) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==(co=="blue"?"blue":"red")){
			row1=$(".grid div[cr=" + i + j + "]").attr("cr").substring(0,1);
			col1=$(".grid div[cr=" + i + j + "]").attr("cr").substring(1);
			break;
		}
	}
	
	if(row1==0&&col1==0){
		bool1=false;
	}
	for (var i = row,j=col; i<=row1,j<=col1; i++,j++) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==""){
			bool1=false;
		}
	}
	if(bool1){
		for (var i = parseInt(row)+1,j = parseInt(col)+1; i <=8 ,j <=8; i++,j++) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==(co=="blue"?"red":"blue")){
			$(".grid div[cr=" + i + j + "]").attr("rgb",""+co+"");
			var strcolor=co=="blue"?"blue":"red";
			$(".grid div[cr=" + i + j + "]").css("background-image","url(img/"+strcolor+".png)");
		}else{
			break;
		}
	}
	}
	
}

//往左下边开始扩散
function leftunderoverlap(row,col,co) {
	var row1=0;
	var col1=0;
	var bool1 = true;
	for (var i = parseInt(row)+1,j = parseInt(col)-1; i <=8 ,j >= 1; i++,j--) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==(co=="blue"?"blue":"red")){
			row1=$(".grid div[cr=" + i + j + "]").attr("cr").substring(0,1);
			col1=$(".grid div[cr=" + i + j + "]").attr("cr").substring(1);
			break;
		}
	}
	if(row1==0&&col1==0){
		bool1=false;
	}
	for (var i = row,j=col; i<=row1,j>=col1; i++,j--) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==""){
			bool1=false;
		}
	}
	if(bool1){
		for (var i = parseInt(row)+1,j = parseInt(col)-1; i <= 8,j >= 1; i++,j--) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==(co=="blue"?"red":"blue")){
			$(".grid div[cr=" + i + j + "]").attr("rgb",""+co+"");
			var strcolor=co=="blue"?"blue":"red";
			$(".grid div[cr=" + i + j + "]").css("background-image","url(img/"+strcolor+".png)");
		}else{
			break;
		}
	}
	}
	
}

//往左上边开始扩散
function lefttopoverlap(row,col,co) {
	var row1=0;
	var col1=0;
	var bool1 = true;
	for (var i = parseInt(row)-1,j = parseInt(col)-1; i >= 1,j >= 1; i--,j--) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==(co=="blue"?"blue":"red")){
			row1=$(".grid div[cr=" + i + j + "]").attr("cr").substring(0,1);
			col1=$(".grid div[cr=" + i + j + "]").attr("cr").substring(1);
			break;
		}
	}
	if(row1==0&&col1==0){
		bool1=false;
	}
	for (var i = row,j=col; i >=row1,j>=col1; i--,j--) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==""){
			bool1=false;
		}
	}
	if(bool1){
		for (var i = parseInt(row)-1,j = parseInt(col)-1; i >= 1,j >= 1; i--,j--) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==(co=="blue"?"red":"blue")){
			$(".grid div[cr=" + i + j + "]").attr("rgb",""+co+"");
			var strcolor=co=="blue"?"blue":"red";
			$(".grid div[cr=" + i + j + "]").css("background-image","url(img/"+strcolor+".png)");
		}else{
			break;
		}
	}
	}
	
}

//往右上边开始扩散
function righttopoverlap(row,col,co) {
	var row1=0;
	var col1=0;
	var bool1 = true;
	for (var i = parseInt(row)-1,j = parseInt(col)+1; i >= 1,j <= 8; i--,j++) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==(co=="blue"?"blue":"red")){
			row1=$(".grid div[cr=" + i + j + "]").attr("cr").substring(0,1);
			col1=$(".grid div[cr=" + i + j + "]").attr("cr").substring(1);
			break;
		}
	}
	if(row1==0&&col1==0){
		bool1=false;
	}
	for (var i = row,j=col; i >=row1,j<=col1; i--,j++) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==""){
			bool1=false;
		}
	}
	if(bool1){
		for (var i = parseInt(row)-1,j = parseInt(col)+1; i >= 1,j <= 8; i--,j++) {
		if($(".grid div[cr=" + i + j + "]").attr("rgb")==(co=="blue"?"red":"blue")){
			$(".grid div[cr=" + i + j + "]").attr("rgb",""+co+"");
			var strcolor=co=="blue"?"blue":"red";
			$(".grid div[cr=" + i + j + "]").css("background-image","url(img/"+strcolor+".png)");
		}else{
			break;
		}
	}
	}
	
}

//往下边开始扩散
function underoverlap(row,col,co) {
	var row1=0;
	var col1=0;
	var bool1 = true;
	for (var i = parseInt(row)+1; i <= 8; i++) {
		if($(".grid div[cr=" + i + col + "]").attr("rgb")==(co=="blue"?"blue":"red")){
			row1=$(".grid div[cr=" + i + col + "]").attr("cr").substring(0,1);
			col1=$(".grid div[cr=" + i + col + "]").attr("cr").substring(1);
			break;
		}
	}
	if(row1==0&&col1==0){
		bool1=false;
	}
	for (var i = row; i <= row1; i++) {
		if($(".grid div[cr=" + i + col + "]").attr("rgb")==""){
			bool1=false;
		}
	}
	if(bool1){
		for (var i = parseInt(row)+1; i < 8; i++) {
		if($(".grid div[cr=" + i + col + "]").attr("rgb")==(co=="blue"?"red":"blue")){
			$(".grid div[cr=" + i + col + "]").attr("rgb",""+co+"");
			var strcolor=co=="blue"?"blue":"red";
			$(".grid div[cr=" + i + col + "]").css("background-image","url(img/"+strcolor+".png)");
		}else{
			break;
		}
	}
	}
	
}

//往上边开始扩散
function topoverlap(row,col,co) {
	var row1=0;
	var col1=0;
	var bool1 = true;
	for (var i = parseInt(row)-1; i >= 1; i--) {
		if($(".grid div[cr=" + i + col + "]").attr("rgb")==(co=="blue"?"blue":"red")){
			row1=$(".grid div[cr=" + i + col + "]").attr("cr").substring(0,1);
			col1=$(".grid div[cr=" + i + col + "]").attr("cr").substring(1);
			break;
		}
	}
	if(row1==0&&col1==0){
		bool1=false;
	}
	for (var i = row; i >= row1; i--) {
		if($(".grid div[cr=" + i + col + "]").attr("rgb")==""){
			bool1=false;
		}
	}
	if(bool1){
		for (var i = parseInt(row)-1; i > 1; i--) {
			if($(".grid div[cr=" + i + col + "]").attr("rgb")==(co=="blue"?"red":"blue")){
				$(".grid div[cr=" + i + col + "]").attr("rgb",""+co+"");
				var strcolor=co=="blue"?"blue":"red"
				$(".grid div[cr=" + i + col + "]").css("background-image","url(img/"+strcolor+".png)");
			}else{
				break;
			}
		}
	}
}

//往右边开始扩散
function rightoverlap(row,col,co) {
	var row1=0;
	var col1=0;
	var bool1 = true;
	for (var i = parseInt(col)+1; i <= 8; i++) {
		if($(".grid div[cr=" + row + i + "]").attr("rgb")==(co=="blue"?"blue":"red")){
			row1=$(".grid div[cr=" + row + i + "]").attr("cr").substring(0,1);
			col1=$(".grid div[cr=" + row + i + "]").attr("cr").substring(1);
			break;
		}
	}
	if(row1==0&&col1==0){
		bool1=false;
	}
	for (var i = col; i <= col1; i++) {
		if($(".grid div[cr=" + row + i + "]").attr("rgb")==""){
			bool1=false;
		}
	}
	if(bool1){
		for (var i = parseInt(col)+1; i < 8; i++) {
			if($(".grid div[cr=" + row + i + "]").attr("rgb")==(co=="blue"?"red":"blue")){
				$(".grid div[cr=" + row + i + "]").attr("rgb",""+co+"");
				var strcolor=co=="blue"?"blue":"red"
				$(".grid div[cr=" + row + i + "]").css("background-image","url(img/"+strcolor+".png)");
			}else{
				break;
			}
		}
	}
	
}

//往左边开始扩散
function leftoverlap(row,col,co) {
	var row1=0;
	var col1=0;
	var bool1 = true;
	for (var i = parseInt(col)-1; i >= 1; i--) {
		if($(".grid div[cr=" + row + i + "]").attr("rgb")==(co=="blue"?"blue":"red")){
			row1=$(".grid div[cr=" + row + i + "]").attr("cr").substring(0,1);
			col1=$(".grid div[cr=" + row + i + "]").attr("cr").substring(1);
			break;
		}
	}
	if(row1==0&&col1==0){
		bool1=false;
	}
	for (var i = col; i >= col1; i--) {
		if($(".grid div[cr=" + row + i + "]").attr("rgb")==""){
			bool1=false;
		}
	}
	if(bool1){
		for (var i = parseInt(col)-1; i > 1; i--) {
			if($(".grid div[cr=" + row + i + "]").attr("rgb")==(co=="blue"?"red":"blue")){
				$(".grid div[cr=" + row + i + "]").attr("rgb",""+co+"");
				var strcolor=co=="blue"?"blue":"red"
				$(".grid div[cr=" + row + i + "]").css("background-image","url(img/"+strcolor+".png)");
			}else{
				break;
			}
		}
	}
	
}

//判断下边可点击的地方
function underdock(arr,co) {
	for(var i = 1; i < arr.length+1; i++) {
		var color = $(arr[i]).attr("rgb");
		var item = $(arr[i])
		if(color == co) {
			var str = item.attr("cr");
			var str1 = str.substring(0, 1);//行
			var str2 = str.substring(1);//列
			for(var j = parseInt(str1)+1; j <= 8; j++) {
				gridsarr.push($(".grid div[cr=" + j + str2 + "]"))
			}
			for(var k = 0; k < gridsarr.length; k++) {
				if($(gridsarr[k]).attr("rgb") == (co=="blue"?"red":"blue")) {
					continue;
				} else {
					if(k == 0) {
						break;
					} else if($(gridsarr[k]).attr("rgb") == ""){
						$(gridsarr[k]).css("background-image","url(img/lightgrey.png)");
						$(gridsarr[k]).attr("rgb", "lightgrey");
						break;
					}else{
						break;
					}
				}
			}
			gridsarr.splice(0, gridsarr.length);
		}
	}
}

//判断上边可点击的地方
function topdock(arr,co) {
	for(var i = 1; i < arr.length+1; i++) {
		var color = $(arr[i]).attr("rgb");
		var item = $(arr[i])
		if(color == co) {
			var str = item.attr("cr");
			var str1 = str.substring(0, 1);//行
			var str2 = str.substring(1);//列
			for(var j = parseInt(str1)-1; j >= 1; j--) {
				gridsarr.push($(".grid div[cr=" + j + str2 + "]"))
			}
			for(var k = 0; k < gridsarr.length; k++) {
				if($(gridsarr[k]).attr("rgb") == (co=="blue"?"red":"blue")) {
					continue;
				} else {
					if(k == 0) {
						break;
					} else if($(gridsarr[k]).attr("rgb") == ""){
						$(gridsarr[k]).css("background-image","url(img/lightgrey.png)");
						$(gridsarr[k]).attr("rgb", "lightgrey");
						break;
					}else{
						break;
					}
				}
			}
			gridsarr.splice(0, gridsarr.length);
		}
	}
}

//判断左边可点击的地方
function leftdock(arr,co) {
	for(var i = 1; i < arr.length+1; i++) {
		var color = $(arr[i]).attr("rgb");
		var item = $(arr[i])
		if(color == co) {
			var str = item.attr("cr");
			var str1 = str.substring(0, 1);
			var str2 = str.substring(1);
			for(var j = parseInt(str2)-1; j >= 1; j--) {
				gridsarr.push($(".grid div[cr=" + str1 + j + "]"))
			}
			for(var k = 0; k < gridsarr.length; k++) {
				if($(gridsarr[k]).attr("rgb") == (co=="blue"?"red":"blue")) {
					continue;
				} else {
					if(k == 0) {
						break;
					} else if($(gridsarr[k]).attr("rgb") == ""){
						$(gridsarr[k]).css("background-image","url(img/lightgrey.png)");
						$(gridsarr[k]).attr("rgb", "lightgrey");
						break;
					}else{
						break;
					}
				}
			}
			gridsarr.splice(0, gridsarr.length);
		}
	}
}

//判断右边可点击的地方
function rightdock(arr,co) {
	for(var i = 1; i < arr.length+1; i++) {
		var color = $(arr[i]).attr("rgb");
		var item = $(arr[i])
		if(color == co) {
			var str = item.attr("cr");
			var str1 = str.substring(0, 1);
			var str2 = str.substring(1);
			for(var j = parseInt(str2) + 1; j <= 8; j++) {
				gridsarr.push($(".grid div[cr=" + str1 + j + "]"))
			}
			for(var k = 0; k < gridsarr.length; k++) {
				if($(gridsarr[k]).attr("rgb") == (co=="blue"?"red":"blue")) {
					continue;
				} else {
					if(k == 0) {
						break;
					} else if($(gridsarr[k]).attr("rgb") == ""){
						$(gridsarr[k]).css("background-image","url(img/lightgrey.png)");
						$(gridsarr[k]).attr("rgb", "lightgrey");
						break;
					}else{
						break;
					}
				}
			}
			gridsarr.splice(0, gridsarr.length);
		}
	}
}

//判断右上边可点击的地方
function righttopdock(arr,co) {
	for(var i = 1; i < arr.length+1; i++) {
		var color = $(arr[i]).attr("rgb");
		var item = $(arr[i])
		if(color == co) {
			var str = item.attr("cr");
			var str1 = str.substring(0, 1);//行
			var str2 = str.substring(1);//列
			for(var j = parseInt(str1) - 1,k=parseInt(str2)+1; j>=1,k<=8; j--,k++) {
				gridsarr.push($(".grid div[cr=" + j + k + "]"))
			}
			for(var k = 0; k < gridsarr.length; k++) {
				if($(gridsarr[k]).attr("rgb") == (co=="blue"?"red":"blue")) {
					continue;
				} else {
					if(k == 0) {
						break;
					} else if($(gridsarr[k]).attr("rgb") == ""){
						$(gridsarr[k]).css("background-image","url(img/lightgrey.png)");
						$(gridsarr[k]).attr("rgb", "lightgrey");
						break;
					}else{
						break;
					}
				}
			}
			gridsarr.splice(0, gridsarr.length);
		}
	}
}

//判断左上边可点击的地方
function lefttopdock(arr,co) {
	for(var i = 1; i < arr.length+1; i++) {
		var color = $(arr[i]).attr("rgb");
		var item = $(arr[i])
		if(color == co) {
			var str = item.attr("cr");
			var str1 = str.substring(0, 1);//行
			var str2 = str.substring(1);//列
			for(var j = parseInt(str1) - 1,k=parseInt(str2)-1; j>=1,k>=1; j--,k--) {
				gridsarr.push($(".grid div[cr=" + j + k + "]"))
			}
			for(var k = 0; k < gridsarr.length; k++) {
				if($(gridsarr[k]).attr("rgb") == (co=="blue"?"red":"blue")) {
					continue;
				} else {
					if(k == 0) {
						break;
					} else if($(gridsarr[k]).attr("rgb") == ""){
						$(gridsarr[k]).css("background-image","url(img/lightgrey.png)");
						$(gridsarr[k]).attr("rgb", "lightgrey");
						break;
					}else{
						break;
					}
				}
			}
			gridsarr.splice(0, gridsarr.length);
		}
	}
}

//判断左下边可点击的地方
function leftunderdock(arr,co) {
	for(var i = 1; i < arr.length+1; i++) {
		var color = $(arr[i]).attr("rgb");
		var item = $(arr[i])
		if(color == co) {
			var str = item.attr("cr");
			var str1 = str.substring(0, 1);//行
			var str2 = str.substring(1);//列
			for(var j = parseInt(str1) + 1,k=parseInt(str2)-1; j<=8,k>=1; j++,k--) {
				gridsarr.push($(".grid div[cr=" + j + k + "]"))
			}
			for(var k = 0; k < gridsarr.length; k++) {
				if($(gridsarr[k]).attr("rgb") == (co=="blue"?"red":"blue")) {
					continue;
				} else {
					if(k == 0) {
						break;
					} else if($(gridsarr[k]).attr("rgb") == ""){
						$(gridsarr[k]).css("background-image","url(img/lightgrey.png)");
						$(gridsarr[k]).attr("rgb", "lightgrey");
						break;
					}else{
						break;
					}
				}
			}
			gridsarr.splice(0, gridsarr.length);
		}
	}
}

//判断右下边可点击的地方
function rightunderdock(arr,co) {
	for(var i = 1; i < arr.length+1; i++) {
		var color = $(arr[i]).attr("rgb");
		var item = $(arr[i])
		if(color == co) {
			var str = item.attr("cr");
			var str1 = str.substring(0, 1);//行
			var str2 = str.substring(1);//列
			for(var j = parseInt(str1) + 1,k=parseInt(str2)+1; j<=8,k<=8; j++,k++) {
				gridsarr.push($(".grid div[cr=" + j + k + "]"))
			}
			for(var k = 0; k < gridsarr.length; k++) {
				if($(gridsarr[k]).attr("rgb") == (co=="blue"?"red":"blue")) {
					continue;
				} else {
					if(k == 0) {
						break;
					} else if($(gridsarr[k]).attr("rgb") == ""){
						$(gridsarr[k]).css("background-image","url(img/lightgrey.png)");
						$(gridsarr[k]).attr("rgb", "lightgrey");
						break;
					}else{
						break;
					}
				}
			}
			gridsarr.splice(0, gridsarr.length);
		}
	}
}

