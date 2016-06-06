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
var tpl_stds = $('#tpl_stds').html();
var tpl_admin = $('#tpl_admin').html();
var tpl_tecAns = $('#tpl_tecAns').html();
var tpl_stdsAsk = $('#tpl_stdsAsk').html();
var tpl_tecAnsList = $('#tpl_tecAnsList').html();
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
//学生提问渲染方法
function tpl_stdsAsk(data) {
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

var ws = null;
//ws对象
var tick_heartpac = null; //心跳包
function onLogin() {
	$.ajax({
		type: "GET",
		url: "http://zjzx.test.com/zh-CN/Chat/GetUserConfig",
		dataType: "jsonp",
		data: {
			room: $("#room").val(),
			time: new Date()
		},
		jsonp: "callback",
		success: function(data) {
			alert(1);
		}
	});
}

//打开websockit链接
function OpenWs() {
	var fullUrl = url;
	if ("WebSocket" in window) {
		ws = new WebSocket(fullUrl);
	} else if ("MozWebSocket" in window) {
		ws = new MozWebSocket(fullUrl);
	} else {
		layer.msg('您的浏览器不支持聊天功能，请更换浏览器后再次尝试');
	}

	ws.onopen = function() {
		changeElementEnabled(true);
	}
	ws.onclose = function() {
		document.getElementById("message_output").innerHTML += "与服务器断开连接" + "<br/>";
		changeElementEnabled(false);
		clearInterval(tick_heartpac);
	}

	ws.onerror = function() {
		layer.msg('网络错误，请稍后再试');
	}
	ws.onmessage = function(msg) {
		//序列化json为字符串
		var obj = JSON.parse(msg.data);
        //解析出json中的数据
		var data=obj.data;
		for (var i=0;i<data.length;i++) {
//			循环序列化
			data[i].content= JSON.parse(decodeURIComponent(data[i].content));   
		}
		switch(obj.code)
		{
			case: -1:
			 
			break;
			case: -2:
			
			break;
			case: -3:
			
			break;
			case: 5:
			
			break;
			case: 6:
			
			break;
			case: 7:
			
			break;
			case: 8:
			
			break;
			case: 9:
			
			break;
			case: 10:
			
			break;
			case: 11:
			
			break;
			case: 12:
			
			break;
			case: 13:
			
			break;
			case: 14:
			
			break;
		}
	}
}
//{
//  "code": 5,  //响应编码
//  "timestamp": "20160526140115", //响应时间(时间戳)
//	"msg":"提示内容",   //提示内容
//  "data": [
//      {
//          "content":{  //信息内容(需解码)
//              "msg": "消息内容",
//              "answer"
//              
//          },
//          "from": {  //发送人个人信息(需解码)
//              "userid": "1213",
//              "name": "李四",
//              "pic": "http: //sjdkfj.skdjf.png"
//          },
//          "to": {  //接收人个人信息(需解码)
//              "userid": "1213",
//              "name": "张三",
//              "pic": "http: //sjdkfsdfasdff.png"
//          },
//          "timestamp": "20160526140115"//消息时间(时间戳)
//      }
//  ]
//}