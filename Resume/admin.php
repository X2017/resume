<?php
session_start();
if (!isset($_SESSION['admin'])) {
	header('location:login.php');
}
?>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>留言管理</title>
	<link rel="stylesheet" href="jquery-easyui-1.5/themes/default/easyui.css">
	<link rel="stylesheet" href="jquery-easyui-1.5/themes/icon.css">
	<link rel="shortcut icon" href="img/favicon.ico"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
	<style type="text/css">
		*{
			margin: 0;
			padding: 0;
		}
		body{
			font-size: 13px;
		}
		.input_search input {
			width: 100px;
		}
		.input_style{
			border:1px solid #95B8E7;
			border-radius: 5px;
			height:22px;
			margin:0;
			padding:0 2px;
			position: relative;
			top: 2px;
		}
	</style>
</head>
<body>
	<strong id="admin" style="display:none"><?php echo $_SESSION['admin']; ?></strong>
	<table id="datagrid"></table>
	<div id="tb">
		<div>
			<a href="#" class="easyui-linkbutton" onclick="obj.add()" data-options=" iconCls:'icon-add', plain:true ">增加</a>
			<a href="#" class="easyui-linkbutton" onclick="obj.edit()" data-options=" iconCls:'icon-edit', plain:true ">编辑</a>
			<a href="#" id="save" class="easyui-linkbutton" onclick="obj.save()" data-options=" iconCls:'icon-save', plain:true ">保存</a>
			<a href="#" id="redo" class="easyui-linkbutton" onclick="obj.redo()" data-options=" iconCls:'icon-redo', plain:true ">撤销</a>
			<a href="#" class="easyui-linkbutton" onclick="obj.delete()" data-options=" iconCls:'icon-remove', plain:true">删除</a>
			<a href="php/exit.php" class="easyui-linkbutton" data-options=" iconCls:'icon-no', plain:true">退出</a>
		</div>
		<div class="input_search">
			<label for="name_id">名称</label><input type="text" id="name_id" name="name_name" class="input_style">
			<label for="create_time_id">创建时间</label><input type="text" id="create_time_id" name="create_time_name" class="easyui-datebox" data-options="editable:false">
			<label for="end_time_id">结束时间</label><input type="text" id="end_time_id" name="end_time_name" class="easyui-datebox" data-options="editable:false ">
			<a href="#" class="easyui-linkbutton" onclick="obj.search()">搜索</a>
		</div>
	</div>
	<br> <br>
	<div id="menu" class="easyui-menu" style="width:120px">
		<div onclick="obj.r_edit()" iconCls="icon-edit">编辑</div>
		<div onclick="obj.add()" iconCls="icon-add">增加</div>
		<div onclick="obj.r_delete()" iconCls="icon-cancel">删除</div>
	</div>
	<script type="text/javascript" src="jquery-easyui-1.5/jquery.min.js"></script>
	<script type="text/javascript" src="jquery-easyui-1.5/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="jquery-easyui-1.5/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="js/admin.js"></script>
</body>
</html>