<?php 
	require '../../php/config.php';
	$query = mysql_query("SELECT (SELECT COUNT(*) FROM zhihu_add_comment WHERE titleid=a.id) AS count,a.id,a.title,a.content,a.user,a.date FROM zhihu_add_question a ORDER BY date DESC LIMIT 0,10")or die("SQL错误".mysql_error());
	$json = '';
	$json = "";
	while (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		foreach ($row as $key => $value) {
			$row[$key] = urlencode(str_replace("\n", "", $value));
		}
		$json .= urldecode(json_encode($row)).",";
	} 
	echo "[".substr($json,0,strlen($json)-1)."]";
	mysql_close();
?>
