<?php 
	require '../php/config.php';
	$query = "INSERT INTO admin (admin,password,date) VALUES ('{$_POST['admin']}', sha1('{$_POST['password']}'),NOW())";
	mysql_query($query);
	echo mysql_affected_rows();
	mysql_close();
 ?>