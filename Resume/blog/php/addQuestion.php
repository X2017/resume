<?php 
	require '../../php/config.php';
	$query = "INSERT INTO zhihu_add_question (title,content,user,date) VALUES('{$_POST['queTitle']}','{$_POST['queContent']}','{$_POST['user']}',NOW())";
	mysql_query($query)or die('新增失败 '.mysql_error());
	echo mysql_affected_rows();
	mysql_close();
 ?>