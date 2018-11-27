$(document).ready(function(){
	
	$("#user_search").on('click',function(){
		event.preventDefault();
		
		var start = 0;
		if($.trim($("#start_time").val()) != ""){
			start = new Date($("#start_time").val()).getTime();
		}
		var end = 0;
		if($.trim($("#end_time").val()) != ""){
			end = new Date($("#end_time").val()).getTime();
		}
		var params = "start=" + start + "&end=" + end;
		window.location.href = "/admin/i_user_action/export_user?"+params;
	});
 	
});