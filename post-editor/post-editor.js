function onload2 () {
	// var he = HE.getEditor('content',{
	// 	autoHeight : true,
	// 	autoFloat : false,
	// 	uploadPhoto : true,
	// 	uploadPhotoHandler : 'php/uploadPhoto.php',
	// 	uploadPhotoSize : 0,
	// 	uploadPhotoType : 'gif,png,jpg,jpeg',
	// 	uploadPhotoSizeError : '不能上传大于××KB的图片',
	// 	uploadPhotoTypeError : '只能上传gif,png,jpg,jpeg格式的图片',
	// 	lang : 'zh-jian',
	// });

    var mditor =  Mditor.fromTextarea(document.getElementById('content'));
	var username = getCookie("username");
	var isLogined = (username != "" && username != null);
	// $("#submit1").click(function(){
	// 	if (!isLogined){
	// 		alert("请先登录！");
	// 	}else{
	// 		var files = document.getElementById('file_selector').files;
	// 		if (files.length > 0){
	// 			var options = $(".tagName:checked");
	// 			var tags = new Array();
	// 			for (let i = 0; i < options.length; i++){
	// 				if (options[i].value != "其他"){
	// 					tags.push(options[i].value);
	// 				}else{
	// 					if (IsNullOrWhitespace($("#selfDefinedTag").val())){
	// 						alert("请输入自定义标签名称！")
	// 						return false;
	// 					}else{
	// 						tags.push($("#selfDefinedTag").val());
	// 					}
	// 				}
	// 			}
	// 			var file = files[0];
	// 			var reader = new FileReader();
	// 			reader.readAsText(file);
	// 			reader.onloadstart = function(){
	// 				$("#wait_box1").css("display","block");
	// 			}
	// 			reader.onload = function(){
	// 				creatFile(splitFileName(file.name),reader.result,username,tags);
	// 			}
	// 		}else{
	// 			alert("请选择文件！");
	// 		}
	// 	}
	// })

	$("#submit2").click(function(){
		if (!isLogined){
			alert("请先登录！");
			console.log("content:/n"+mditor.value);

		}else{
			//he.sync();
			var title = $("#title").val();
			var category = $("#category_checkbox").val();
			var content = mditor.getContent();
			var options = $(".tagName:checked");
			var tags = new Array();

			for (let i = 0; i < options.length; i++){
				if (options[i].value != "其他"){
					tags.push(options[i].value);
				}else{
					if (IsNullOrWhitespace($("#selfDefinedTag").val())){
						alert("请输入自定义标签名称！")
						return false;
					}else{
						tags.push($("#selfDefinedTag").val());
					}
				}
			}
			if (IsNullOrWhitespace(title)){
				alert("请输入标题！");
			}else if (IsNullOrWhitespace(content)){
				alert("请输入内容！");
			}else{
				$("#wait_box1").css("display","block");
				creatFile(title,category,content,username,tags);
			}
		}
	})

	changeDot();
}

//在GitHub库中创建文件
function creatFile(file_name,category,file_content,author,tags){
	var token = "RXJpY01DUjpNYTFDaGFvMlJhbjM=";

	//获取当前时间并将其格式化：YEAR-MONTH-DAY HH:MM:SS
	var now = new Date();
	var time = now.getFullYear()+"-"+("0"+(now.getMonth()+1)).slice(-2)+"-"+("0"+now.getDate()).slice(-2)+" "+("0"+(now.getHours())).slice(-2)+":"+("0"+(now.getMinutes())).slice(-2)+":"+("0"+(now.getSeconds())).slice(-2);

	//构建格式化的文件名：YEAR-MONTH-DAY-TITLE-AUTHOR.md
	var name = now.getFullYear()+"-"+("0"+(now.getMonth()+1)).slice(-2)+"-"+("0"+now.getDate()).slice(-2)+"-"+file_name+"-"+author+".md";

    //构建格式化的标签
	var tagsToString = "\ntags:";
	for (let i = 0; i<tags.length;i++){
		tagsToString += "\n- " + tags[i];
	}

    //将头信息构建并连接进文章内容
	file_content = "---\nlayout: default\ntitle: "+file_name+"\ncategory: "+category+"\nauthor: "+author+"\ndate: "+time+tagsToString+"\n---\n" + file_content;

	//将文件内容转码
	var content = window.btoa(unescape(encodeURIComponent( file_content)));
	console.log("name:"+name);
	console.log("content:\n"+file_content);
	var url = "https://api.github.com/repos/EricMCR/EricMCR.github.io/contents/_posts/"+name;
	var json = {
		"message":"new post by "+author,
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
			$("#wait_box1 p").html("创建成功！3秒后自动<a href='../knowledge-base/'>跳转</a>至知识库...");
			setTimeout(function(){window.location.href="../knowledge-base/"},3000);
		},
		error:function(err){
			$("#wait_box1 p").html("创建失败！"+err);
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

//截取文件名
function splitFileName(text) {
	var pattern = /\.{1}[a-z]{1,}$/;
	if (pattern.exec(text) !== null) {
		return (text.slice(0, pattern.exec(text).index));
	} else {
		return text;
	}
}

//判断字符串为空或全为空格
function IsNullOrWhitespace(input) {
    if (typeof input === 'undefined' || input == null) return true;
    return !/\S/.test(input);
}