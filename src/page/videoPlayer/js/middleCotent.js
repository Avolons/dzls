//
//作者:wzh
//页面中部提问,笔记和评论列表部分
//2016.5.28
//

$(document).ready(function  () {
	
//	笔记,提问,评论按钮
	var myNoteBtn=$('#myNoteBtn');
	var myAskBtn=$('#myAskBtn');
	var myCommentBtn=$('#myCommentBtn');
	
//	笔记,评论,提问显示区
	var myNote=$('.myNote');
	var myAsk=$('.myAsk');
	var myComment=$('.comment');
	
	
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
//	下部主体部分切换效果
	chatAndAnswer([myNoteBtn,myAskBtn,myCommentBtn],[myNote,myAsk,myComment],'clickStyle_red');
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
























