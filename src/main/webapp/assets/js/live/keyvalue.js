$(document).ready(function(){
	
	$("#add_keyvalue_btn").on('click',function(){
		var key  = $("#add_keyvalue_key").val();
		var name = $("#add_keyvalue_name").val();
		var value = $("#add_keyvalue_value").val();
		var params = "key=" + key + "&name=" + name + "&value=" + value;
		$.ajax({
			 type:"POST",
			 url:"/admin/i_app_action/add_keyvalue",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 window.location.href="/admin/i_app_query/keyvalues"
				 }else{
					 alert(msg.msg);
				 }
			 }
		});
	});
	
	$("a[data-action='del_keyvalue']").on('click',function(){
		event.preventDefault();
		var kvId = $(this).attr('data-id');
		var params = "kvId=" + kvId;
		var entry = $(this).parent().parent();
		$.ajax({
			 type:"POST",
			 url:"/admin/i_app_action/delete_keyvalue",
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
	
	$(document).on('click',"a[data-action='edit_keyvalue']",function(){
		event.preventDefault();
		$("#edit_keyvalue").modal("show");
		$("#edit_keyvalue").attr('data-id',$(this).attr('data-id'));
		$("#edit_keyvalue_value").val($(this).attr('live-value'));
	});
	
	
	$("#edit_keyvalue_btn").on('click',function(){
		event.preventDefault();
		var kvId = $("#edit_keyvalue").attr('data-id');
		var value = $("#edit_keyvalue_value").val();
		var params = "kvId=" + kvId + "&value="+value;
		$.ajax({
			 type:"POST",
			 url:"/admin/i_app_action/edit_keyvalue",
			 data: params,
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 window.location.href="/admin/i_app_query/keyvalues"
				 }else{
					 alert(msg.msg);
				 }
			 }
		});
	});	
});