String.prototype.replaceAll = function(s1,s2){
   return this.replace(new RegExp(s1,"gm"),s2);
}

$(document).ready(function(){
	
	$(".ios-biu-version-edit").bind("click",function(event){
	    event.preventDefault();
	    $("#ios-biu-form input").removeAttr("readonly");
	    $("#ios-biu-form textarea").removeAttr("readonly");
//	    $("#ios-biu-download").attr("readonly","readonly");
	    $("#form-btn-ios-biu").css("display", "block");
//	    $("#upload-ipa-btn").show();
	});
	
	var uploadIpaBtn = $("#upload-ipa-btn");
	if(uploadIpaBtn){
		new AjaxUpload(uploadIpaBtn, {  
	    	 action: '/admin/i_app_action/upload_ipa',  
	         data: {
	        	 ipaname : "tiki.ipa"
	         },  
	         name: 'data',
	         timeout:120000,
	         onSubmit: function(file,ext) {
	            if(!(ext && /^(ipa)$/.test(ext))) {  
	                alert("您上传的应用包格式有误，请重新选择！");  
	                return false;  
	            }  
	         },
	         onComplete:function(file,resp) {  
	        	var obj = $.evalJSON(resp);
	            if(obj.code == 0){
	            	$("#ios-biu-download").val(obj.result);
	            }else{
	            	alert('上传失败:' + obj.msg);
	            }
	         }
		});	
	}
	
    $(".ios-biu-commit").bind("click",function(event){
	    event.preventDefault();
	    var iosversion = $("#ios-biu-version").val();
	    var iosdownload = $("#ios-biu-download").val();
	    var iosversiondesc = $("#ios-biu-versiondesc").val();
	    var iosforce = $("#ios-biu-force").val();

	    $.ajax({
	      cache: "false",
	      type: "POST",
	      url: "/admin/i_app_action/set_appinfo",
	      data: {
	    	  version : iosversion,
	    	  deviceType: 1,
	    	  downloadUrl : iosdownload,
	    	  desc : iosversiondesc,
	    	  force: iosforce
	      },
	      dataType: "json",
	      success: function(obj){
              if(obj.code == 0){
            	  $("#ios-biu-form input").attr("readonly","readonly");
                  $("#ios-biu-form textarea").attr("readonly","readonly");
                  $("#form-btn-ios-biu").css("display", "none");
                  $("#upload-ipa-btn").hide();  
              }else{
            	  alert("修改失败:"+obj.msg);
              }
	      },error: function(data){ 
	          alert( "修改失败：" + data.msg );
	      }
	   }); 
	});
	
	$(".android-version-edit").bind("click",function(event){
	    event.preventDefault();
	    $("#android-form input").removeAttr("readonly");
	    $("#android-form textarea").removeAttr("readonly");
	    $("#android-biu-download").attr("readonly","readonly");
	    $(".form-btn-android").css("display", "block");
	    $("#upload-apk-btn").show();
	});
	
	var uploadApkBtn = $("#upload-apk-btn");
	if(uploadApkBtn){
		new AjaxUpload(uploadApkBtn, {  
	    	 action: '/admin/i_app_action/upload_apk',  
	         data: {
	        	 apkname : "tiki.apk"
	         },  
	         name: 'data',
	         onSubmit: function(file,ext) {
	        	 if(!(ext && /^(apk)$/.test(ext))) {  
	                alert("您上传的应用包格式有误，请重新选择！");  
	                return false;  
	             }   
	         },
	         onComplete:function(file,resp) {  
	        	var obj = $.evalJSON(resp);
	            if(obj.code == 0){
	            	$("#android-biu-download").val(obj.result.pic);
	            	$("#android-biu-md5").val(obj.result.md5);
	            }else{
	            	alert('上传失败:' + obj.msg);
	            }
	         }
		});	
	}

	$(".android-commit").bind("click",function(event){
	    event.preventDefault();
	    var androidversion = $("#android-biu-version").val();
	    var androiddownload = $("#android-biu-download").val();
	    var androidversiondesc = $("#android-biu-versiondesc").val();
	    var androidforce = $("#android-biu-force").val();
	    var md5 = $("#android-biu-md5").val();
	    var silent = $("#android-biu-silent").val();
	    var dayTries = $("#android-biu-dayTries").val();
	    $.ajax({
	      cache: "false",
	      type: "POST",
	      url: "/admin/i_app_action/set_appinfo",
	      data: {
	    	  version : androidversion,
	    	  deviceType: 2,
	    	  downloadUrl : androiddownload,
	    	  desc : androidversiondesc,
	    	  force: androidforce,
	    	  dayTries:dayTries,
	    	  silent:silent,
	    	  md5:md5
	      },
	      dataType: "json",
	      success: function(obj){
              if(obj.code == 0){
            	  $("#android-form input").attr("readonly","readonly");
                  $("#android-form textarea").attr("readonly","readonly");
                  $(".form-btn-android").css("display", "none");
                  $("#upload-apk-btn").hide();
              }else{
            	  alert("修改失败:" + obj.msg);
              }
          },error: function(data){ 
              alert( "修改失败：" + data.msg );
          }
	    }); 
	});

	$(".cancel").bind("click",function(){
	    window.location.reload();
	});  
});