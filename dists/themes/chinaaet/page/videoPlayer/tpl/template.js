
//name:template.js
//auther:wzh
//time:2016.5.28
//intrdouce:js data template


//	<li>
//		<img src="img/video/water.jpg" />
//		<div class="myNoteText">
//			<h3>亚特兰蒂斯</h3>
//			<p>感觉很好还不错学到了很多知识嘻嘻</p>
//			<div class="time">
//				<h6>2016-04-23   10:05:01</h6>
//				<h6>优秀员工的十大心态 02</h6>
//				<div class="rightPlay">
//					<i class="iconfont">&#xe60b;</i>
//					<span class="timePoit">00:23:22</span>
//				</div>
//			</div>
//		</div>
//	</li>

//我的笔记列表渲染模板

//{{#for (var i = 0; i < d.length; i++) {}}
//	<li>
//		<img src={{d[i].src}} />
//		<div class="myNoteText">
//			<h3>{{d[i].name}}</h3>
//			<p>{{d[i].texts}}</p>
//			<div class="time">
//				<h6>{{d[i].time}}</h6>
//				<h6>{{d[i].index}}</h6>
//				<div class="rightPlay">
//					<i class="iconfont">&#xe60b;</i>
//					<span class="timePoit">{{d[i].timepoint}}</span>
//				</div>
//			</div>
//		</div>
//	</li>
//{{#}}}
//
//
//var data=[{
//	src:'img/video/water.jpg',
//	name:'亚特兰蒂斯',
//	texts:'感觉很好还不错学到了很多知识嘻嘻',
//	time:'2016-04-23 10:05:01',
//	index:'优秀员工的十大心态 02',
//	timepoint:'00:23:22'
//}]
//
////<li>
////	<img src="img/video/water.jpg" />
////	<div class="myAskText">
////		<h3>亚特兰蒂斯</h3>
////		<p>感觉很好还不错学到了很多知识嘻嘻</p>
////		<div class="time">
////			<h6>2016-04-23   10:05:01</h6>
////			<h6>优秀员工的十大心态 02</h6>
////			<div class="rightPlay">
////				<i class="iconfont">&#xe60b;</i>
////				<span class="timePoit">00:23:22</span>
////			</div>
////		</div>
////		<div class="teacherBack">
////			<img src="img/video/charster.png" />
////			<div class="teacher">
////				<h3>讲师&nbsp;<b>回复</b>&nbsp;匿名</h3>
////				<p>飛機架構師設計架構藍圖時，先訂好機翼與機身的接口，就分出5個機翼和一個機身。 經過幾個月後，機翼機身都製造出來了，就將它們組合起來。所以，先分后合!!
////				</p>
////			</div>
////		</div>
////	</div>
////</li>
//
//{{#for (var i = 0; i < d.length; i++) {	}}
//	<li>
//	<img src={{d[i].src}} />
//		<div class="myNoteText">
//			<h3>{{d[i].name}}</h3>
//			<p>{{d[i].texts}}</p>
//			<div class="time">
//				<h6>{{d[i].time}}</h6>
//				<h6>{{d[i].index}}</h6>
//				<div class="rightPlay">
//					<i class="iconfont">&#xe60b;</i>
//					<span class="timePoit">{{d[i].timepoint}}</span>
//				</div>
//			</div>
//		<div class="teacherBack">
//			<img src={{d[i].teacherBack.src}} />
//			<div class="teacher">
//				<h3>{{d[i].teacherBack.teacherName}}&nbsp;<b>回复</b>&nbsp;{{d[i].teacherBack.name}}</h3>
//				<p>{{d[i].teacherBack.texts}}</p>
//			</div>
//		</div>
//	</div>
//</li>
//{{#}}}
//
//
//var data=[{
//	src:'img/video/water.jpg',
//	name:'亚特兰蒂斯',
//	texts:'感觉很好还不错学到了很多知识嘻嘻',
//	time:'2016-04-23 10:05:01',
//	index:'优秀员工的十大心态 02',
//	timepoint:'00:23:22',
//	teacherBack:{
//		src:'img/video/charster.png',
//		teacherName:'讲师',
//		name:'匿名',
//		texts:'飛機架構師設計架構藍圖時，先訂好機翼與機身的接口，就分出5個機翼和一個機身。 經過幾個月後，機翼機身都製造出來了，就將它們組合起來。所以，先分后合!!'
//	}
//}]
//
//
////<li>
////	<img src="img/video/water.jpg" />
////	<div class="talkback">
////		<h3>亚特兰蒂斯</h3>
////		<p>感觉很好还不错学到了很多知识嘻嘻</p>
////		<div class="time">
////			<h6>2016-04-23   10:05:01</h6>
////			<div class="rightback">
////				<i class="iconfont">&#xe605;</i>
////				<span class="number">3</span>
////				<i class="iconfont">&#xe606;</i>
////				<span class="answer">回答</span>
////			</div>
////		</div>
////		<div class="answertext">
////           <textarea id="commentBackText" name="comment"  placeholder="请输入你的回复"></textarea>
////           <button type="button" id="submitCommentBack">回复</button>
////	    </div>
////		<ul class="commentBack">
////			<li>
////				<img src="img/video/water.jpg" />
////				<div class="talkback">
////					<h3>亚特兰蒂斯</h3>
////					<p>感觉很好还不错学到了很多知识嘻嘻</p>
////					<div class="time">
////						<h6>2016-04-23   10:05:01</h6>
////					</div>
////				</div>
////			</li>
////		</ul>
////	</div>
////</li>
//
//
//{{#for (var i = 0; i < d.length; i++) {	}}
//  <img src={{d[i].src}} />
//		<div class="talkback">
//			<h3>{{d[i].name}}</h3>
//			<p>{{d[i].texts}}</p>
//			<div class="time">
//				<h6>{{d[i].time}}</h6>
//				<h6>{{d[i].index}}</h6>
//				<div class="rightback">
//					<i class="iconfont">&#xe605;</i>
//					<span class="timePoit">{{d[i].timepoint}}</span>
//					<i class="iconfont">&#xe606;</i>
//				    <span class="answer">回答</span>
//				</div>
//			</div>
//		<div class="answertext">
//           <textarea id="commentBackText" name="comment"  placeholder="请输入你的回复"></textarea>
//           <button type="button" id="submitCommentBack">回复</button>
//	    </div>
//		<ul class="commentBack">
//		{{#for (var i = 0; i < d.length; i++) {	}}
//			<li>
//				<img src={{d[i].commentBack[j].src}} />
//				<div class="talkback">
//					<h3>{{d[i].commentBack[j].name}}</h3>
//					<p>{{d[i].commentBack[j].texts}}</p>
//					<div class="time">
//						<h6>{{d[i].commentBack[j].times}}</h6>
//					</div>
//				</div>
//			</li>
//		{{#}}}
//		</ul>
//	</div>
//{{#}}}
//
//var data=[{
//	src:'img/video/water.jpg',
//	name:'亚特兰蒂斯',
//	texts:'感觉很好还不错学到了很多知识嘻嘻',
//	time:'2016-04-23 10:05:01',
//	index:'优秀员工的十大心态 02',
//	timepoint:'00:23:22',
//	teacherBack:{
//		src:'img/video/charster.png',
//		name:'亚特兰蒂斯',
//		texts:'感觉很好还不错学到了很多知识嘻嘻',
//	    times:'2016-04-23   10:05:01'
//	}
//}]
//
////学生发言模板
//{{#for (var i = 0; i < d.length; i++) {	}}
//  <li class="stds">
//	<span class="time">{{d[i].time}}</span>
//	<b >{{d[i].name}}</b>
//	<a href="javascript:void(0);">{{d[i].texts}}</a>
//	</li>
//{{#}}}
//
////管理员发言模板
//{{#for (var i = 0; i < d.length; i++) {	}}
//  <li class="admin">
//	<span class="time">{{d[i].time}}</span>
//	<b >{{d[i].name}}</b>
//	<a href="javascript:void(0);">{{d[i].texts}}</a>
//	</li>
//{{#}}}
//
//
////老师发言模板
//{{#for (var i = 0; i < d.length; i++) {	}}
//  <li class="tch">
//	<span class="time">{{d[i].time}}</span>
//	<b >{{d[i].name}}</b>
//	<a href="javascript:void(0);">{{d[i].texts}}</a>
//	</li>
//{{#}}}
//
////问答区域模板
//<li>
// <div class="question">
//		<i class="iconfont">&#xe604;</i>
//		<h6>【提问】</h6>
//		<b>红玫瑰</b>
//	<a href="javascript:void(0);">老师ps里面的快捷键视频里为啥没找到，是没有这一节吗？</a>
//	</div>
//	<div class="answer">
//		<i class="iconfont">&#xe605;</i>
//		<h6>【最新回答】</h6>
//		<b>nickie老师</b>
//		<a href="javascript:void(0);">就在视频的结尾呢强调了一次可能你没看到。</a>
//		<span class="time">时间：4天前</span>
//	</div>
//</li>
//

