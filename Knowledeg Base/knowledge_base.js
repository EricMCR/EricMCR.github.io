window.onload = function () {

    //加载头像
    var avatar_url = getCookie("avatar");
    console.log(avatar_url);
    if (avatar_url != "" && avatar_url != null){
        $("#avatar").attr("src",avatar_url);
    }else{
        $("#avatar").attr("src","sdad.jpg");
    }

    //获取全部元素
    var allLis = $$('nav').getElementsByTagName('li');
    var knowledgeDom = $$('Dom').getElementsByClassName('k-dom');
    var personalDom = $$('Dom').getElementsByClassName('p-dom');

    personalDom[0].style.display = "none";
    //console.log(allLis, knowledgeDom, personalDom);

    //分别设置鼠标点击时的样式
    allLis[0].onclick = function () {
        allLis[0].className = 'selected';
        allLis[1].className = '';
        knowledgeDom[0].style.display = "flex";
        personalDom[0].style.display = "none";
        $$("search").style.display = "inline-flex";
    }
    allLis[1].onclick = function () {
        allLis[0].className = '';
        allLis[1].className = 'selected';
        knowledgeDom[0].style.display = "none";
        personalDom[0].style.display = "block";
        $$("search").style.display = "none";
    }

    var middle = document.getElementsByClassName("middle");
    //var avatar = middle[0].getElementsByTagName("img");
    var intro = document.getElementsByClassName("introduction");
    
    $("#avatar_box").click(function(){
        $(".introduction").slideToggle("slow");
    })
    /*快速获取id*/
    function $$(id) {
        return typeof id === "string" ? document.getElementById(id) : null;
    }

    //加载知识库内容
    var knowledgeBase = getJson("https://api.github.com/repos/EricMCR/EricMCR.github.io/contents/Data/knowledge_base.json");
    for (let i = 0;i < knowledgeBase.length; i++){
        $("#k-area").append("<li class='k-part' id='k-part"+i+"'></li>");
        if (i > 4){
            $("#k-part"+i).css("display","none");
        }
        $("#k-part"+i).append("<div class='basic-information'><img src='../images/知识库/u168.png'><div class='name'><p>"+knowledgeBase[i].author+"</p></div><div class='topic'><p>"+knowledgeBase[i].title+"</p></div><div class='time'><p>发布时间:"+knowledgeBase[i].release_time+"</p></div></div>");
        $("#k-part"+i).append("<div class='concrete-information'><p>"+knowledgeBase[i].content+"</p></div>");
        $("#k-part"+i).append("<div class='download-information'><p>下载链接</p></div>");
        $("#k-part"+i).click(function(){

        })
    }
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