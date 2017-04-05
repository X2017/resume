<?php
	require('../../php/config.php');
	$query = mysql_query("SELECT user,date FROM zhihu_user ");
	$json = '';
	while (!! $row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		$json .= json_encode($row).','; 
	}
	echo '['.substr($json, 0, strlen($json)-1).']';
	mysql_close();
?>