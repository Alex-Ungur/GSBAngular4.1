<?php
 require_once '../data/pdogsbrapports.php'; 
 $data = json_decode(file_get_contents('php://input'),true); 
 $id = $data['id']; 
 $adresse = $data['adresse']; 
 $tel = $data['tel']; 
 $specialite = $data['specialite']; 
 $pdo = PdoGsbRapports::getPdo();
 $ret = $pdo->majMedecin($id ,$adresse ,$tel ,$specialite);
 echo $ret;
?>
