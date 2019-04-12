<?php
 require_once '../data/pdogsbrapports.php'; 
 $data = json_decode(file_get_contents('php://input'),true);
 $idMedecin = $data['idMedecin']; 
 $pdo = PdoGsbRapports::getPdo();
 $lesRapports = $pdo->getLesRapports($idMedecin);
 echo json_encode($lesRapports);

?>

