var currentListPage = 1;
var editor;
$(document).ready(function  () {
	
	UE.plugins['contextmenu'] = function () {
                    }; //去掉右键菜单
                    editor = new baidu.editor.ui.Editor({
                        lang: window.currentLang,
                        toolbars: [],
                        maximumWords: 200,
                        wordCount: true,
                        autoHeightEnabled: true,
                        elementPathEnabled: false,
                        minFrameHeight: 100,
                        initialFrameHeight: 100
                    });
                    
        editor.addListener('wordcount', function (type) {
            var contentlength = editor.getContentTxt().trim().length;
            var less = 2000 - contentlength;
            if (less < 0) {
                $('#charNum').css("color", "red").text("超过最大字符限制");
            } else {
                $('#charNum').css("color", "#999").text("最多还可以输入" + less + "字");
            }
        });
        editor.render("txtContent");
        currentListPage = 0;
        
	    //提问函数	
	$('#btnSave').click(function  () {
		if ($.trim(editor.getContent()) == "") {
            layer.msg("请填写要发表的内容！");
            return false;
        }
        $("#btnSave").attr("disabled", "disabled");
        if ($("#uploadResource-queue .uploadify-queue-item").length > 0) {
            $('#uploadImage').uploadify('upload', '*');
        } else {
            Submitdata();
        }
	})
	
    //提问函数
    function Submitdata() {
    	alert(1);
        $.post('SaveWareComment?cid=@(ViewBag.courseId)&wid=@(ViewBag.wareId)&t=' + (new Date()).valueOf(),
            {
                content: editor.getContent(),
                //图片列表无
                piclist: ''
            }, function (data) {
                if (data.result > 0) {
                    $("#btnSave").removeAttr("disabled");
                    InitComment();
                   layer.msg("发表成功！");
                }
                else {
                    layer.msg(data.content);
                    $("#btnSave").removeAttr("disabled");
                }
                $("#uploadResource-queue").html("");
                editor.setContent("");
            });
    }
//	 载入头部和尾部
	 $('#header').load('../../widget/header/header.html');
	 $('#footer').load('../../widget/footer/footer.html');
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
	//精彩问答
	var table_QA=$('#table_qa');
	var QAlist=$('#WonderfulQA');
	
	var main=$('#main');
	
	main.height(studyText.height());
    //table切换效果
	chatAndAnswer ( [table_study,table_ask,table_recorde,table_QA],[studyText,askQuestion,recorde,QAlist],main,"check" );
	
	
	 //评论详情切换
    var btn_chooseAll=$('.chooseAll');
    var btn_chooseMine=$('.chooseMine');
    
    function choose_select (domA,classB) {
    	domA[0].on('click',function  () {
    		domA[0].addClass(classB);
    		domA[1].removeClass(classB);
    	});
    	domA[1].on('click',function  () {
    		domA[1].addClass(classB);
    		domA[0].removeClass(classB);
    	});
    };
    
    choose_select([btn_chooseAll,btn_chooseMine],'selected');
//	jsrender模板渲染
	 $("#askQuestionLists").JsRenderData({
			sourceUrl: 'http://127.0.0.1:8080/themes/chinaaet/page/courseInformation/text.json',
			isPage: true,
			pageSize: 3,
			pageIndex: 1,
			templateID: "answerListTpl",
			funCallback: function(data) {
				//回调函数，用于展开所有回答
			var answerLists=$('#listbody');
		    answerLists.on('click','.answer',function  () {
		    	$(this).parent('.list').children('.texts').children('ul').animate({maxHeight:'10000px'},300,function () {
		    		main.height($('#askQuestion').height());
		    	});
		    })
			}
		});
	
	$("#WonderfulQALists").JsRenderData({
			sourceUrl: 'http://127.0.0.1:8080/themes/chinaaet/page/courseInformation/text.json',
			isPage: true,
			pageSize: 3,
			pageIndex: 1,
			templateID: "qaListTpl",
			funCallback: function(data) {
				//回调函数，用于展开所有回答
			var answerLists=$('#listbody');
		    answerLists.on('click','.answer',function  () {
		    	$(this).parent('.list').children('.texts').children('ul').animate({maxHeight:'10000px'},300,function () {
		    		main.height($('#askQuestion').height());
		    	});
		    })
			}
		});
	//我要提问	
	var iAsk=$('#iAsk');
	
	iAsk.on('click',function  () {
		layer.open({
		type: 1,
		title:'我要提问',
		content: $('#layer_Ask'),
		closeBtn: 1,
		skin: 'layui-layer-rim',
		area: ['750px', '280px']
	})
	})
	//课程简介
	var couunflod=$('.couItd .unflod');
	//讲师简介
	var tecunflod=$('.tecItd .unflod');
	//课程简介主体
	var couText=$('.couItd div');
	//老师详情主体
	var tecText=$('.tecItd div');
	//课程简介主体内部
	var couTextInner=$('.couItd div pre');
	//老师详情主体内部
	var tecTextInner=$('.tecItd div .fulltext');
	
	couTextInner.height()>couText.height()?couunflod.show():couunflod.hide();
	
	tecTextInner.height()>tecText.height()?tecunflod.show():tecunflod.hide();
	function changeunflod (A,B,className) {
			B.toggleClass(className);
			A.html().indexOf('展开')>0 ? A.html('>>收起') : A.html('>>展开')
	}
	//事件绑定
	couunflod.on('click',function  () {
	changeunflod(couunflod,couText,'originalStyle');
	})
    tecunflod.on('click',function  () {
    changeunflod(tecunflod,tecText,'originalStyle');    	
    })
    
    
    //富文本编辑框处的图片属性重置
    var imgList=$('.tecItd img');
    for (var i=0;i<imgList.length;i++) {
    	var marginHeight=imgList.eq(i).attr('vspace')+'px';
    	var marginWidth=imgList.eq(i).attr('hspace')+'px';
    	imgList.eq(i).css({'margin-left':marginWidth,'margin-right':marginWidth,'margin-top':marginHeight,'margin-bottom':marginHeight});
    }
	
})