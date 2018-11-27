//show.bs.modal	show 方法调用之后立即触发该事件。如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 relatedTarget 属性进行访问。
//shown.bs.modal	此事件在模态框已经显示出来（并且同时在 CSS 过渡效果完成）之后被触发。如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 relatedTarget 属性进行访问。
//hide.bs.modal	hide 方法调用之后立即触发该事件。
//hidden.bs.modal	此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。
//loaded.bs.modal	从远端的数据源加载完数据之后触发该事件。
//$('#myModal').on('hidden.bs.modal', function (e) {
//  // do something...
//})

$(document).ready(function(){
	
	$("a[data-action='modal-close']").click(function(){
		event.preventDefault();
		$(this).parent().parent().parent().css('display',"none");
	});
	
	$("a[data-action='dialog']").on('click',function(){
		event.preventDefault();
		$("#" + $(this).attr('data-id')).css('display','block');
		var funcstr = $(this).attr('data-func');
		if(funcstr){
			new Function(funcstr+"()")($(this));
		}
	});
	
	$("button[data-action='dialog']").on('click',function(){
		event.preventDefault();
		$("#" + $(this).attr('data-id')).css('display','block');
		var funcstr = $(this).attr('data-func');
		if(funcstr){
			new Function(funcstr+"()")($(this));
		}
	});
});