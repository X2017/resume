<?php 
	require 'config.php';
	$row = $_POST['row'];
	$name = $row['name'];
	$email = $row['email'];
	$phone = $row['phone'];
	$content = $row['content'];
	mysql_query(" INSERT INTO message (name,email,phone,content,date) VALUES('{$name}','{$email}','$phone','$content',NOW()) ");
	echo mysql_affected_rows();
	mysql_close();
 ?>