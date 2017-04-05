<?php
	header('Content_Type:text/html;charset=utf-8');
	define('DB_HOST', '127.0.0.1');
	define('DB_USER', '');
	define('DB_PWD','');
	define('DB_NAME','');
	$conn = @mysql_connect(DB_HOST,DB_USER,DB_PWD)or die(mysql_error());
	@mysql_select_db(DB_NAME)or die(mysql_errno());
	@mysql_query('SET NAMES UTF8')or die(mysql_error());
?>