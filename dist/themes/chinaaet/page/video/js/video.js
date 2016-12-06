//模板列表
var tpl_tec = $('#tpl_tec').html();
//老师
var tpl_stds = $('#tpl_stds').html();
//学生
var tpl_admin = $('#tpl_admin').html();
//管理员
var tpl_tecAns = $('#tpl_tecAns').html();
//回答
var tpl_stdsAsk = $('#tpl_stdsAsk').html();
//提问

var messageList = $('#messageList');
//聊天框载体



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
//学生提问渲染方法
function tpl_stdsAsk(data) {
	laytpl(tpl_stdsAsk).render(data, function(html) {
		messageList.html(messageList.html() + html);
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

//ws对象
var ws = null;
//websoket首次连接使用
var tick_heartpac = null; //心跳包
//获取房间号码
var roomID = parseQueryString(window.location.href).courseId;
//定义用户id
var userid = null;
//定义用户名
var name = null;


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


function onLogin() {
	$.ajax({
		type: "GET",
		url: "http://zjzx.test.com/zh-CN/Chat/GetUserConfig",
		dataType: "jsonp",
		data: {
			//课程名
			room: room,
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
		//绑定方法,发送消息
		submitMessage();
	    //禁言功能
		submitAsk.on('click', function() {
			
			adminStp(userName,userId)
			//管理员发言
			callObject.val('');
			//清空人员显示框
			submitAsk.off('click');
			//清除绑定函数，再次点击人员名单时才可再次激活
		})
		//关闭聊天室窗口函数
		closeChat.on('click',function  () {
			closeChatRoom ()
		})
		
	}
}

//聊天外窗口
var chatWindow = $('#chatWindow');

//聊天栏自动滚动方法
function scollToBottom() {
	var listHeight = messageList.height();
	if (listHeight > 635) {
		chatWindow.scrollTop(listHeight - chatWindow.height());
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

//打开websockit链
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
	//发送定时心条包
	tick_heartpac = setInterval(function() {
		ws.send(JSON.stringify({
			act: "heart",
			"room": "001"
		}));
	}, 120000);
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
			data[i].time = timeStyle(data[i].time);
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
				//私信(公聊区着重显示)
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
				//				appendMessage(tpl_tecAnsList, data, teacherAnswerList);
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
//获取文本框中的数据
var yourMessage = $('#yourMessage');
//聊天按钮
var submitChat = $('#submitChat');
//禁言按钮
var submitAsk = $('#sumbitAsk');
//关闭聊天室
var closeChat=$('#closeChat');
//用户名显示区域
var callObject=$('#callObject');
//清除按钮
var clearcbj=$('#callObject:after');


//后台提交数据
function submitMessage() {
	//	所要输入的数据
	var msg = null;
	//	输入框中没有数据的时候，直接返回，不执行以下函数
	submitChat.on('click', function() {
		msg = yourMessage.val();
		if (msg) {
			stdsSub(msg);
			//学生发言
			yourMessage.val('');
			//清空文本框
		} else {
			layer.tips('请输入内容', '#yourMessage', {
				tips: [1, '#3595CC'],
				time: 1000
			});
		}
	});
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
//管理员禁言
function adminStp (to_name,to_userId) {
	var datas={
		act: "NOSPEAK",
		room: roomID,
		from: {
			userid: userid,
			name: name,
		},
		to:{
			userid: to_name,
			name: to_userId,
		}
	}
}
//管理员关闭聊天室功能
function closeChatRoom () {
	var datas={
		act: "CLOSEROOM",
		room: roomID,
		from: {
			userid: userid,
			name: name,
		}
	}
}