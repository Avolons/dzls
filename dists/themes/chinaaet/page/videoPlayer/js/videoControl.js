//	视屏初始化
$('.video').height($(window).width() / (1903 / 800));

//	视屏总时长
var videoAllTime = $('.videoState .allTime>a');
//	已经学习时长
var videoStudyTime = $('.videoState .studyTime>a');
//  视屏播放状态
var videoStudyState = $('.videoState .studyState>a');
//	视屏播放状态图标
var videoStudyIcon = $('.videoState .studyState>span');

//	时间处理函数
function getTimeStyle(time) {
	//获取分钟数
	time = parseInt(time/60);
	return (time+'分钟');
}

var videoPlayer = $('#videoPlayer');
//获取视屏播放器外层dom
var myPlayer = null;
//定义播放器对象

function videoDom(url, img) {
	var framDom = '<video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto"  poster=' + img + ' ata-setup="{}" ><source src=' + url + ' type="video/mp4"></source></video>'
	myPlayer.dispose();
	//重新加载myPlayer对象
	videoPlayer.html(framDom);
	//重新加载dom;
	videoInitialization();
}

function videoInitialization() {
	//初始化播放器
	myPlayer = videojs('my-video');
	//初始化视屏高度
	//播放器底部状态栏根据是否显示为播放来切换视屏播放或者是停止
	myPlayer.ready(function() {
			//给视屏设置高度,充满父元素
			myPlayer.height($('.videoPlayer').height());

			myPlayer.showStudyTime(myPlayer);
			//状态栏切换
			videoStudyState.on('click', function() {
				$(this).html() == '播放' ? myPlayer.play() : myPlayer.pause();
			});
			
		})
	

	//更改学习时间显示
	myPlayer.showStudyTime = function(myPlayer) {
		//定义一个定时更新学习时间的函数，每隔1s更新一次
		var times;
		myPlayer.on('play', function() {
			//更改学习状态
			changeStudyDate('&#xe608', '学习中');
			//启用定时器
			times = setInterval(function() {
				//获取当前的播放进度并且使用四舍五入法磨平函数执行的时间差
				if (myPlayer.currentTime()) {
					videoStudyTime.html(getTimeStyle(Math.round(myPlayer.currentTime()))+2);
				} else {
					clearInterval(times);
					videoStudyTime.html('0分钟');
				}
			}, 1000);
		})
		myPlayer.on('pause', function() {
			//清除定时器
			clearInterval(times);
			//更改学习状态
			changeStudyDate('&#xe60c', '播放')
		})
	}

	//学习状态更改函数
	function changeStudyDate(icons, states) {
		videoStudyState.html(states);
		videoStudyIcon.html(icons);
	}
}
videoInitialization();
//执行一次函数