window.onload = function () {
    $("#submit").click(function(){
      var files = document.getElementById('file_selector').files;
      // var reader = new FileReader();
      // reader.readAsArrayBuffer(file); 
      // reader.onload = function(){ 
      //   console.log(reader.result);
      // }
      if (files.length > 0){
        var file = files[0];
        console.log(file.name);
        console.log(file.size);
        console.log(file.lastModifiedDate);
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
          console.log(reader.result);
        }
      }
    })
};

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

//获取GitHub文件中的json对象
function getJson(url){
  var json;
  $.ajax({
    url:url,
    type:"GET",
    async:false,
    success:function(data){
      var json1 = JSON.stringify(data);
      var obj = eval ("(" + json1 + ")");
      var content = decodeURIComponent(escape(window.atob(obj.content)));
      json = JSON.parse(content);
    },
    error:function(err){
      alert(err);
    }
  })
  return json;
}

//计算所需页总数并加载到页面内
function addPageNumber(partsTotal,pageLocation){
  var total = Math.ceil(partsTotal/5);
  for (let i = 0;i < total;i++){
    $(pageLocation).append("<div class='page-number'><p>"+(i+1)+"</p></div>");
  }
}

//更改当前显示的内容
function showParts(pageNumber,parts){
  var index = 5*(pageNumber-1);
  parts.css("display","none");
  var i = 0;
  while (i < 5 && index < parts.length){
    $(parts[index]).css("display","block");
    index++;
    i++;
  }
}

//更改当前页标样式
function showPageNumber(pageNumber,pages){
  pages.attr("class","page-number");
  $(pages[pageNumber-1]).attr("class","page-number light");
}