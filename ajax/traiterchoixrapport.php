<?php
    $data = json_decode(file_get_contents('php://input'),true);
    require_once '../data/pdogsbrapports.php';   
    $pdo = PdoGsbRapports::getPdo();
    $idRapport = $data['id'];
    $leRapport = $pdo->getLeRapport($idRapport);
    echo json_encode( $leRapport);
    
?>
