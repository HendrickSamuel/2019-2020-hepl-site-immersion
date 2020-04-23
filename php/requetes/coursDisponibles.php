<?php
require_once ("./../includes.php");
header("Content-Type:application/json");

$db = new DataBase();
$stm = $db->connection->query("SELECT * FROM CoursDisponibles");

$rows = $stm->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($rows);
