<?php 
	require '../../php/config.php';
	$sql = mysql_query("SELECT COUNT(*) AS count FROM zhihu_add_comment WHERE titleid='{$_POST['titleid']}' ");
	$relust = mysql_fetch_array($sql,MYSQL_ASSOC);
	echo $relust['count'];
	mysql_close();
?>