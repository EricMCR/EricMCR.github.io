window.onload=function(){

  // $(".header").css("width",$(document).width());
  // $(".content").css("width",$(document).width());
  // $(".column").css("width",$(document).width());

  var username = getCookie("username");
  if (username != "" && username != null){
    $("#login").css("display","none");
    $("#status_username").html(username);
    $("#login_status").css("display","block");
  }

  //加载头像
  var avatar_url = getCookie("avatar");
  if (avatar_url != "" && avatar_url != null){
    $("#avatar_small").attr("src",avatar_url);
  }

  var oldname = getCookie("oldname");
  if (oldname != "" && oldname != null){
    $("#input_id").val(oldname);
  }

  var oldpw = getCookie("oldpw");
  if (oldpw != "" && oldpw != null){
    $("#input_password").val(oldpw);
  }

  if (getCookie("remember_status") == "true"){
    $("#rememberpw").prop("checked",true);
  }

  $("#sys_button").click(function(){
		//调整两按钮样式
   $("#sys_button").attr("class","option_button_light");
   $("#member_button").attr("class","option_button");

	    //使实验室介绍显示
	    $("#sys_intro").animate({height:'392px'});
    })

  $("#member_button").click(function(){
    	//调整两按钮样式
     $("#member_button").attr("class","option_button_light");
     $("#sys_button").attr("class","option_button");

        //使实验室介绍隐藏
        $("#sys_intro").animate({height:'0px'});
      })

  $("#login").click(function(){
   $("#login_box").slideToggle("slow");
   $("#id_warn").css("display","none");
   $("#pw_warn").css("display","none");
   $("#login_warn").css("display","none");
 })

  $("#sign_out").click(function(){
    setCookie("username",getCookie("username"),-1);
    setCookie("avatar",getCookie("username"),-1);
    location.reload();
  })

  $("#close_box").click(function(){
   $("#login_box").slideUp("slow");
   $("#id_warn").css("display","none");
   $("#pw_warn").css("display","none");
   $("#login_warn").css("display","none");
 })

  changeDot();

  $("#submit").click(function(){
   $("#id_warn").css("display","none");
   $("#pw_warn").css("display","none");
   $("#login_warn").css("display","none");
   var userName = $("#input_id").val();
   var password = $("#input_password").val();
   if (checkIfNull(userName,password)){
     $("#wait_box").css("display","block");
     
     checkPassword(userName,password);
   }
 })

  $("#register").click(function(){
    window.open("https://github.com/join");
  })

  //加载介绍信息
  var index_data = getJson("https://api.github.com/repos/EricMCR/EricMCR.github.io/contents/Data/index_data.json");

  $("#sys_info_content").text(index_data.lab_introduction);

  for(let i = 0;i < index_data.members_introduction.length;i++){
    $("#members_intro").append("<div class='members_box'><img src='images/index/"+index_data.members_introduction[i].img_src+"' class='members_img'><span class='members_info'>"+index_data.members_introduction[i].name+"<ul>"+index_data.members_introduction[i].introduction+"</span></div>");
  }
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

//检查输入账号和密码是否为空,返回true-正确、false-存在空
function checkIfNull(userName,password){
  if (userName.length == 0){
   $("#id_warn").css("display","block");
   return false;
 }else if (password.length == 0){
   $("#pw_warn").css("display","block");
   return false;
 }else{
   return true;
 }
}

//检查用户名密码是否正确
function checkPassword(userName,password){
	var btoa = window.btoa(userName + ":" + password);//用户信息编码
	$.ajax({
		url: "https://api.github.com/users/"+userName,
		type: "GET",
		headers: {
			'Authorization': "Basic " + btoa
		},
          //登录成功
          success: function (data) {
            var json = JSON.stringify(data);
            var obj = eval ("(" + json + ")");
            setCookie("username",userName,3);
            setCookie("avatar",obj.avatar_url);
            setCookie("oldname",userName,30);
            if ($("#rememberpw").prop("checked")){
              setCookie("oldpw",password,7);
              setCookie("remember_status","true",7);
            }else{
              setCookie("oldpw",password,-1);
              setCookie("remember_status","false",7);
            }
            $("#wait_box").css("display","none");
            $("#login_box").css("display","none");
            $("#login").css("display","none");
            $("#avatar_small").attr("src",obj.avatar_url);
            $("#status_username").html(userName);
            $("#login_status").css("display","block");
          },

          //登录失败
          error: function (err) {
            $("#wait_box").css("display","none");
            $("#login_warn").css("display","block");
          }

        })
}

//设置用户登录信息
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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