
	var data = [{
	"Id": 1,
	"CourseId": 192,
	//题干
	"Title": " 这个课程的证书国家认可吗？",
	//问题
	"Problem": "<p>老师，这个课程的证书国家认可吗？</p>",
	//回复人id
	"Replyer": 4,
	//回复的内容
	"Reply": "你好，你这个证书是国家工信部认可的证书",
	"ParentId": 0,
	//是否有回复
	"IsReply": true,
    //提问创建时间
	"CreateTimeStr": "2016-07-23 13:42",
    //问题回复时间
	"UpdateStr": "2016-07-23 13:45",
	//用户姓名
	"UserName": "huangjiaojiao_123",
	//用户头像
	"UserPhoto": "http://avaimg.chinaaet.com/user/images/head/head_aet.png",
	//老师名字
	"TeacherName": "钱大大",
	//老师头像
	"TeacherPhoto": "~/UploadFiles/UserPhoto/UserPhoto/2c6ec5f5-b2a6-4373-8636-adea3d32670a.jpg",
	//回复数量
	"Count": "2"
}, {
	"Id": 7,
	"CourseId": 192,
	"Title": "",
	"Problem": "我追问一下证书认可的问题啊，证书哪个单位认可的啊",
	"Replyer": 4,
	"Reply": "工信部认可的证书啊",
	"ParentId": 1,
	"IsReply": true,
	"CreateTimeStr": "2016-07-23 17:05",
	"UpdateStr": "2016-07-23 17:06",
	"UserName": "huangjiaojiao_123",
	"UserPhoto": "http://avaimg.chinaaet.com/user/images/head/head_aet.png",
	"TeacherName": "钱大大",
	"TeacherPhoto": "~/UploadFiles/UserPhoto/UserPhoto/2c6ec5f5-b2a6-4373-8636-adea3d32670a.jpg",
	"Count": "1"
}];



//渲染模板，左侧主体部分
var qstTpls=document.getElementById("qstTpl").innerHTML;
//渲染左侧主体
laytpl(qstTpls).render(data, function(html){
    document.getElementById('leftList').innerHTML = html;
});






