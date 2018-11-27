
$(function(){
    $('.form_datetime').value = new Date();
    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        pickerPosition: "bottom-right"
    });

    $('.scalechosen button').on("click", function(){
        $('.scalechosen .active').removeClass('active');
        $(this).addClass('active');
        var temp = $(this).attr('data-rel');
        timechosen(temp);
    });

    $('.timer').on("click", function(e){
        e.preventDefault();
        var temp = $('.form_datetime');
        if((temp[0].value == null) || (temp[0].value == null)){
            alert("请先选择时间区间！");
        }

        if(temp[0].value >= temp[1].value){
            alert("结束时间必须大于开始时间！");
        } else {
            startTime = Date.parse(temp[0].value);
            endTime = Date.parse(temp[1].value);
            refreshAll();
        }
    });
});