<?php
include_once '../php-helper/HandleRequest.php';
$data = new HandleRequest($_REQUEST, $_SERVER);
echo '<pre>';
var_dump($data->forward());
echo '</pre>';
