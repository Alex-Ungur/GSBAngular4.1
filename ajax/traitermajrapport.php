<?php
// session_start();
 require_once '../data/pdogsbrapports.php';  
 $data = json_decode(file_get_contents('php://input'),true); 
 $idRapport = $data['id']; 
 $bilan = $data['bilan']; 
 $motif = $data['motif']; 
 $pdo = PdoGsbRapports::getPdo();
 $ret = $pdo->majRapport($idRapport,$bilan,$motif);
 echo $ret;
  
  
 ?>
