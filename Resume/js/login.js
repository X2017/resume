$(function () {
	$('#login').dialog({
		title:'管理员登陆',
		width : 300,
		top:150,
		buttons:'#btn',
		modal:true,
		iconCls:'icon-login'
	});
	$('#admin').validatebox({
		required:true,
		validType:'length[4,20]',
		missingMessage:'请输入管理员账号',
		invalidMessage:'管理员账号不得为空, 长度在4-20位'
	});
	$('#password').validatebox({
		required:true,
		validType:'length[6,20]',
		missingMessage:'请输入管理员密码',
		invalidMessage:'管理员密码长度在6-30位',
	});
	if (!$('#admin').validatebox('isValid')) {
		$('#admin').focus();
	}else if (!$('#password').validatebox('isValid')) {
		$('#password').focus();
	}
	$('#btn a').click(function () {
		checkValueAjax();
	});
	var enter = 1;
	$(document).on('keyup',function (e) {
		if (e.keyCode == 13) {
			enter++;
		}
		if (enter >= 2) {
			enter = 0;
		}
		if (enter == 0 && e.keyCode == 13) {
			checkValueAjax();
		}
	})
	function checkValueAjax() {
		if (!$('#admin').validatebox('isValid')) {
			$('#admin').focus();
		}else if (!$('#password').validatebox('isValid')) {
			$('#password').focus();
		}else {
			loginAjax();
		}
	}
	function loginAjax() {
		$.ajax({
			type:'POST',
			url:'php/checkLogin.php',
			data:{
				admin:$.trim($('#admin').val()),
				password:$.trim($('#password').val())
			},
			beforeSend:function (jqXHR,setting) {
				$.messager.progress({
					text:'正在登陆...'
				});
			},
			success:function (data) {
				$.messager.progress('close');
				if (data > 0) {
					location.href = 'admin.php';
				}else {
					$.messager.alert('登陆失败','用户名或密码错误','warning',function () {
						$('#password').select();
					});
				}
			}
		});
	}
});