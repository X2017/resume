<?php 
	require '../../php/config.php';
	$query = "INSERT INTO zhihu_add_comment (titleid,user,comment,date) VALUES('{$_POST['titleid']}','{$_POST['user']}','{$_POST['comment']}',NOW())";
	mysql_query($query)or die('新增失败 '.mysql_error());
	echo mysql_affected_rows();
	mysql_close();
?>