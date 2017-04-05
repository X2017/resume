<?php
	require '../../php/config.php';
	$pass = sha1($_POST['loginPass']);
	$query = mysql_query("SELECT user,password FROM zhihu_user WHERE user='{$_POST['loginUser']}' AND password = '{$pass}' ")or die('SQL ERROR');
	if (mysql_fetch_array($query,MYSQL_ASSOC)) {
		echo "true";
	}else {
		echo "false";
	}
	mysql_close();
?>