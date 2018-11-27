var myChart = [];
var option = [];

function drawMultiLines(ec,idname,index,seriasnames,url,params,title){
	 var xAxis = [];
	 var yAxis = [];
	 var series = []; 
     $(seriasnames).each(function(i,val){
    	xAxis.push({
            type: 'category',
            boundaryGap : false,
            data: []
        });
    	yAxis.push({
    	      type: 'value',
    	      splitArea: { show: true }
    	});
    	series.push({
    	     name: val,
    	     type: 'line',
    	     data: []
    	});
     });
	
	 myChart[index] = ec.init(document.getElementById(idname));
     myChart[index].showLoading({
         text: "图表数据正在努力加载..."
     });
	 option[index] = {
	        title: {
	            text: title
	        },
	        tooltip: {
	            trigger: 'axis'
	        },
	        toolbox: {
	            show: false
	        },
	        calculable: true,
	        xAxis: xAxis,
	        yAxis: yAxis,
	        series: series
	 };
	 $.ajax({
	        type: "POST",
	        async: "false", //同步执行
	        url: url,
	        data: params,
	        dataType: "json", //返回数据形式为json
	        success: function (result) {
	            if(result && result.result != undefined) {
	                //将返回的category和series对象赋值给options对象内的category和series
	                //因为xAxis是一个数组 这里需要是xAxis[i]的形式
	            	for (var i=0 ; i<result.result.length ;i++){
	            		option[index].xAxis[i].data = result.result[i].xaxis;
		                option[index].series[i].data = result.result[i].values;
	            	}
	            	myChart[index].hideLoading();
	                myChart[index].setOption(option[index]);
	            }
	        },error: function (errorMsg) {
	            //alert("不好意思，大爷，图表请求数据失败啦!");
	        }
	 });
}