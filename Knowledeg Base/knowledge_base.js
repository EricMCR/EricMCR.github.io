window.onload = function () {

    //加载头像
    var avatar_url = getCookie("avatar");
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