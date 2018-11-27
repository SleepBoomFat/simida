$(document).ready(function(){
	
	$("#add_plugin_btn").on('click',function(){
		var key  = $("#add_plugin_key").val();
		var name = $("#add_plugin_name").val();
		var weight = $("#add_plugin_weight").val();
		var online = $("#add_plugin_online").val();
		var strict = $("#add_plugin_strict").val();
		var authcode = $("#add_plugin_authcode").val();
		$.ajax({
			 type:"POST",
			 url:"/admin/i_match_action/add_or_update_plugin",
			 data: {
				 key:key,
				 name:name,
				 weight:weight,
				 online:online,
				 authcode:authcode,
				 strict:strict
			 },
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 window.location.href="/admin/i_match_query/plugins"
				 }else{
					 alert(msg.msg);
				 }
			 }
		});
	});
	
	$("a[data-action='del_plugin']").on('click',function(){
		event.preventDefault();
		var id = $(this).attr('data-id');
		var params = "id=" + id;
		var entry = $(this).parent().parent();
		$.ajax({
			 type:"POST",
			 url:"/admin/i_match_action/delete_plugin",
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
	
	$(document).on('click',"a[data-action='edit_plugin']",function(){
		event.preventDefault();
		$("#edit_plugin").modal("show");
		$("#edit_plugin").attr('data-id',$(this).attr('data-id'));
		$("#edit_plugin_weight").val($(this).attr('data-weight'));
		$("#edit_plugin_name").val($(this).attr('data-name'));
		$("#edit_plugin_key").val($(this).attr('data-key'));
		$("#edit_plugin_online").val($(this).attr('data-online'));
		$("#edit_plugin_strict").val($(this).attr('data-strict'));
	});
	
	$("#edit_plugin_btn").on('click',function(){
		event.preventDefault();
		var id = $("#edit_plugin").attr('data-id');
		var name = $("#edit_plugin_name").val();
		var weight = $("#edit_plugin_weight").val();
		var key = $("#edit_plugin_key").val();
		var online = $("#edit_plugin_online").val();
		var strict = $("#edit_plugin_strict").val();
		var authcode = $("#edit_plugin_authcode").val();
		$.ajax({
			 type:"POST",
			 url:"/admin/i_match_action/add_or_update_plugin",
			 data: {
				 key:key,
				 name:name,
				 weight:weight,
				 online:online,
				 authcode:authcode,
				 id:id,
				 strict:strict
			 },
			 timeout:180000,
			 dataType:"json",
			 processData:true,
			 success: function(msg){
				 if(msg.code == 0){
					 window.location.href="/admin/i_match_query/plugins"
				 }else{
					 alert(msg.msg);
				 }
			 }
		});
	});	
});