
//返回视屏高度函数
//function videoHeight() {
//	//播放器父元素宽度
//	var outwidth = $('#videoOut').width();
//	//播放器高度
//	var height=myPlayer.height();
//	//设置播放器宽度
//	myPlayer.width(outwidth);
//	if (outwidth < (truthWidth+30)) {
//		myPlayer.height(truthWidth/ myPlayer.getProportion);
//	} 
//}

function resizeVideo () {
	//获取视屏宽高比函数
//	myPlayer.getProportion=(16/9);
	//浏览器宽度
	var windowWidth = $(window).width();
	//计算视屏播放区域的宽度
	if (windowWidth > 1000) {
		if (parseInt(rightList.css("right")) == 0) {
			//右侧显示层处于显示状态，右侧显示层宽度为340
			var videoWidth = windowWidth - 340;
			$('#videoOut').width(videoWidth);
		} else {
			var videoWidth = windowWidth;
			$('#videoOut').width(windowWidth);
		}
//		videoHeight();
	}
}
//监听浏览器窗口改变事件,重置视屏播放高度
$(window).resize(function() {
	resizeVideo ();
})

var rightList = $('#rightList');
//右侧选项栏
var videoOut = $('.videoOut');
//视屏播放区域

//定义右侧列表滑动函数
function toggleRightList(width) {
	rightList.css('right', width);

}

//定义视屏播放减少宽度
function toggleVideoOut(width,callback) {
	var oldVideoWidth = videoOut.width();
	var newVideoWidth = oldVideoWidth - width;
	videoOut.css('width',newVideoWidth);
//	videoOut.animate({
//		width: newVideoWidth + "px"
//	},10, function() {
//		
//	});
	resizeVideo ();  
	callback;
}
//定义右侧列表滑动函数

var alertIndex = $('#alertIndex');
//目录
var alertChat = $('#alertChat');
//聊天
var alertQuestionnaire = $('#alertQuestionnaire');
//问卷
var index = $('.indexAndChat .index');
//课程目录
var chat = $('.indexAndChat .chat');
//聊天室

function zindex(domA, domB) {
	domA.css('z-index', 2);
	domB.css('z-index', 1);
}
//   显示优先级切换
function changeClass(domA, domB, classN) {
	domA.addClass(classN);
	domB.removeClass(classN);
}


//  目录点击切换事件
alertIndex.on('click', function() {
	if (alertChat.hasClass('redBackground')) {
		changeClass(alertIndex, alertChat, 'redBackground');
		zindex(index, chat);
	} else {
		if (parseInt(rightList.css('right')) < 0) {
			toggleVideoOut(340,toggleRightList(0));
			zindex(index, chat);
		} else {
			toggleVideoOut(-340,toggleRightList(-340));
		}
		$(this).toggleClass('redBackground');
	}
})

//聊天室前几切换事件
alertChat.on('click', function() {
	if (alertIndex.hasClass('redBackground')) {
		changeClass(alertChat, alertIndex, 'redBackground');
		zindex(chat, index);
	} else {
		if (parseInt(rightList.css('right')) < 0) {
			toggleVideoOut(340,toggleRightList(0));
			zindex(chat, index);
		} else {
			toggleVideoOut(-340,toggleRightList(-340));
		}
		$(this).toggleClass('redBackground');
	}
})




//聊天窗口
var chatWindow = $('#chatWindow');
//切换聊天窗口按钮
var chatButton = $('#chatbutton')
	//问答窗口
var answerWindow = $('#answerWindow');
//切换问答窗口按钮
var answerButton = $('#answerbutton');

//	自定义方法,用于切换样式和显示
function chatAndAnswer(buttons, contens, classNames) {
	for (var i = 0; i < buttons.length; i++) {
		(function(i) {
			buttons[i].on('click', function() {
				$(this).addClass(classNames);
				contens[i].show();
				for (var j = 0; j < buttons.length; j++) {
					if (i != j) {
						buttons[j].removeClass(classNames);
						contens[j].hide();
					}
				}
			})
		}(i))
	}
}
//定义聊天窗口和老师问答窗口的切换效果
chatAndAnswer([chatButton, answerButton], [chatWindow, answerWindow], 'clickStyle_bule');

