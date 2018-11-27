String.prototype.replaceAll = function(s1,s2){
   return this.replace(new RegExp(s1,"gm"),s2);
}

var sendv1 = false;
function sendAuthcode(account,type){
	if(sendv1){
		return;
	}
	sendv1 = true;
	$.ajax({
        type:"POST",
        url:"/admin/i_root_action/get_auto_authcode",
        data:{
            account:account,
            type:type
        },
        timeout:180000,
        dataType:"json",
        processData:true,
        success: function(msg){
            if(msg.code == 0){
                alert("发送成功");
            }else if(msg.code == -98){
                alert("参数错误");
            }else{
                alert(msg.msg);
            }
            sendv1 = false;
        }
    });
}

var sendv2 = false;
function sendAuthcodev2(type){
	if(sendv2){
		return;
	}
	sendv2 = true;
	$.ajax({
        type:"POST",
        url:"/admin/i_root_action/get_auto_authcode_v2",
        data:{
            type:type
        },
        timeout:180000,
        dataType:"json",
        processData:true,
        success: function(msg){
            if(msg.code == 0){
                alert("发送成功");
            }else if(msg.code == -98){
                alert("参数错误");
            }else{
                alert(msg.msg);
            }
            sendv2 = false;
        }
    });
}

function checkLogin(obj){
	if(obj.code == -94){
		window.location.href="/admin/i_sign_query/login";
	}
}

$(document).ready(function(){
	$("#backicon-img").hover(function(){
		$("#backicon-img").attr("src","/assets/img/backtohome_hover.png");
	},function(){
		$("#backicon-img").attr("src","/assets/img/backtohome_normal.png");
	});
	
	$("div[trigger-action='select-field']").click(function(){
		$(this).siblings('.select-option').show();
	});
	
	$("li[trigger-action='sel-switch']").click(function(){
		$(this).parent('.select-option').hide();
		var dataid = $(this).parent('.select-option').attr('data-id');
		var value = $(this).attr('data-value');
		var text = $(this).text();
		$("#"+dataid+"-show").text(text);
		$("#"+dataid+"-value").val(value);
	});
	
	$(".select-option").hover(function () {},function () {
		 $(this).hide();
	});
	
	$("#signIn").click(function(){
		var account = $("#account").val();
		var password = $.md5($("#password").val());
		var autocode = $("#autocode").val();
		var data = "account=" + account + "&password=" + password;
		$.ajax({
			type:"POST",
			url:"/admin/i_sign_action/do_login",
			data:{
				account:account,
				password:password,
				code:autocode
			},
			timeout:60000,
			dataType:"html",
			processData:true,
			success:function(data){
				var obj = $.evalJSON(data);
				if(obj.code != 0){
					$("#errormsg").text(obj.msg);
				}else{
					location.href=obj.result;
				}
			}
		});
		return false;
	});
	
	$("a[data-action='resetpass']").click(function(){
		event.preventDefault();
		$("#resetpass_dialog").css('display',"block");
	});
	
	$("#resetpass_btn").click(function(){
		event.preventDefault();
		var oldpass = $.md5($("#resetpass_oldpass").val());
		if($("#resetpass_newpass").val() == "" || $("#resetpass_newpass").val().length < 6){
			alert("至少6位密码");
			return;
		}
		var newpass = $.md5($("#resetpass_newpass").val());
		var params = "oldpass=" + oldpass + "&newpass=" + newpass; 
		$.ajax({
			type:"POST",
			url:"/admin/i_sign_action/resetpass",
			data:params,
			timeout:60000,
			dataType:"json",
			processData:true,
			success:function(data){
				checkLogin(data);
				if(data.code != 0){
					alert(data.msg);
				}else{
					window.location.href="/";
				}
			}
		});
	});
	
});

function browsercheck(){
    var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	if (window.ActiveXObject)
	Sys.ie = ua.match(/msie ([\d.]+)/)[1];
	else if (document.getBoxObjectFor)
	Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
	else if (window.MessageEvent && !document.getBoxObjectFor)
	Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
	else if (window.opera)
	Sys.opera = ua.match(/opera.([\d.]+)/)[1];
	else if (window.openDatabase)
	Sys.safari = ua.match(/version\/([\d.]+)/)[1];
	if(Sys.ie){
		if(Sys.ie == '6.0'){
			window.location.href="/iepage";
		}else if(Sys.ie == '7.0'){
			window.location.href="/iepage";
		}
	}
	 /*
	if(Sys.firefox) document.write('Firefox: '+Sys.firefox);
	if(Sys.chrome) document.write('Chrome: '+Sys.chrome);
	if(Sys.opera) document.write('Opera: '+Sys.opera);
	if(Sys.safari) document.write('Safari: '+Sys.safari);
	*/
}
//browsercheck();