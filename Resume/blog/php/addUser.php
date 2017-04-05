<?php
	require '../../php/config.php';
	$query="INSERT INTO zhihu_user (user,password,date) VALUES ('{$_POST['user']}',sha1('{$_POST['password']}'),NOW())";
	mysql_query($query)or die('新增失败！'.mysql_error());
	echo mysql_affected_rows();
	mysql_close();
?>