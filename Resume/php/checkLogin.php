<?php 
	session_start();
	require 'config.php';
	$admin = $_POST['admin'];
	$password = sha1($_POST['password']);
	$query = mysql_query(" SELECT id FROM admin WHERE admin='$admin' AND password='$password' LIMIT 1 ");
	if (!!mysql_fetch_array($query, MYSQL_ASSOC)) {
		$_SESSION['admin'] = $admin;
		echo 1;
	} else {
		echo 0;
	}
 ?>