$(document).ready(function() {
	//引入头文件和尾部文件
	$('#header').load('../../widget/header/header.html');
	$('#footer').load('../../widget/footer/footer.html');
	//渲染模板		
	$("#traningsList").JsRenderData({
		sourceUrl: 'http://127.0.0.1:8080/themes/chinaaet/page/training/traning.json',
		isPage: true,
		pageSize: 5,
		pageIndex: 1,
		templateID: "courseListTemplate",
		funCallback: function(data) {}
	});
	//字符串转对象方法
	function getObj(data) {
		var arrys = data.split(',');
		var obj = {};
		for (var i = 0; i < arrys.length; i++) {
			var arr = arrys[i].split(':');
			obj[arr[0]] = arr[1];
		}
		return obj;
	}
	$("#traningsList").on('click', '.courseInformation', function() {
		var data = $(this).attr('data-others');
		console.log(getObj(data));
	})

})