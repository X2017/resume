<?php 
	require '../../php/config.php';
	$titleid = $_POST['titleid'];
	$query = mysql_query("DELETE FROM zhihu_add_comment WHERE titleid IN ($titleid)");
	echo mysql_affected_rows();
	mysql_close();
 ?>