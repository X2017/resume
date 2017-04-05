<?php 
	require '../../php/config.php';
	$sql = mysql_query(" SELECT COUNT(*) AS count FROM zhihu_add_comment WHERE titleid='{$_POST['titleid']}' ");
	$result = mysql_fetch_array($sql,MYSQL_ASSOC);
	$page = 1;
	$pageSize = 2;
	$count = ceil($result['count'] / $pageSize);
	if (!isset($_POST['page'])) {
		$page = 1;
	}else {
		$page = $_POST['page'];
		if ($page > $count) {
			$page = $count;
		}
	}
	$limit = ($page - 1) * $pageSize;
	$query = mysql_query("SELECT ({$count}) AS count,titleid,comment,user,date FROM zhihu_add_comment WHERE titleid='{$_POST['titleid']}' ORDER BY date DESC LIMIT {$limit},{$pageSize}");
	$json = '';
	while (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		foreach ($row as $key => $value) {
			$row[$key] = urlencode(str_replace("\n", "", $value));
		}
		$json .= urldecode(json_encode($row)).',';
	} 
	echo '['.substr($json,0,strlen($json)-1).']';
	mysql_close();
?>