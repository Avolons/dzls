$(document).ready(function  () {
	//	自定义方法,用于切换样式和显示
	function chatAndAnswer ( buttons,contens,main,classNames ) {
		for (var i=0 ;i<buttons.length;i++) {
			(function  (i) {
				buttons[i].on('click',function  () {
					$(this).addClass(classNames);
					contens[i].show();
					main.height(contens[i].height());
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
	
	//学习内容
	var table_study=$('#table_study');
	var studyText=$('#studyText');
	//我要提问
	var table_ask=$('#table_ask');
	var askQuestion=$('#askQuestion')
	//获奖记录
	var table_recorde=$('#table_recorde');
	var recorde=$('#recorde');
	
	var main=$('#main');
	main.height(studyText.height());
	
	chatAndAnswer ( [table_study,table_ask,table_recorde],[studyText,askQuestion,recorde],main,"check" );
})