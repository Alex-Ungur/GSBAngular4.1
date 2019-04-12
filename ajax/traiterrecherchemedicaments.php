<?php
session_start();
$data = json_decode(file_get_contents('php://input'),true);
if(isset($_SESSION['visiteur'])){
    require_once '../data/pdogsbrapports.php';   
    $pdo = PdoGsbRapports::getPdo();
    $nomMedicament = $data['nomMedicament'];
    $lesMedicaments = $pdo->getLesMedicaments($nomMedicament);
    echo json_encode( $lesMedicaments);
}
 else {
     echo 0;
}
?>

