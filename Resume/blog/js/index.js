//验证码
var code;
function createCode() {
	code = '';
	var codeLength = 2;
	var random = [2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'];
	for (var i = 0; i < codeLength; i++) {
		var codeIndex = Math.floor(Math.random()*32);
		code += random[codeIndex];
	}
	$('#veriCode').html(code);
}
function checkCode() {
	var veri = $('#veri').value.toUpperCase();
}
$(function () {
	// 选项卡
	$('#list li').click(function () {
		$('#content .tab').hide();
		$(this).addClass('active').siblings().removeClass('active');
		$('#content .tab').eq($(this).index()).show();
	});
	//打开 关闭 reg
	$('#regA').click(function () {
		$('#reg').dialog('open');
		$.lock();
	});
	$('#reg .close').click(function () {
		$('#reg').dialog('close');
		$.unlock();
	});
	//注册下面的登陆
	$('#loginA1').click(function () {
		
	});
	//检查用户名
	// $.validator.addMethod('checkUserName', function(value, element) {
	//      var tel = /[a-zA-Z0-9\-\_]{4}/;
	//      return this.optional(element) || (tel.test(value));
	//  }, '用户名由字母和数字下！');
	//注册
	$('#reg').dialog({
		width:320,
		autoOpen:false,
		buttons:{
			'注册':function () {
				var veri =  $('#veri').val().toUpperCase();
				if (veri.length <= 0){
					alert('请输入验证码!');
				}else if (veri != $('#veriCode').text()) {
					alert('输入错误!');
					$('#veri').val('');
					createCode();
				}else {
					$(this).submit();
				}
			}
		}
	}).validate({
		rules: {
			user: {
				required: true,
				minlength: 2,
				remote: {
					url: 'php/isUser.php',
					type: 'POST'
				}
			},
			pass: {
				required: true,
				minlength: 6
			},
			veri: {
				required: true,
			}
		},
		messages: {
			user: {
				required: '账号不能为空！',
				minlength: $.validator.format('账号不能小于{0}位！'),
				remote: '用户名已经被注册！'
			},
			password: {
				required: '密码不能为空！',
				minlength: $.validator.format('密码不能小于{0}位！')
			},
			veri: {
				required: '验证码不能为空！'
			}
		},
		errorLabelContainer: 'ol.regError',
		wrapper: 'li',
		highlight: function(element, errorClass) {
			$(element).css('color', 'maroon');
		},
		unhighlight: function(element, errorClass) {
			$(element).css('color', 'black');
		},
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				url: 'php/addUser.php',
				type: 'POST',
				beforeSubmit: function(formData, jqForm, options) {
					loading('正在注册','loading.gif','black');
					$('#reg').dialog('widget').find('button').eq(1).button('disable');
				},
				success: function(responseText, statusText) {
					if (responseText) {
						loading('注册成功','succ.png','green');
        				//cookie
        				setCookie({
        					name:'user',
        					value:$('#user').val(),
        					expires:99999
        				});
        				$('.loginNone').css('display','none');
        				$('.loginSta').show();
        				$('#userName').html($('#user').val());
        				setTimeout(function () {
        					loadingClose('close');
        					$('#reg').dialog('close').resetForm();
        					$.unlock();
        				},1000);
        			}
        			$('#reg').dialog('widget').find('button').eq(1).button('enable');
        		},
        		error: function(event, errorText, errorType) {
        			alert('错误'+errorText + ' ' + errorType);
        		}
        	});
		}
	});
	//生成验证码
	createCode();
	$('#veriCode').click(function () {
		createCode();
	});
	//登陆后显示下拉菜单
	$('.loginSta').hover(function () {
		$('.menu').show();
	},function () {
		$('.menu').hide();
	});
	$('#exit').click(function () {
		$('.loginSta').hide();
		$('.loginNone').css('display','block');
		removeCookie('user');
	});
	//登陆框
	$('#login .close').click(function () {
		$('#login').dialog('close');
	});
	$('#loginA1').click(function () {
		$('#login').dialog('open');
	});
	$('#login').dialog({
		width:320,
		autoOpen:false,
		buttons:{
			'登陆':function () {
				$(this).submit();
			}
		}
	}).validate({
		rules:{
			loginUser:{
				required:true,
				minlength:4
			},
			loginPass:{
				required:true,
				minlength:6
			}
		},
		messages:{
			loginUser:{
				required: '账号不能为空！',
				minlength: $.validator.format('账号不能小于{0}位！')
			},
			loginPass:{
				required: '密码不能为空！',
				minlength: $.validator.format('密码不能小于{0}位！')
			}
		},
		errorLabelContainer: 'ol.regError',
		wrapper: 'li',
		highlight: function(element, errorClass) {
			$(element).css('color', 'maroon');
		},
		unhighlight: function(element, errorClass) {
			$(element).css('color', 'black');
		},
		submitHandler:function (form) {
			$(form).ajaxSubmit({
				url:'php/login.php',
				type:'POST',
				beforeSubmit: function(formData, jqForm, options) {
					$(form).dialog('widget').find('button').eq(1).button('disable');
					loading('正在登陆','loading.gif','black');
				},
				success:function (responseText, statusText) {
					if (responseText){
						loading('登陆成功','succ.png','green');
						setTimeout(function () {
							$('#login').dialog('close').resetForm();
							loadingClose();
						},1000);
						if ($('#expires').is(':checked')) {
							setCookie({
								name:'user',
								value:$('#loginUser').val(),
								expires:99999
							});
						}
						$('.loginNone').css('display','none');
						$('.loginSta').show();
						$('#userName').html($('#loginUser').val());
					}
					setTimeout(function () {
						$(form).dialog('widget').find('button').eq(1).button('enable');
					},1500);
				}
			});
		}
	});
	$('#login').dialog('widget').find('button').eq(1).css('width','290px');
    //加载提示
    function loading(str,url,color) {
    	$('#loading').dialog({
    		width: 150,
    		height: 67,
    		modal: true
    	}).html(str).css({
    		background: 'url(../img/'+url+') no-repeat 15px 20px',
    		lineHeight: '55px',
    		textIndent: '40px',
    		color:color
    	});
    }
    //关闭加载
    function loadingClose() {
    	$('#loading').dialog('close');
    }
	// 提问
	$('#question').dialog({
		width: 630,
		autoOpen: false,
		buttons: {
			'提问': function() {
				if (getCookie('user')) {
					$(this).submit();
				} else {
					$('#login').dialog('open');
				}
			}
		}
	}).validate({
		rules: {
			queTitle: {
				required: true
			}
		},
		messages: {
			queTitle: {
				required: '标题不能为空'
			},
		},
		wrapper: 'div',
		errorClass: 'queError',
		highlight: function(element, errorClass) {
			$(element).css('color', 'maroon');
		},
		unhighlight: function(element, errorClass) {
			$(element).css('color', 'black');
		},
		errorPlacement: function(label, element) {
			label.insertBefore(element);
		},
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				url: 'php/addQuestion.php',
				type: 'POST',
				data: {
					user: getCookie('user')
				},
				beforeSubmit: function(formData, jqForm, options) {
					$('#question').dialog('widget').find('button').eq(1).button('disable');
					loading('正在提交','loading.gif','black');
				},
				success: function(responseText, statusText) {
					if (responseText) {
						loading('提问成功','succ.png','green');
						var current = window.location;
						window.location = current;						
						// setTimeout(function() {
						// 	$('#question').dialog('close').resetForm();
						// 	loadingClose();
						// 	$('#ueditor_0').contents().find('body').html('');
						// }, 1000);
					}
					setTimeout(function () {
						$('#question').dialog('widget').find('button').eq(1).button('enable');
					},1500);
				}
			});
		}
	});
	//编辑器
