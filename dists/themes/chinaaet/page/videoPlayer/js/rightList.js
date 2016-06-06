
	//监听浏览器窗口改变事件,重置视屏播放高度
	$(window).resize(function() {
		var windowWidth = $(window).width();
		if ( parseInt( rightList.css("right")) == 0) {
			//右侧显示层处于显示状态，右侧显示层宽度为340
			var videoWidth = windowWidth - 340;
			$('.videoOut').width(videoWidth);
		} else {
			var videoWidth = windowWidth;
			$('.videoOut').width(windowWidth);
		}
		//计算视屏播放区域的宽度
		if (videoWidth > 900) {
			myPlayer.height(videoHeight());
		}
	})

	var rightList = $('#rightList');
	//右侧选项栏
	var videoOut = $('#videoOut');
	//视屏播放区域

	//定义右侧列表滑动函数
	function toggleRightList(width) {
		rightList.animate({
			right: width + "px"
		}, 150);
	}

	//定义视屏播放减少宽度
	function toggleVideoOut(width) {
		var oldVideoWidth = videoOut.width();
		var newVideoWidth = oldVideoWidth - width;
		videoOut.animate({
			width: newVideoWidth + "px"
		}, 150, function() {
			myPlayer.height(videoHeight());
		});
	}
	//定义右侧列表滑动函数

	var alertIndex = $('#alertIndex');
	//目录
	var alertChat = $('#alertChat');
	//聊天
	var alertNote = $('#alertNote');
	//笔记
	var alertAsk = $('#alertAsk');
	//提问
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
	//   不同元素的class切换

	//  目录点击切换事件
	alertIndex.on('click', function() {
		if (alertChat.hasClass('redBackground')) {
			changeClass(alertIndex, alertChat, 'redBackground');
			zindex(index, chat);
		} else {
			if (parseInt(rightList.css('right')) < 0) {
				toggleVideoOut(340);
				toggleRightList(0);
				zindex(index, chat);
			} else {
				toggleVideoOut(-340);
				toggleRightList(-340);
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
				toggleVideoOut(340);
				toggleRightList(0);
				zindex(chat, index);
			} else {
				toggleVideoOut(-340);
				toggleRightList(-340);
			}
			$(this).toggleClass('redBackground');
		}
	})
	
	//聊天窗口
	var chatWindow=$('#chatWindow');
	//切换聊天窗口按钮
	var chatButton=$('#chatbutton')
    //问答窗口
	var answerWindow=$('#answerWindow');
	//切换问答窗口按钮
	var answerButton=$('#answerbutton');
	
//	自定义方法,用于切换样式和显示
	function chatAndAnswer ( buttons,contens,classNames ) {
		for (var i=0 ;i<buttons.length;i++) {
			(function  (i) {
				buttons[i].on('click',function  () {
					$(this).addClass(classNames);
					contens[i].show();
					for (var j=0;j<buttons.length;j++) {
						if (i!=j) {
							buttons[j].removeClass(classNames);
						    contens[j].hide();
						}
					}
				})
			}(i))
		}
	}
	//定义聊天窗口和老师问答窗口的切换效果
	chatAndAnswer([chatButton,answerButton],[chatWindow,answerWindow],'clickStyle_bule');
	
	
	

	//弹出提交笔记层
	alertNote.on('click', function() {
		layer.open({
			type: 1,
			content: $('#noteLayer'),
			title: false,
			closeBtn: 0,
			skin: 'layui-layer-rim',
			area: ['650px', '280px']
		})
	})

	//关闭笔记层
	$('#closeNote').on('click', function() {
		layer.closeAll();
	})

	//弹出提问层
	alertAsk.on('click', function() {
		layer.open({
			type: 1,
			content: $('#askLayer'),
			title: false,
			closeBtn: 0,
			skin: 'layui-layer-rim',
			area: ['650px', '450px']
		})
	})

	//关闭提问层
	$('#closeAsk').on('click', function() {
		layer.closeAll();
	})
	
	//弹出问卷调查,iframe层，需要将用户id和课程名称传输过去
	alertQuestionnaire.on('click',function  () {
		layer.open({
        type: 2,
        area: ['700px', '530px'],
        fix: false, //不固定
        maxmin: true,
        content: 'http://zjzx.test.com/zh-CN/chinaaet/Questionnaire/IndexResult?cId=468&sId=1'
         });
	})
	function ajaxQuestionnaire () {
		var userId=userId||'';
		var courseId=courseId||'';
		$.ajax({
			type:"post",
			url:"",
			async:true,
			data:{
				userid:'',
				courseId:''
			},
			dataType:json,
			success:function  (data) {
				console.log("nice");
			},
			error:function  (data) {
				console.log("sorry");
			}
		});
		
	}
	
	
	

