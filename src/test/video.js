/**
 * 视频播放页面业务逻辑
 * @author zhangshaoliu
 * @update 2015-07-31
 */
(function(global, $) {

	var videoPlayer = null;

	var sendLearnTime = (function() {
//		发送学习时长
		if (!pageInfo.mid) return;

		var lastTime = 0,
			startTime = new Date().getTime(),
			//获取当前时间
			_params = {};

		_params.mid = pageInfo.mid;

		// 每隔1分钟发送一次学习时长信息请求，
		// 并更改当前节的icon状态改为已学的icon外观
		global.setInterval(function(){
			setSectionIconState(function(data){
				if (data.data.media) {
					$(".course-section-current .section-state-icon")
						.removeClass('section-state-icon-learning')
						.addClass('section-state-icon-learnt');
				}
			});
		}, 60e3);

		global.onbeforeunload = function() {
			sendMediaUser(function(){
				lastTime = stayTime;
			}, false);
		};
		
		// 发送请求主体函数,函数定义在函数内
		function sendMediaUser(callback, isAsync) {
			var overTime,
				stayTime;
			// 如果播放器初始化还未完成
			if (typeof(videoPlayer) != 'object') {
				return;
			}
			overTime = new Date().getTime();
			stayTime = parseInt(overTime - startTime) / 1000;
			_params.time = stayTime - lastTime;
			_params.learn_time = videoPlayer.getPosition();
			$.ajax({
				url: '/course/ajaxmediauser/',
				data: _params,
				type: "POST",
				dataType: 'json',
				async: isAsync || true,
				success: function(data) {
					if (data.result == '0') {
						callback && callback(data);
					}
				}
			});
		};

		function setSectionIconState(callback){
			sendMediaUser(callback);
		}
		return setSectionIconState;
	})();

	// 添加事件交互处理
	function addEventMonitor(){
		// 课程章标题点击逻辑处理
		$(".chapter-title").on("click", function() {
			var $currTitleEl = $(this),
				$extendIconEl = $currTitleEl.find("span"), // 是否展开的图标
				$sectionWrapEl = $currTitleEl.parent("li").find('ul');  // 节列表元素

			if ($extendIconEl.hasClass('open')) {
				$extendIconEl.removeClass('open');
				$sectionWrapEl.show();
			} else {
				$extendIconEl.addClass('open');
				$sectionWrapEl.hide();
			}
		});

		// 课程节标题点击逻辑处理
		$('.course-sections').on('click', 'a', function(e) {
			if (!pageInfo.islogin && course.allowId && $(this).data('id') != course.allowId) {
				// 如果未登录，只能点第一节
				// 否则弹出登录引导提示框
				component.popup.addPrevent();
				e.preventDefault();
			}
		});
	}


	$(function() {
		// 视频播放器初始化
		if (course.videoUrl && course.videoUrl != "false") {
			videoPlayer = jwplayer('video').setup({
				file: course.videoUrl.replace(/\.flv\s*$/, ".mp4"),
				autostart: "true",
				width: "100%",
				startparam: "starttime",
				aspectratio: "16:9",
				image: course.imageUrl,
				primary: "html5",
				autochange: true,
				events: {
					onComplete: function() {
						sendLearnTime();
					}
				}
			});
		}

		addEventMonitor();
	});
})(window, window.Zepto);