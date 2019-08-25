window.onload = function () {
    $("#submit1").click(function(){
      var files = document.getElementById('file_selector').files;
      if (files.length > 0){
        var file = files[0];
        console.log(file.name);
        console.log(file.size);
        console.log(file.lastModifiedDate);
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onloadstart = function(){
            $("#wait_box").css("display","block");
        }
        reader.onload = function(){
        	creatFile(file.name,reader.result);
        }
      }
    })

    $("#submit2").click(function(){
    	var title = $("#title").val();
    	var content = $("#content").val();
    	console.log(title);
    	creatFile(title+".md",content);
    })

    changeDot();
};

function creatFile(file_name,file_content){
	var token = window.btoa("EricMCR" + ":" + "Ma1Chao2Ran3");
	file_content = "---\nlayout: default\ntitle: "+file_name.split(".")[0]+"\n---\n" + file_content;
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