//定义一个真实视屏宽度
var truthWidth=null;
//	视屏总时长
var videoAllTime = $('.videoState .allTime>a');
//	已经学习时长
var videoStudyTime = $('.videoState .studyTime>a');
//  视屏播放状态
var videoStudyState = $('.videoState .studyState>a');
//	视屏播放状态图标
var videoStudyIcon = $('.videoState .studyState>span');


$("#videoOut").on("resize",function  () {
	console.log(1);
})

//	时间处理函数
function getTimeStyle(time) {
	//获取分钟数
	time = parseInt(time/60);
	return (time+'分钟');
}

var videoPlayer = $('#videoPlayer');
//获取视屏播放器外层dom
var myPlayer;
//定义播放器对象
var watchTime=0;
var setT=null;
var times=null;
var a=0;
//为适应不同分辨率的桌面做的视屏初始化，以1920屏幕未初始化标准
(function  () {
	//定义比例
	var proportion=(1903/800);
	var outHeight=$(window).width()/proportion;
	$('.video').height(outHeight);
	//给一个预设值宽度设值；
	truthWidth=outHeight*(16/9);
}());


	var flashvars={
			f:'/themes/chinaaet/static/lib/ckplayer/ckplayer/m3u8.swf',
			a:'http://videoqiniu.zjzx.cn/6dde0dcd-4f24-4e8b-8260-b36148758af0.m3u8',
			s:4,
			//自动播放
			p:0,
//			deft:'标清,高清,超清',//配置文件里有，则不需要再设置
	        defa:'http://videoqiniu.zjzx.cn/6dde0dcd-4f24-4e8b-8260-b36148758af0.m3u8|http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8|http://videoqiniu.zjzx.cn/6dde0dcd-4f24-4e8b-8260-b36148758af0.m3u8',
			c:0,
			loaded:'loadHandler'
	};
	var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
	
	var video=['http://videoqiniu.zjzx.cn/6dde0dcd-4f24-4e8b-8260-b36148758af0.m3u8'];
	//初始化播放器
	CKobject.embed('/themes/chinaaet/static/lib/ckplayer/ckplayer/ckplayer.swf','ckplayer','ckplayer_video_sg','100%','100%',false,flashvars,video,params);	
    
    function videojump () {
//	   myPlayer.videoSeek(900);
    }
    
     function loadHandler(){		
			console.log("loadHandler");
			myPlayer=CKobject.getObjectById('ckplayer_video_sg');
			myPlayer.addListener('play','playstartHandler');
			myPlayer.addListener('paused','pausedHandler');
	    };
	    
		function playstartHandler(){
			a++;
			if (a==1) {
				setT=setInterval(setFunction,1000);
			    changeStudyDate('&#xe608', '学习中');
				//启用定时器
				times = setInterval(function() {
					console.log(2);
					//获取当前的播放进度并且使用四舍五入法磨平函数执行的时间差
					if (myPlayer.getStatus().time) {
						videoStudyTime.html(getTimeStyle(Math.round(myPlayer.getStatus().time)));
					} else {
						clearInterval(times);
						videoStudyTime.html('0分钟');
					};
			}, 1000);
			    videojump ();
				videojump=function  () {
					
				};
			}
		};
		
		function pausedHandler(b){
			if (b) {
			a=0;
				//清除定时器
		    clearInterval(setT);
			clearInterval(times);
			//更改学习状态
			changeStudyDate('&#xe60c', '播放');
			}
		};
		  function setFunction(){
//		  	console.log(watchTime);
		    watchTime+=1;
		    if(watchTime>=10){
		    	//savelearn
		    	watchTime=0;
		    }
		  };
		function changeStudyDate(icons, states) {
		videoStudyState.html(states);
		videoStudyIcon.html(icons);
	};
	
	videoStudyState.on('click', function() {
		if ($(this).html() == '播放') {
			CKobject.getObjectById('ckplayer_video_sg').videoPlay();
		} else{
			CKobject.getObjectById('ckplayer_video_sg').videoPause();
		}
	});
//执行一次函数