//弹出问卷调查,iframe层，需要将用户id和课程名称传输过去
alertQuestionnaire.on('click', function() {
		layer.open({
			title:'问卷调查',
			type: 2,
			area: ['700px', '550px'],
			fix: false, //不固定
			maxmin: true,
			content: 'http://zjzx.test.com/zh-CN/chinaaet/Questionnaire/IndexResult?cId=468&sId=1'
		});
	})
	//传输课程和用户的id；
function ajaxQuestionnaire() {
	var userId = userId || '';
	var courseId = courseId || '';
	$.ajax({
		type: "post",
		url: "",
		async: true,
		data: {
			userid: '',
			courseId: ''
		},
		dataType: json,
		success: function(data) {
			console.log("nice");
		},
		error: function(data) {
			console.log("sorry");
		}
	});

}

//弹出考试层
var alertExam = $('#alertExam');
//获取考试数据方法
function ShowExam() {
	var url = 'http://yanshi.zjzx.cn/zh-CN/Student/Learn/GetShowExam?id=99&userWareId=163';
	$.getJSON(url, function(data) {
		if (data.examId == 0) {
			layer.msg('该课程不设考试');
		} else {
			$("#examTitle").html(data.dataList.examTitle.length > 4 ? data.dataList.examTitle.substring(0, 4) + "..." : data.dataList.examTitle);
			$("#examTitle").attr("title", data.dataList.examTitle);
			$("#examlength").html(data.dataList.examlength);
			$("#canExamTimes").html(data.dataList.canExamTimes);
			$("#examUserId").val(data.dataList.examUserId);
			$("#examId").val(data.dataList.id);
			$("#statuStr").html(data.dataList.statuStr);
			layer.open({
				type: 1,
				title: '在线考试',
				closeBtn: 1,
				area: ['700px', '200px'],
				shadeClose: true,
				content: $('#examLayer'),
			});
		}
	});
}
//绑定弹出事件
alertExam.on('click', function() {
	ShowExam();
})

///进入考试
function gotoExam() {
	if ($("#examUserId").val() == "0") {
		CreateExam();
	} else {
		GoIntoExam();
	}
}

var waitDialog;
///没有考试信息，生成信息
function CreateExam() {
	var index = layer.load();
	//加载中
	$.getJSON('http://yanshi.zjzx.cn/zh-CN/Student/Learn/CreateQuestionByExamId?id=' + $("#examId").val() + "&userWareId=163", function(data) {
		//关闭加载层
		layer.close(index);
		// debugger;
		if (data.error == 0) {
			$("#examUserId").val(data.examUserId);
			GoIntoExam();
		} else {
			layer.msg(data.errorMessge);
		}
	});

}

//进去考试
function GoIntoExam() {
	$.getJSON('http://yanshi.zjzx.cn/zh-CN/Exam/ExamTest/JudgeCanExamTest?euID=' + $("#examUserId").val() + '&flag=0', function(data) {
		if (data.result == 1) {
			readyExamUrl(0, 'http://yanshi.zjzx.cn/zh-CN/Exam/ExamTest/ExamTestOnline?euID=' + $("#examUserId").val() + "&passType=1&courseId=107&recordId=76", "", "",
				function() {
					ShowExam();
				});
		} else {
			layer.msg(data.message);
		}
	});
}

///试卷详情
function browseDetail() {
	if ($("#examUserId").val() == "0") {
		layer.msg("未找到答卷详情！");
	} else {
		var url = 'http://yanshi.zjzx.cn/zh-CN/Exam/ExamTest/ExamTestDetail?euID=' + $("#examUserId").val();
		window.open(url);
	}

}



