<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>Login - nowscom</title>
	<link rel="stylesheet" href="jquery-easyui-1.5/themes/default/easyui.css">
	<link rel="stylesheet" href="jquery-easyui-1.5/themes/icon.css">
	<link rel="shortcut icon" href="img/favicon.ico"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
	<style type="text/css">
		.login{
			font-size: 13px;
		}
		.login div{
			margin: 15px;
			padding-left: 15px;
		}
		.login input{
			height: 25px;
			border: 1px solid silver;
			border-radius: 3px;
			padding: 2px 5px;
			font-size: 15px;
		}
		#btn{
			text-align: left;
			padding-left: 55px;
		}
	</style>
</head>
<body>
	<div id="login" class="login">
		<div>
			<label for="admin">账号</label>
			<input type="text" id="admin">
		</div>
		<div>
			<label for="password">密码</label>
			<input type="password" id="password">
		</div>
		<div id="btn">
			<a class="easyui-linkbutton" style="padding:2px 8px;">登陆</a>
		</div>	</div>
	<script type="text/javascript" src="jquery-easyui-1.5/jquery.min.js"></script>
	<script type="text/javascript" src="jquery-easyui-1.5/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jquery-easyui-1.5/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="js/login.js"></script>
</body>
