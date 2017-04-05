<?php 
	require 'config.php';
	$page = $_POST['page'];
	$pageSize = $_POST['rows'];
	$first = $pageSize * ($page - 1);
	$sort = $_POST['sort'];
	$order = $_POST['order'];
	$sql = '';
	$name = '';
	$create_time = '';
	$end_time = '';
	//查询
	if (isset($_POST['name']) && !empty($_POST['name'])) {
		$name = "name LIKE '%{$_POST['name']}%' AND ";
		$sql .= $name;
	}
	if (isset($_POST['create']) && !empty($_POST['create'])) {
		$create_time = " date >= '{$_POST['create']}' AND ";
		$sql .= $create_time;
	}
	if (isset($_POST['end']) && !empty($_POST['end'])) {
		$end_time = " date <= '{$_POST['end']}' AND ";
		$sql .= $end_time;
	}
	if (!empty($sql)) {
		$sql = 'WHERE '.substr($sql, 0,-4);
	}
	$query = mysql_query("SELECT id,name,email,phone,content,date FROM message $sql ORDER BY $sort $order LIMIT $first,$pageSize");
	$json = '';
	while (!!$row = mysql_fetch_array($query,MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	$json = substr($json, 0, -1);
	$count = mysql_num_rows(mysql_query("SELECT name,content,date FROM message $sql"));
	echo '{"total":'.$count.',"rows":['.$json.']}';
	mysql_close();
 ?>
