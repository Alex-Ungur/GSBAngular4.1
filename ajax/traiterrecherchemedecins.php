<?php
require_once '../data/pdogsbrapports.php';
$data = json_decode(file_get_contents('php://input'),true);
$nom = $data['nomMedecin'];
$pdo = PdoGsbRapports::getPdo();
$lesMedecins = $pdo->getLesMedecins($nom);
echo json_encode( $lesMedecins);
?>

