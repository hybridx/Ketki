<?php

require_once '/home/ketkiclinic/domains/pilesinjection.in/vendor/autoload.php';


use App\controllers\UserController as UC;

unset($uc);

$redirectUri = $_SERVER['REQUEST_URI'];
$uc = new UC($redirectUri);

$uc->route($redirectUri);




// echo "Hello";

?>
