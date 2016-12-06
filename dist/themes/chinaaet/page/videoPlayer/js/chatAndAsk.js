////老师对众发言模板
//<li class="tch">
//	<span class="time">d.time</span>
//	<b >d.name</b>
//	<a href="javascript:void(0);">d.texts</a>
//</li>
//
////学生对众发言模板
//<li class="stds">
//	<span class="time">09:45</span>
//	<b >红玫瑰:</b>
//	<a href="javascript:void(0);">老师讲的好好呀真让我大开眼界学到了好多知识呀</a>
//</li>
//
////管理员对众发言模板
//<li class="admin">
//	<span class="time">09:45</span>
//	<b >管理员:</b>
//	<a href="javascript:void(0);">本课程有很重要的知识点望同学们采纳。</a>
//</li>
//
////学生提问模板
//<li class="stdsAsk">
//	<i>提问</i>
//	<b>红玫瑰:</b>
//	<a href="javascript:void(0);">老师讲的好好呀真让我大开眼界学到了好多知识呀</a>
//</li>
//
////老师回答学生问题模板
//<li class="tchAns">
//	<i>回答</i>
//	<b>nickie老师:</b>
//	<a href="javascript:void(0);">老师讲的好好呀真让我大开眼界学到了好多知识呀</a>
//	<p>
//		<span>【问题】</span>
//		<b>红玫瑰:</b>
//		<a href="javascript:void(0);">同学们要认真观看此视频还要有考试的。</a>
//	</p>
//</li>
//
////问答展示区域模板
//{{#for (var i = 0; i < d.length; i++) {}}
//<li>
//	<div class="question">
//		<i class="iconfont">&#xe604;</i>
//		<h6>【提问】</h6>
//		<b>红玫瑰</b>
//		<a href="javascript:void(0);">老师ps里面的快捷键视频里为啥没找到，是没有这一节吗？</a>
//	</div>
//	<div class="answer">
//		<i class="iconfont">&#xe605;</i>
//		<h6>【最新回答】</h6>
//		<b>nickie老师</b>
//		<a href="javascript:void(0);">就在视频的结尾呢强调了一次可能你没看到。</a>
//		<span class="time">时间：4天前</span>
//	</div>
//</li>
//{{#}}}

//课程目录模板

//聊天室数据渲染方法
var tpl_tec = $('#tpl_tec').html();
//老师
var tpl_stds = $('#tpl_stds').html();
//学生
var tpl_admin = $('#tpl_admin').html();
//管理员
var tpl_tecAns = $('#tpl_tecAns').html();
//回答
var tpl_adminTo=$('#tpl_adminTo').html();
//管理员对谁说
var tpl_tecTo=$('#tpl_teachTo').html();
//老师对谁说
var tpl_studentTo=$('#tpl_studentTo').html();
//学生对谁说
var tpl_stdsAsk = $('#tpl_stdsAsk').html();
//提问
var tpl_tecAnsList = $('#tpl_tecAnsList').html();
//问答列表
//六个模板对象
var messageList = $('#messageList');
//聊天框载体
var teacherAnswerList = $('#teacherAnswerList');
//问答区域载体
//老师发言渲染方法
function tpl_tec(data) {
	laytpl(tpl_tec).render(data, function(html) {
		messageList.html(messageList.html() + html);
	});
}
//学生发言渲染方法
function tpl_stds(data) {
	laytpl(tpl_stds).render(data, function(html) {
		messageList.html(messageList.html() + html);
	});
}
//管理员发言渲染方法
function tpl_admin(data) {
	laytpl(tpl_admin).render(data, function(html) {
		messageList.html(messageList.html() + html);
	});
}
//老师回答渲染方法
function tpl_tecAns(data) {
	laytpl(tpl_tecAns).render(data, function(html) {
		messageList.html(messageList.html() + html);
	});
}
//学生对谁说渲染方法
function tpl_tecAns(data) {
	laytpl(tpl_tecAns).render(data, function(html) {
		messageList.html(messageList.html() + html);
	});
}
//老师对谁说渲染那方法
function tpl_tecTo(data) {
	laytpl(tpl_tecAns).render(data, function(html) {
		messageList.html(messageList.html() + html);
	});
}
//管理员对谁说渲染方法
function tpl_adminTo(data) {
	laytpl(tpl_tecAns).render(data, function(html) {
		messageList.html(messageList.html() + html);
	});
}
//学生提问渲染方法
function tpl_studentTo(data) {
	laytpl(tpl_stdsAsk).render(data, function(html) {
		messageList.html(messageList.html() + html);
	});
}
//问答区域渲染方法
function tpl_tecAnsList(data) {
	laytpl(tpl_tecAnsList).render(data, function(html) {
		teacherAnswerList.html(teacherAnswerList.html() + html);
	});
}


