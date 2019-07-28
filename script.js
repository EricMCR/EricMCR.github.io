window.onload=function(){
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

    $("#close_box").click(function(){
    	$("#login_box").slideUp("slow");
    	$("#id_warn").css("display","none");
    	$("#pw_warn").css("display","none");
    	$("#login_warn").css("display","none");
    })

    $("#submit").click(function(){
    	$("#id_warn").css("display","none");
    	$("#pw_warn").css("display","none");
    	$("#login_warn").css("display","none");
        var userName = $("#input_id").val();
        var password = $("#input_password").val();
        if (checkIfNull(userName,password)){
           checkPassword(userName,password);
        }
    })

    $("#register").click(function(){
      window.open("https://github.com/join");
    })
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
		url: "https://api.github.com/users/"+userName+"/repos",
		type: "GET",
		headers: {
			'Authorization': "Basic " + btoa
		},
          //登录成功
          success: function (data) {
          	$("#login_box").slideUp("slow");
          	$("#login").css("display","none");
          	$("#status_username").html(userName);
          	$("#login_status").css("display","block");
          },

          //登录失败
          error: function (err) {
          	$("#login_warn").css("display","block");
          }

      })
}