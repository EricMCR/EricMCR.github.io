window.onload = function () {
	var username = getCookie("username");
	var isLogined = (username != "" && username != null);
	$("#submit1").click(function(){
		if (!isLogined){
			alert("请先登录！");
		}else{
			var files = document.getElementById('file_selector').files;
			if (files.length > 0){
				var file = files[0];
				var reader = new FileReader();
				reader.readAsText(file);
				reader.onloadstart = function(){
					$("#wait_box").css("display","block");
				}
				reader.onload = function(){
					creatFile(file.name,reader.result,username);
				}
			}
		}
	})

	$("#submit2").click(function(){
		if (!isLogined){
			alert("请先登录！");
		}else{
			var title = $("#title").val();
			var content = $("#content").val();
			console.log(title);
			creatFile(title+".md",content,username);
		}
	})

	changeDot();
};

function creatFile(file_name,file_content,author){
	var token = window.btoa("EricMCR" + ":" + "Ma1Chao2Ran3");
	file_content = "---\nlayout: default\ntitle: "+file_name.split(".")[0]+"\nauthor: "+author+"\n---\n" + file_content;
	var content = window.btoa(unescape(encodeURIComponent( file_content)));
	var now = new Date();
	var name = now.getFullYear()+"-"+("0"+(now.getMonth()+1)).slice(-2)+"-"+("0"+now.getDate()).slice(-2)+"-"+file_name;
	console.log("name:"+name);
	console.log("content:"+file_content);
	var url = "https://api.github.com/repos/EricMCR/EricMCR.github.io/contents/_posts/"+name;
	var json = {
		"message":"new post",
		"content":content
	}
	$.ajax({
		url:url,
		type:"PUT",
		headers: {
			'Authorization': "Basic " + token
		},
		data: JSON.stringify(json),
		success:function(data){
			$("#wait_box p").html("创建成功！3秒后自动<a href='../knowledge-base/'>跳转</a>至知识库...");
			setTimeout(function(){window.location.href="../knowledge-base/"},3000);
		},
		error:function(err){
			$("#wait_box p").html("创建失败！"+err);
			setTimeout(function(){location.reload()},3000);
		}
	})
}

//获取cookie信息
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

//动态改变登录提示框中的省略号个数
function changeDot(){
	var s = $("#dot").text();
	if (s != "..."){
		s = s+".";
	}else{
		s = "";
	}
	$("#dot").text(s);
	setTimeout("changeDot()",500);
}