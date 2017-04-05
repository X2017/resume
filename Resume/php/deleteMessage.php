<?php 
	require 'config.php';
	$id = $_POST['id'];
	$query = mysql_query("DELETE FROM message WHERE id IN ($id)");
	echo mysql_affected_rows();
	mysql_close();
 ?>