//渲染模板函数
function appendMessage(tpl, data, parent) {
	var parent = parent || messageList;
	var gettpl = tpl;
	laytpl(gettpl).render(data, function(htmls) {
		parent.html(parent.html() + htmls);
	});
}

//对所有人说
var callObject=$('#callObject');
//清除按钮
var closeCharest=$('#closeCharest');
//为清除按钮添加事件，清除对所有人说的innertext
closeCharest.on('click',function  () {
	callObject.val(null);
	callObject.attr('data-userId',null);
})
//给ul添加事件委托。点击时获取自带的自定义属性，放置于对所有人的发言中；
messageList.on('click','b',function  () {
	var name=$(this).attr('data_name');
	var userId=$(this).attr('data_userid');
	callObject.val(name);
	callObject.attr('data-userId',userId);
})

var ws = null;
//ws对象
var tick_heartpac = null; //心跳包
//websoket首次连接使用

var roomID = parseQueryString(window.location.href).courseId;
//获取房间号码
var userid = null;
var name = null;

function onLogin() {
	$.ajax({
		type: "GET",
		url: "http://zjzx.test.com/zh-CN/Chat/GetUserConfig",
		dataType: "jsonp",
		data: {
			//课程名
			room: roomID,
			time: new Date().getTime()
		},
		jsonp: "callback",
		success: function(data) {}
	});
}

function callback(json) {
	if (json.code == 1) {
		ChatUrl = json.result.websocketurl;
		OpenWs();
		//建立websocket
		userid = json.result.userid;
		name = json.result.name;
		//绑定方法
		submitMessage();
	}
}

//聊天栏自动滚动方法
var messageListOut = $('#messageListOut');
//聊天外窗口
var answerWindow = $('#answerWindow');
//回答问题外窗口
function scollToBottom() {
	var listHeight = messageList.height();
	var teacHeight = teacherAnswerList.height();
	if (listHeight > messageListOut.height()) {
		messageListOut.css('marginRight','-15px');
		messageListOut.scrollTop(listHeight - chatWindow.height());
	}
	if (teacHeight >answerWindow.height()) {
		answerWindow.scrollTop(teacHeight - answerWindow.height());
	}
}

//url解析函数
function parseQueryString(str) {
	var obj = {};
	/*var reg=/^(?:http:\/\/)(?:[\w.\/]+)\?((\w+=\w+)&?)+\.*$]/;*/
	/* var reg=/\w+:\/\/[\w.\/?]+\?(\w+=\w+&?)+/g;*/
	var reg = /\??(\w+)=(\w+)&?/g;
	var result;
	while ((result = reg.exec(str)) != null) {
		obj[result[1]] = result[2];
	}
	return obj;
}

//时间格式转换函数
function timeStyle(time) {
	time = new Date(time * 1000);
	time = time.toTimeString();
	time = time.substring(0, 5);
	return time;
}

