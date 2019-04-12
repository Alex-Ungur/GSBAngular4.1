<?php
session_start();
 $data = json_decode(file_get_contents('php://input'),true);
if(isset($_SESSION['visiteur'])){
    require_once '../data/pdogsbrapports.php'; 
    $idMedecin = $data['idMedecin']; 
    $bilan = $data['bilan']; 
    $motif = $data['motif']; 
    $date = $data['date'];
    $lesMedicaments =  $data['lesMedicaments'];
    $pdo = PdoGsbRapports::getPdo();
    $idVisiteur = $_SESSION['visiteur']['id'];
    $ret = $pdo->ajouterRapport($idMedecin,$idVisiteur, $bilan, $motif, $date, $lesMedicaments);
    echo $ret;
}
 else{
    echo 0;
}
        
?>