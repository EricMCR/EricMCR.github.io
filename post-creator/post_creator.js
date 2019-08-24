window.onload = function () {
    $("#submit").click(function(){
      var files = document.getElementById('file_selector').files;
      if (files.length > 0){
        var file = files[0];
        console.log(file.name);
        console.log(file.size);
        console.log(file.lastModifiedDate);
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
          creatFile(file.name,reader.result);
        }
      }
    })
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
			alert("创建成功！");
		},
		error:function(err){
			alert("创建失败！");
		}
	})
}