//打开websockit链接
function OpenWs() {
	//重新连接时清除心跳计时器
	clearInterval(tick_heartpac);
	//url：ws链接地址
	var fullUrl = url;
	if ("WebSocket" in window) {
		ws = new WebSocket(fullUrl);
	} else if ("MozWebSocket" in window) {
		ws = new MozWebSocket(fullUrl);
	} else {
		layer.msg('您的浏览器不支持聊天功能，请更换浏览器后再次尝试');
	}

	ws.onopen = function() {
		layer.msg('聊天室功能开启');
	}
	ws.onclose = function() {
		layer.msg('聊天室关闭');
	}
	ws.onerror = function() {
		layer.msg('网络错误，请刷新');
	}
	ws.onmessage = function(msg) {
		//序列化json为字符串
		var obj = JSON.parse(msg.data);
		//解析出json中的数据
		var data = obj.data;
		for (var i = 0; i < data.length; i++) {
			//循环序列化
			data[i].content = JSON.parse(decodeURIComponent(data[i].content));
			data[i].from = JSON.parse(decodeURIComponent(data[i].from));
			data[i].to = JSON.parse(decodeURIComponent(data[i].to));
			data[i].time = timeStyle(data[i].timestamp);
		}
		switch (obj.code) {
			case -1:
				layer.msg(obj.msg);
				//弹出警告信息
				break;
			case -2:
				layer.msg('网络错误，正在重新登录');
				OpenWs();
				//重新连接一遍websoket;
				break;
			case -3:
				layer.msg('当前聊天室即将关闭');
				break;
			case 5:
				//渲染学生消息
				appendMessage(tpl_stds, data);
				break;
			case 6:
				//拉取历史学生发言消息，暂时不做处理
				break;
			case 7:
				//私信功能，暂时不做处理;
				break;
			case 8:
			var userId=data[0].from.userId;
				if (userId.indexOf('S')>-1) {
					appendMessage(tpl_adminTo, data);
				} else if(userId.indexOf('T')>-1){
					appendMessage(tpl_teachTo, data);
				}else{
					appendMessage(tpl_studentTo, data);
				}
				break;
			case 9:
				//历史私信
				break;
			case 10:
				//提问
				appendMessage(tpl_stdsAsk, data);
				break;
			case 11:
				//老师回复
				appendMessage(tpl_tecAns, data);
				//渲染问答列表区域
				appendMessage(tpl_tecAnsList, data, teacherAnswerList);
				break;
			case 12:
				//管理员发言
				appendMessage(tpl_admin, data);
				break;
			case 13:
				//预留
				break;
			case 14:
				//老师发言
				appendMessage(tpl_tec, data);
				break;
		}
	}
}

var yourMessage = $('#yourMessage');
//获取文本框中的数据
var submitChat = $('#submitChat');
//聊天按钮
var submitAsk = $('#sumbitAsk');
//提问按钮

submitAsk.on('mouseover',function(){
	layer.tips('请输入内容', '#sumbitAsk', {
			  tips: [1, '#3595CC'],
			  time: 1000
			});
})


submitChat.on('mouseover',function(){
	layer.tips('请输入内容', '#submitChat', {
			  tips: [1, '#3595CC'],
			  time: 1000
			});
})





