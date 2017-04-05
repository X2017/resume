<?php
	require 'config.php';
	$query="INSERT INTO message (name,email,phone,content,date)
		VALUES('{$_POST['name']}','{$_POST['email']}','{$_POST['phone']}','{$_POST['content']}',NOW())";
	mysql_query($query) or die('新增失败！'.mysql_error());
	echo mysql_affected_rows(); //写入成功返回1
	mysql_close();
?>
