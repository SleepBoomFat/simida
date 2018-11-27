$(document).ready(function(){

	loadImageAsync($("#container"));
	
	$('.form_datetime').datetimepicker({
	    format: 'yyyy-mm-dd hh:ii',
	    weekStart: 1,
	    todayBtn:  1,
	    autoclose: 1,
	    todayHighlight: 1,
	    startView: 2,
	    forceParse: 0,
	    showMeridian: 1,
	    pickerPosition: "bottom-right"
    });

    new AjaxUpload($("#upload_video"),{
        action: '/admin/i_tool_action/upload_mp4_24hour',
        data: {
            type : 2
        },
        name: 'data',
        timeout:120000,
        onSubmit: function(file,ext) {
            if(!(ext && /^(mp4)$/.test(ext))) {
                alert("您上传的视频格式有误，请重新选择！");
                return false;
            }
        },
        onComplete:function(file,resp) {
            var obj = $.evalJSON(resp);
            if(obj.code == 0){
                // $("#upload_video").css('display','none');
                // $("#add_video_url").css('display','block');
                $("#add_video_url").val(obj.result[0]);
                $("#add_video_md5").val(obj.result[1]);
            }else{
                alert('上传失败:' + obj.msg);
            }
        }
    });

    new AjaxUpload($("#upload_video_cover"),{
        action: '/admin/i_tool_action/upload_impic',
        data: {
            type : 2
        },
        name: 'data',
        timeout:120000,
        onSubmit: function(file,ext) {
            if(!(ext && /^(png|jpeg|jpg|webp)$/.test(ext))) {
                alert("您上传的图片格式有误，请重新选择！");
                return false;
            }
        },
        onComplete:function(file,resp) {
            var obj = $.evalJSON(resp);
            if(obj.code == 0){
                // $("#upload_video_cover").css('display','none');
                // $("#add_video_cover").css('display','block');
                $("#add_video_cover").val(obj.result);
            }else{
                alert('上传失败:' + obj.msg);
            }
        }
    });

    $("#add_video_btn").on('click',function(){
        var video = $("#add_video_url").val();
        var cover = $("#add_video_cover").val();
        var ptime = Date.parse($("#add_video_pubtime").val());
        var sender = $("#add_video_sender").val();
        var togender = $("#add_video_togender").val();
        var tos = $("#add_video_tos").val();
        var tikiPrice = $("#add_video_tikiPrice").val();
        var videoMD5 = $("#add_video_md5").val();
        var content = $("#add_video_content").val();
        $.ajax({
            type:"POST",
            url:"/admin/i_oper_action/add_video_message",
            data: {
                video:video,
                cover:cover,
                ptime:ptime,
                sender:sender,
                togender:togender,
                tos:tos,
                videoMD5:videoMD5,
                tikiPrice:tikiPrice,
                content : content
            },
            timeout:180000,
            dataType:"json",
            processData:true,
            success: function(msg){
                if(msg.code == 0){
                    window.location.href="/admin/i_oper_query/video_notify";
                }else if(msg.code == -98){
                    alert("参数错误");
                }else{
                    alert(msg.msg);
                }
            }
        });
    });


	$("#add_notify").on('click',function(){
		event.preventDefault();
		$("#add_notify_dialog").css("display","block");
	});
	
	$("#add_notify_dialog").on('hidden.bs.modal',function(){
        $("#add_notify_dialog_filter").attr('user-filter-id','');    
    })  


	$("#add_notify_btn").on('click',function(){
     	 var from = $("#add_notify_from").val();
		 var ptime = Date.parse($("#add_notify_pubtime").val());
		 var linktxt_zh = $("#add_notify_linktext_zh").val();
		 var linktxt_en = $("#add_notify_linktext_en").val();
		 var linkurl = $("#add_notify_linkurl").val();
		 var inbox_zh = $("#add_notify_text_zh").val();
		 var inbox_en = $("#add_notify_text_en").val();
		 var apns_zh = $("#add_notify_apns_zh").val();
		 var apns_en = $("#add_notify_apns_en").val();
		 var filterId = $("#add_notify_dialog_filter").attr("user-filter-id");
		 var global = $("#add_notify_global").prop("checked");
		 var repeat = $("#add_notify_repeat").prop("checked");
		 if($.trim(filterId) == ""){
			 alert('必须设置筛选条件');
			 return;
		 }
		 var repeatTime = 0;
		 if (repeat){
		     repeatTime = 24 * 60 * 60 * 1000;
         }

		 if ((apns_en !== null && apns_en !== "") || (apns_zh !== null && apns_zh !== "") || (inbox_en !== null && inbox_en !== "") || (inbox_zh !== null && inbox_zh !== "")) {
             $.ajax({
                 type: "POST",
                 url: "/admin/i_tool_action/add_push_notification",
                 data: {
                     from: from,
                     ptime: ptime,
                     apns_zh: apns_zh,
                     apns_en: apns_en,
                     inbox_zh: inbox_zh,
                     inbox_en: inbox_en,
                     urllink: linkurl,
                     urltxt_zh: linktxt_zh,
                     urltxt_en: linktxt_en,
                     filterId: filterId,
                     global: global,
                     repeat:repeatTime
                 },
                 timeout: 180000,
                 dataType: "json",
                 processData: true,
                 success: function (msg) {
                     console.log(msg);
                     if (msg.code == 0) {
                         window.location.href = "/admin/i_tool_query/system_notification";
                     } else if (msg.code == -98) {
                         alert("参数错误");
                     } else {
                         alert(msg.msg);
                     }
                 }
             });
         }

        var video = $("#add_video_url").val();
        var cover = $("#add_video_cover").val();
        var tikiPrice = $("#add_video_tikiPrice").val();
        var videoMD5 = $("#add_video_md5").val();
        var videoApns = $("#add_video_apns").val();
        if (video !== ""){
            $.ajax({
                type:"POST",
                url:"/admin/i_oper_action/add_video_message",
                data: {
                    video:video,
                    cover:cover,
                    ptime:ptime,
                    sender:from,
                    videoMD5:videoMD5,
                    tikiPrice:tikiPrice,
                    content : videoApns,
                    filterId: filterId
                },
                timeout:180000,
                dataType:"json",
                processData:true,
                success: function(msg){
                    if(msg.code == 0){
                        window.location.href="/admin/i_oper_query/video_notify";
                    }else if(msg.code == -98){
                        alert("参数错误");
                    }else{
                        alert(msg.msg);
                    }
                }
            });
        }

	});
	
	$("a[data-action='delete_job']").on('click',function(){
		if(confirm("确认删除该推送？")){
            event.preventDefault();
            var id = $(this).attr('data-id');
            var params = "id=" + id;
            $.ajax({
                type:"GET",
                url:"/admin/i_tool_action/delete_system_notification",
                data: params,
                timeout:180000,
                dataType:"json",
                processData:true,
                success: function(msg){
                    if(msg.code == 0){
                        alert("删除成功");
                        window.location.href="/admin/i_tool_query/system_notification";
                    }else{
                        $("#del_vote_error_msg").text(msg.msg);
                    }
                }
            });
        }
	});

    $("a[id='edit_btn']").on('click',function(){
        event.preventDefault();
        $("#add_notify_dialog").css("display","block");
    });
    $("a[data-action='edit_job']").on('click',function(){
        var from = $("#add_notify_from").val();
        var tos = $("#add_notify_tos").val();
        var zoneType = $("#i18n_zone").val();
        var countries = "all";
        if($(document).find("#i18n_country_open:checked").val() != undefined){
            countries = getCountries();
        }
        var sex = $("#i18n_sex").val();
        var ptime = Date.parse($("#add_notify_pubtime").val());
        var linktxt_zh = $("#add_notify_linktext_zh").val();
        var linktxt_en = $("#add_notify_linktext_en").val();
        var linkurl = $("#add_notify_linkurl").val();
        var inbox_zh = $("#add_notify_text_zh").val();
        var inbox_en = $("#add_notify_text_en").val();
        var apns_zh = $("#add_notify_apns_zh").val();
        var apns_en = $("#add_notify_apns_en").val();

        $.ajax({
            type:"POST",
            url:"/admin/i_tool_action/update_system_notification",
            data: {
                from:from,
                ptime:ptime,
                to:tos,
                areas:countries,
                zoneType:zoneType,
                gender:sex,
                apns_zh:apns_zh,
                apns_en:apns_en,
                inbox_zh:inbox_zh,
                inbox_en:inbox_en,
                urllink:linkurl,
                urltxt_zh:linktxt_zh,
                urltxt_en:linktxt_en
            },
            timeout:180000,
            dataType:"json",
            processData:true,
            success: function(msg){
                if(msg.code == 0){
                    alert("更新成功");
                    location.reload();
                }else{
                    $("#update_vote_error_msg").text(msg.msg);
                }
            }
        });
    });
});