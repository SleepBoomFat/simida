$(document).ready(function(){
  
	$("#create_account").on('click',function(){
		$("#create_account_dialog").css("display","block");
	});
	
	$("#create_account_btn").on('click',function(){
		var account = $("#account_name").val();
		var password = $.md5($("#account_password").val());
		var note = $("#account_note").val();
		var phone = $("#account_phone").val();
		var tid = $("#account_tid").val();
		var params = "nick=" + account + "&password=" + password + "&note=" + note + "&phone=" + phone+"&tid="+tid;
		$("#error_msg").text('');
		$.ajax({
			 type:"POST",
			 url:"/admin/i_root_action/create_account",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 window.location.href="/admin/i_root_query/add_user"
				 }else{
					 $("#error_msg").text(msg.msg);
				 }
			 }
		});
	});
	
	$("#add_right").on('click',function(){
		$("#add_right_dialog").css("display","block");
	});
	
	$("#add_right_btn").click(function(){
		var right = $("#right_name").val();
		var note = $("#right_note").val();
		var params = "note=" + note +"&right=" + right;
		$("#add_right_error_msg").text('');
		$.ajax({
			 type:"GET",
			 url:"/admin/i_root_action/create_right",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 window.location.href="/admin/i_root_query/add_right"
				 }else{
					 $("#add_right_error_msg").text(msg.msg);
				 }
			 }
		});
	});
	
	$("a[data-action='add_userright']").on('click',function(){
		event.preventDefault();
		$("#add_userright_dialog").css('display','block');
		$("#add_userright_data").attr('data-nick',$(this).attr('data-nick'));
	});
	
	$("#add_userright_btn").click(function(){
		var nick = $("#add_userright_data").attr('data-nick');
		var right = $("#add_userright_name").val();
		var code = $("#add_userright_code").val();
		var params = "nick=" + nick +"&right=" + right +"&code=" + code;
		$("#add_userright_error_msg").text('');
		$.ajax({
			 type:"GET",
			 url:"/admin/i_root_action/add_account_right",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 window.location.href="/admin/i_root_query/add_user"
				 }else{
					 $("#add_userright_error_msg").text(msg.msg);
				 }
			 }
		});
	});
	
	$("a[data-action='del_rights']").click(function(){
		event.preventDefault();
		var right = $(this).attr('data-right');
		var params = "right=" + right;
		var entry = $(this).parent().parent();
		$.ajax({
			 type:"GET",
			 url:"/admin/i_root_action/del_right",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 entry.remove();
				 }else{
					 alert(msg.msg);
				 }
			 }
		});
	});
	
	$("a[data-action='del_account']").click(function(){
		event.preventDefault();
		if(!confirm("确认删除该帐户?")){
			return;
		}
		var nick = $(this).attr('data-nick');
		var params = "nick=" + nick;
		var entry = $(this).parent().parent();
		$.ajax({
			 type:"GET",
			 url:"/admin/i_root_action/del_account",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 entry.remove();
				 }else{
					 alert(msg.msg);
				 }
			 }
		});
	});
	
	$("a[data-action='del_userright']").on('click',function(){
		event.preventDefault();
		$("#del_userright_dialog").css('display','block');
		$("#del_userright_data").attr('data-nick',$(this).attr('data-nick'));
	});
	
	$("#del_userright_btn").click(function(){
		var nick = $("#del_userright_data").attr('data-nick');
		var right= $("#del_userright_name").val();
		var params = "nick=" + nick +"&right=" + right;
		$("#del_userright_error_msg").text('');
		$.ajax({
			 type:"POST",
			 url:"/admin/i_root_action/del_account_right",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 window.location.href="/admin/i_root_query/add_user"
				 }else{
					 $("#del_userright_error_msg").text(msg.msg);
				 }
			 }
		});
	});	
	
	$("a[data-action='edit_password']").click(function(){
		$("#reset_password").modal('show');
		$("#reset_password").attr('data-nick',$(this).attr('data-nick'));
	});
	
	$("#reset_password_btn").click(function(){
		var nick = $("#reset_password").attr('data-nick');
		if($.trim($("#reset_password_new").val()) == "" || $("#reset_password_new").val().length < 6){
			alert("密码至少6位");
			return;
		}
		var password = $.md5($("#reset_password_new").val());
		var params = "account=" + nick +"&password=" + password;
		$.ajax({
			 type:"POST",
			 url:"/admin/i_root_action/reset_password",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 $("#reset_password").modal('hide');
					 alert("修改成功");
				 }else{
					 alert(msg.msg);
				 }
			 }
		});
	});
});