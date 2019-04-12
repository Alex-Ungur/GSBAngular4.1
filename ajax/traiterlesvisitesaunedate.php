<?php
    session_start();
    $data = json_decode(file_get_contents('php://input'),true);
    require_once '../data/pdogsbrapports.php';   
    $mdp = $_SESSION['visiteur']['mdp'];
    $login = $_SESSION['visiteur']['login'];
    $date = $data['dateRapport'];
   
    $pdo = PdoGsbRapports::getPdo();
    $lesVisites = $pdo->getLesVisitesUneDate($login, $mdp, $date);// retourne les visites
    echo json_encode($lesVisites);
 ?>