submitMessage();
//后台提交数据
function submitMessage() {
	//	所要输入的数据
	var msg = null;
	//	输入框中没有数据的时候，直接返回，不执行以下函数
	submitChat.on('click', function() {
		msg=yourMessage.val();
		if (msg) {
			//判断是否发送私聊消息
			var charest=callObject.val();
			if (charest) {
				toSelf (msg);
			} else{
			stdsSub(msg);
			//学生发言
			}
		
			yourMessage.val('');
			//清空文本框
		} else {
			layer.tips('请输入内容', '#yourMessage', {
			  tips: [1, '#3595CC'],
			  time: 1000
			});
		}

	});
	submitAsk.on('click', function() {
		msg=yourMessage.val();
		if (msg) {
			stdsAsk(msg);
			//学生提问
			yourMessage.val('');
			//清空文本框
		} else {
			layer.tips('请输入内容', '#yourMessage', {
			  tips: [1, '#3595CC'],
			  time: 1000
			});
		}

	})

	//		if (type == 'A'/*此人为管理员时*/) {
	//			submitChat.on('click',function  () {
	//				adminSub();
	//              //执行管理员发言
	//              yourMessage.text('');
	//              //清空文本框
	//			})
	//		} else if (type == 'S'/*当此人为学生时*/) {
	//			submitChat.on('click',function  () {
	//				stdsSub();
	//              //学生发言
	//              yourMessage.text('');
	//              //清空文本框
	//			})
	//			submitAsk.on('click',function  () {
	//				stdsAsk();
	//              //学生提问
	//              yourMessage.text('');
	//              //清空文本框
	//			})
	//		} else {
	//           submitChat.on('click',function  () {
	//				tecAns();
	//              //老师回答
	//              yourMessage.text('');
	//              //清空文本框
	//			})
	//			submitAsk.on('click',function  () {
	//				tecSub ();
	//              //老师发言
	//              yourMessage.text('');
	//              //清空文本框
	//			})
	//		}

}
//对谁说
function toSelf (msg) {
	var toId=callObject.attr("data-userId");
	var datas = {
		act: "TOPERSONALSHOW",
		room: roomID,
		from: {
			userid: userid,
			name: name,
		},
		touser:toId,
		content: {
			msg: msg,
		}
	}
	datas.from = encodeURIComponent(JSON.stringify(datas.from));
	datas.content = encodeURIComponent(JSON.stringify(datas.content));
	//数据编码
	ws.send(JSON.stringify(datas));
	callObject.val(null);
	callObject.attr('data-userId',null);
}



//管理员发言
function adminSub() {
	var datas = {
		act: "TOONLINE",
		room: roomID,
		from: {
			userid: userid,
			name: name,
		},
		content: {
			msg: msg,

		}
	}
	datas.from = encodeURIComponent(JSON.stringify(datas.from));
	datas.content = encodeURIComponent(JSON.stringify(datas.content));
	//数据编码
	ws.send(JSON.stringify(datas));
}
//学生发言
function stdsSub(msg) {
	var datas = {
		act: "TOALL",
		room: roomID,
		from: {
			userid: userid,
			name: name,
		},
		content: {
			msg: msg,
		}
	}
	datas.from = encodeURIComponent(JSON.stringify(datas.from));
	datas.content = encodeURIComponent(JSON.stringify(datas.content));
	//数据编码
	ws.send(JSON.stringify(datas));
}
//学生提问
function stdsAsk() {
	var datas = {
		act: "PUTPROBLEM",
		room: roomID,
		from: {
			userid: "1213",
			name: "李四",
		},
		content: {
			question: msg,

		}
	}
	datas.from = encodeURIComponent(JSON.stringify(datas.from));
	datas.content = encodeURIComponent(JSON.stringify(datas.content));
	//数据编码
	ws.send(JSON.stringify(datas));
}
//老师回答
function tecAns() {
	var datas = {
		act: "ANSWER",
		room: roomID,
		from: {
			userid: "1213",
			name: "李四",
		},
		to:{
			userid: "1213",
			name: "李四",
		},
		content: {
			question: quest,
			answer: msg,
		}
	}
	datas.from = encodeURIComponent(JSON.stringify(datas.from));
	datas.content = encodeURIComponent(JSON.stringify(datas.content));
	//数据编码
	ws.send(JSON.stringify(datas));
}
//老师发言
function tecSub() {
	var datas = {
		act: "TEACHERTOALL",
		room: roomID, //房间号
		from: {
			userid: "1213",
			name: "李四",
		},
		content: {
			msg: msg,
		}
	}
	datas.from = encodeURIComponent(JSON.stringify(datas.from));
	datas.content = encodeURIComponent(JSON.stringify(datas.content));
	//数据编码
	ws.send(JSON.stringify(datas));
}