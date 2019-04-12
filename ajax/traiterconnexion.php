<?php
 session_start();
 require_once '../data/pdogsbrapports.php'; 
 $data = json_decode(file_get_contents('php://input'),true);
 $login = $data['login'];
 $mdp = $data['mdp'];
 $pdo = PdoGsbRapports::getPdo();
 $visiteur = array();
 $visiteur = $pdo->getLeVisiteur($login,$mdp);
 if($visiteur != null){
     $_SESSION['visiteur'] = $visiteur;
     $_SESSION['visiteur']['login'] = $login;
     $_SESSION['visiteur']['mdp'] = $mdp;
     $visiteur = json_encode($visiteur);
 }
 echo $visiteur;
  
?>
