<?php 
	require 'config.php';
	$row = $_POST['row'];
	$id = $row['id'];
	$name = $row['name'];
	$email = $row['email'];
	$phone = $row['phone'];
	$content = $row['content'];
	mysql_query(" UPDATE message SET name='$name',email='$email',phone='$phone',content='$content', date=NOW() WHERE id='$id' ");
	echo mysql_affected_rows();
	mysql_close();
 ?>