/*	UE.getEditor('queContent', {
		toolbars: [
		['paragraph', 'source', 'bold', 'italic', 'underline', 'link', 'unlink', 'insertorderedlist', 'insertunorderedlist', 'blockquote', 'undo', 'redo', 'selectall', 'fullscreen', 'preview']
		],
		],
		maximumWords: 9999,
		elementPathEnabled: false,
	});
	UE.getEditor('queContent').addListener("keyup", function(type, event) {
		if (UE.getEditor('queContent').getContentLength(true) > 9999) {
			var contentText = UE.getEditor('queContent').getContentTxt();
			UE.getEditor('queContent').setContent(contentText.substring(0, 9999));
		}
	});*/
    //打开提问
    $('#quiz').click(function () {
    	if (getCookie('user')) {
    		$('#question').dialog('open');
    	}else {
    		$('#login').dialog('open');
    	}
    });
    $('#question .close').click(function () {
    	$('#question').dialog('close');
    });
    //读取cookie显示登陆
    if (getCookie('user')) {
    	$('.loginNone').css('display','none');
    	$('.loginSta').show();
    	$('#userName').html(getCookie('user'));
    }
    //提取
    $.ajax({
    	url:'php/showQuestion.php',
    	type:'POST',
    	success:function (response,status,xhr) {
    		var json = $.parseJSON(response);
    		var html = '';
    		var arr = [];
    		var summary = [];
    		var user = [];
    		$.each(json,function (index,value) {
    			// <dl class="commtentContent"><dt>林冲<dt><dd>内容</dd><dd class="date">2016</dd></dl>
    			user.push(value.user);
    			html += '<h3>'+value.title+'<span class="close">X</span><h3><h4><strong>'+value.user+'</strong> 发表于 '+value.date+'</h4><div class="editor">'+value.content+'</div><div class="bottom"><span class="comment" titleid="'+value.id+'">'+value.count+'条评论</span><span class="up">收起</span><div class="commentList"></div></div><hr noshade="noshade" size="1">';
    		});
    		$('#indexContent').append(html);
    		//当前用户显示删除
    		$('#indexContent h3').hover(function () {
    			// alert($(this).next().next().next().next().find('.comment').attr('titleid'));
    			if ($(this).next().next().find('strong').html() === getCookie('user')) {
    				$(this).find('.close').show();
    			}
    		},function () {
    			$(this).find('.close').hide();
    		});
    		//删除内容和评论
    		$('#indexContent').find('.close').on('click',function () {
    			var _this = this;
    			if (confirm('是否删除内容和评论?')) {
    				$.ajax({
    					type:'POST',
    					url:'php/deleteQuestion.php',
    					data:{
    						titleid:$(_this).parent().next().next().next().next().find('.comment').attr('titleid')
    					},
    					beforeSend:function (jqXHR,setting) {
    						loading('正在删除','loading.gif','black');
    					},
    					success:function (response,status) {
    						loading('删除成功','succ.png','green');
    						setTimeout(function () {
    							loadingClose();
    							$.ajax({
    								type:'POST',
    								url:'php/deleteComment.php',
    								data:{
    									titleid:$(_this).parent().next().next().next().next().find('.comment').attr('titleid')
    								},
    								beforeSend:function (jqXHR,setting) {
    									
    								},
    								success:function (response,status) {
    									//删除后刷新当前页面
    									var current = window.location;
    									window.location = current;
    								}
    							});
    						},1000);
    					}
    				});
    			}
    		});
    		//字符串截取
    		$.each($('.editor'),function (index,value) {
    			arr[index] = $(value).html();
    			summary[index] = arr[index].substring(0, 100);
    			if (summary[index].substring(199, 100) == '<') {
    				summary = replacePos(summary[index], 100, '');
    			}
    			if (summary[index].substring(198, 100) == '</') {
    				summary[index] = replacePos(summary[index], 100, '');
    				summary[index] = replacePos(summary[index], 99, '');
    			}
    			if (arr[index].length > 100) {
    				summary[index] += '...<span class="showAll">显示全部</span>';
    				$(value).html(summary[index]);
    			}
    			$(value).next('.bottom').find('.up').hide();
    		});
    		$.each($('.editor'), function(index, value) {
    			$(this).on('click', '.showAll', function() {
    				$(this).hide();
    				$('.bottom .up').eq(index).show();
    				$('.editor').eq(index).html(arr[index]);
    			});
    		});
    		$.each($('.bottom'), function(index, value) {
    			$(this).on('click', '.up', function() {
    				$(this).hide();
    				$('.editor').eq(index).html(summary[index]);
    			});
    		});
    		//打开评论
    		$.each($('.bottom'),function (index,value) {
    			$(this).on('click','.comment',function () {
    				var commentThis = this;
    				//显示评论
					if (!$('.commentList').eq(index).has('form').length) {
						$.ajax({
							url:'php/showComment.php',
							type:'POST',
							data:{
								titleid:$(commentThis).attr('titleid')
							},
							beforeSend:function (jqXHR,setting) {
								loading('正在加载','loading.gif','black');
							},
							success:function (response,status) {
								loadingClose();
								var count  = 0;//评论分页数量
								var page = 2;//默认第二页
								var count = 0;
								$.each($.parseJSON(response),function (index2,value) {
									count = value.count;
									$('.commentList').eq(index).append('<dl class="commentContent"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>');
								});
								//加载更多
								var page = 2;
								if (page > count) {

								}else {
									$('.commentList').eq(index).append('<div class="loadMore">加载更多</div>');
								}
								$('.commentList').eq(index).find('.loadMore').on('click',function () {
									$.ajax({
										type:'POST',
										url:'php/showComment.php',
										data:{
											titleid:$(commentThis).attr('titleid'),
											page:page
										},
										beforeSend:function (jqXHR,setting) {
											loading('正在加载','loading.gif','black');
										},
										success:function (response,status) {
											loadingClose();
											if (page > count) {
												loading('没有评论了','succ.pnf','green');
												$('.commentList').eq(index).find('.loadMore').hide();												
												setTimeout(function () {
													loadingClose();
												},500);
											}else {
												$.each($.parseJSON(response),function (index4,value) {
													$('.commentList').eq(index).find('dl').last().after('<dl><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>');
												});
											}
											page ++;
										}
									});
								});
								//添加评论表单
								$('.commentList').eq(index).append('<form><div class="comment_error" style="margin-bottom:5px;color:maroon"></div><textarea name="comment"></textarea><input type="hidden" name="titleid" value="'+$(commentThis).attr('titleid')+'"/><button type="button">发布</button><br style="clear:both"></form>');
								//发表评论
								$('.commentList').eq(index).find('button').click(function () {
									if (getCookie('user')) {
										if ($('.commentList').eq(index).find('form').find('textarea').val() != '') {
											$('.commentList').eq(index).find('form').ajaxSubmit({
												url:'php/addComment.php',
												type:'POST',
												data:{
													user:getCookie('user')
												},
												beforeSubmit:function (formDate,jqForm,options) {
													loading('正在评论','loading.gif','black');
													$('.commentList').eq(index).find('button').hide();
												},
												success:function (responseText,statusText) {
													if (responseText) {
														loading('评论成功','succ.png','green');
														var date = new Date();
														setTimeout(function () {
															loadingClose();
															//发表成功本地添加到评论
															$('.commentList').eq(index).prepend('<dl  class="commentContent"><dt>'+getCookie('user')+'</dt><dd>'+$('.commentList').eq(index).find('form').find('textarea').val()+'</dd><dd class="date">'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'</dd></dl>');
															$('.commentList').eq(index).find('button').show();
															$('.commentList').eq(index).find('form').find('textarea').val('');
														},500);
													}
													//评论成功 获取评论数量
													$.ajax({
														url:'php/countComment.php',
														type:'POST',
														data:{
															titleid:$(commentThis).attr('titleid')
														},
														success:function (response,status) {
															$(commentThis).html(response+'条评论');
														}
													});
												}
											});
										}else {
											alert('内容不能为空');
										}
									}else {
										$('#login').dialog('open');
									}
								});
							}
						});
					}
					if ($('.commentList').eq(index).is(':hidden')) {
						$('.commentList').eq(index).show();
					} else {
						$('.commentList').eq(index).hide();
					}
	    		});
    		});
    	}
    });
	//注册用户提取
	$.ajax({
		type:'POST',
		url:'php/showUser.php',
		beforeSend:function (jqXHR,setting) {
			
		},
		success:function (response,status) {
			var html = '';
			$.each($.parseJSON(response),function (index,value) {
				// <p>账号: <strong>user</strong> 注册时间:<em>2016</em></p>
				html += '<p><strong>'+value.user+'</strong> 注册时间：<em>'+value.date+'</em><p>'
			});
			$('.userList').append(html);
		}
	});
});
function replacePos(str, pos, replaceText) {
	return str.substr(0, pos - 1) + replaceText + str.substring(pos, str.length);
}
console.log("%c 电话: 17097236232 \n 邮箱: nowcom@163.com \n 朱渊 - web前端开发 \n www.nowscom.com", "font-size:26px;color:#4C9ED9");
