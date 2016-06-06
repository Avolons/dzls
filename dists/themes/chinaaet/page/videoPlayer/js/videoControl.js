
//	视屏初始化
	
	//截取页面url属性值，进行ajax请求
	function splitUrl (urls) {
		var videoId=urls.split('=')[1];
		$.ajax({
			type:"get",
			url:"",
			data:{
				videoId:'',
				userId:''
			},
            dataType:'json',
            success:function  (data) {
            	//视屏url链接，目录信息，
                //进行视频的初始化工作
            },
            error:function  (data) {
            	
            }
		});
	}
	
	//计算视屏高度方法；
	function videoHeight() {
		var videoWidth = $('.videoOut').width();
		//固定的适应宽高比，根据所设置的视屏播放区域改变
		return (videoWidth / ($(window).width()/740));
	}
	
	//初始化播放器
	var myPlayer = videojs('my-video');
    //初始化视屏高度
	myPlayer.height(740);
	
	
	//	学习状态栏
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
		time = parseInt(time);
		if (time < 10) {
			return ('00:0' + time);
		}
		if (time >= 10 && time < 60) {
			return time == 10 ? "00:10" : ('00:' + parseInt(time / 10) + time % 10);
		}
		if (time >= 60 && time < 600) {
			return time == 60 ? '01:00' : ('0' + parseInt(time / 60) + ':' + parseInt(time % 60));
		}
		if (time >= 600 && time < 3600) {
			return time == 600 ? "10:00" : ('' + parseInt(time / 600) + parseInt(parseInt(time % 600) / 60) + ':' + parseInt(time % 60));
		}
	}

	//	更改学习总时长显示,由于视屏需要在加载完成之后才显示时长，使用定时器轮训
	function showAllTime() {
		var times = setInterval(function function_name() {
			var time = myPlayer.duration()
			videoAllTime.html(getTimeStyle(time));
			if (time != 0) {
				clearInterval(times);
			}
		}, 500)
	}

	//	更改学习时间显示
	function showStudyTime() {
//		定义一个定时更新学习时间的函数，每隔1s更新一次
		var times;
		myPlayer.on('play', function() {
			//更改学习状态
			changeStudyDate ('&#xe608','学习中');
			//启用定时器
			times = setInterval(function() {
				//获取当前的播放进度并且使用四舍五入法磨平函数执行的时间差
				videoStudyTime.html(getTimeStyle(Math.round(myPlayer.currentTime())));
			}, 1000);
		})
		myPlayer.on('pause', function() {
			//清除定时器
			clearInterval(times);
			//更改学习状态
			changeStudyDate ('&#xe60c','播放') 
		})
	}
	
	//学习状态更改函数
	function changeStudyDate (icons,states) {
		videoStudyState.html(states);
		videoStudyIcon.html(icons);
	}
    
    function sendLearnTime () {
    	//发送学习时长，pageInfo.id为具体视屏id;
		if (!pageInfo.mid) return;
        // 定义最终时间
		var lastTime = 0,
		    //获取当前时间
			startTime = new Date().getTime(),
			//定义数据对象
			_params = {};
		_params.mid = pageInfo.mid;
		// 每隔6秒发送一次学习时长信息请求，
    	var postStudyTime=setInterval(function(){
    		
//			setSectionIconState(function(data){
//				if (data.data.media) {
//					$(".course-section-current .section-state-icon")
//						.removeClass('section-state-icon-learning')
//						.addClass('section-state-icon-learnt');
//				}
//			});
		}, 6000);
    }
    
   
    
    
    
    //播放器底部状态栏根据是否显示为播放来切换视屏播放或者是停止
	myPlayer.ready(function() {
		showAllTime();
		showStudyTime();
		videoStudyState.on('click', function() {
			$(this).html() == '播放' ? myPlayer.play() : myPlayer.pause();
		});
	})

    //
	

