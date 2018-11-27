$(document).ready(function(){
	
	$("#add_templates_btn").on('click',function(){
		var name = $("#add_templates_name").val();
		var page = $("#add_templates_page").val();
		var cover = $("#add_templates_cover").val();
		$.ajax({
			 type:"POST",
			 url:"/admin/i_brand_action/add_template",
			 data: {
				 name:name,
				 page:page,
				 cover:cover
			 },
			 timeout:180000,
			 dataType:'json',
			 processData:true,
			 success: function(msg){
				 if(msg.code != 0){
					 alert(msg.msg);
				 }else{
					 window.location.href="/admin/i_brand_query/templates";
				 }
			 }
		});
	});
	
	$(document).on("click","a[data-action='del_templates']",function(){
		var templId = $(this).parent().attr('data-id');
		if(!confirm("确认删除该模版？")){
			return;
		}
		$.ajax({
			 type:"POST",
			 url:"/admin/i_brand_action/delete_template",
			 data: {
				 templateId:templId
			 },
			 timeout:180000,
			 dataType:'json',
			 processData:true,
			 success: function(msg){
				 if(msg.code != 0){
					 alert(msg.msg);
				 }else{
					 window.location.href="/admin/i_brand_query/templates";
				 }
			 }
		});
	});
	
	$('#edit_templates').on('show.bs.modal', function (e) {
		  var $ele = $(e.relatedTarget);
		  $("#edit_templates").attr('data-id',$ele.parent().attr('data-id'));
		  $("#edit_templates_cover").val($ele.parent().attr('data-cover'));
		  $("#edit_templates_name").val($ele.parent().attr('data-name'));
		  $("#edit_templates_page").val($ele.parent().attr('data-page'));
	});
	
	$("#edit_templates_btn").click(function(){
		var templateId = $("#edit_templates").attr('data-id');
		var name = $("#edit_templates_name").val();
		var page = $("#edit_templates_page").val();
		var cover = $("#edit_templates_cover").val();
		$.ajax({
			 type:"POST",
			 url:"/admin/i_brand_action/edit_template",
			 data: {
				 templateId:templateId,
				 name:name,
				 page:page,
				 cover:cover
			 },
			 timeout:180000,
			 dataType:'json',
			 processData:true,
			 success: function(msg){
				 if(msg.code != 0){
					 alert(msg.msg);
				 }else{
					 window.location.href="/admin/i_brand_query/templates";
				 }
			 }
		});
	});
	
	$('#del_option').on('show.bs.modal', function (e) {
		  var $ele = $(e.relatedTarget);
		  $("#del_option").attr('data-id',$ele.parent().attr('data-id'));
	});
	
	$("#del_option_btn").click(function(){
		var templateId = $("#del_option").attr('data-id');
		var name = $("#del_option_name").val();
		$.ajax({
			 type:"POST",
			 url:"/admin/i_brand_action/delete_template_option",
			 data: {
				 templateId:templateId,
				 name:name,
			 },
			 timeout:180000,
			 dataType:'json',
			 processData:true,
			 success: function(msg){
				 if(msg.code != 0){
					 alert(msg.msg);
				 }else{
					 window.location.href="/admin/i_brand_query/templates";
				 }
			 }
		});
	});
	
	$('#add_option').on('show.bs.modal', function (e) {
		 var $ele = $(e.relatedTarget);
		 $("#add_option").attr('data-id',$ele.parent().attr('data-id'));
//		 $("#textoption").attr('checked',"checked");
		 $("#textoption").click();
	});
	
	$("#textoption").click(function(){
		$("#add_option_width").attr("disabled",true);
		$("#add_option_height").attr("disabled",true);
		$("#add_option_size").attr("disabled",true);
		$("#add_option_length").attr("disabled",false);
	});
	
	$("#picoption").click(function(){
		$("#add_option_width").attr("disabled",false);
		$("#add_option_height").attr("disabled",false);
		$("#add_option_size").attr("disabled",false);
		$("#add_option_length").attr("disabled",true);
	});
	
	$("#multimedia").click(function(){
		$("#add_option_width").attr("disabled",true);
		$("#add_option_height").attr("disabled",true);
		$("#add_option_size").attr("disabled",true);
		$("#add_option_length").attr("disabled",true);
	});
	
	$("#add_option_btn").click(function(){
		var templateId = $("#add_option").attr('data-id');
		var optionType = $("#optionType input:radio:checked").val();
		var name = $("#add_option_name").val();
		var desc = $("#add_option_desc").val();
		var width = $("#add_option_width").val();
		var height = $("#add_option_height").val();
		var size = $("#add_option_size").val();
		var length = $("#add_option_length").val();
		if($.trim(name) == ""){
			alert("选项名必填");
			return; 
		}
		if($.trim(desc) == ""){
			alert("选项名描述必填");
			return; 
		}
		
		$.ajax({
			 type:"POST",
			 url:"/admin/i_brand_action/add_template_option",
			 data: {
				 templateId:templateId,
				 optionType:optionType,
				 name:name,
				 length:length,
				 width:width,
				 height:height,
				 size:size,
				 desc:desc
			 },
			 timeout:180000,
			 dataType:'json',
			 processData:true,
			 success: function(msg){
				 if(msg.code != 0){
					 alert(msg.msg);
				 }else{
					 window.location.href="/admin/i_brand_query/templates";
				 }
			 }
		});
	});
	
});