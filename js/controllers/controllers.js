/*-------------------------Connexion------------------------*/
app.controller('connexionController',function($scope,$location,$http ){
     
     $scope.lblLogin = "Login";
     $scope.lblMdp = "Mot de passe";
     $scope.lblBtn = "Valider";
     $scope.lblMessage = "erreur de login ou de mot de passe";
     $scope.msgErreur = false;
     $scope.valider = function(){
         var login = $scope.login;
         var mdp = $scope.mdp;
         var req = {
            method: 'POST',
            url: 'ajax/traiterconnexion.php',
            data: { login : login, mdp : mdp}
        };
      
        $http(req)
            .then(function (response) {
                var visiteur = response.data;
                if(visiteur.nom == undefined){
                    
                      $scope.msgErreur = true;
                }
                else{
                     $scope.msgErreur = false;
                     $location.url("accueil");
                }
            });
     };
});

/*-----------------------Accueil------------------------------*/

app.controller('accueilController',function($scope){
    $scope.titre = "Gestion des rapports de visite";
    $scope.btnVisible = false;
    $scope.isCollapsed = true;
   
});
/*-----------------------Medecins------------------------------*/

app.controller('medecinsController',function($scope,$http, $rootScope){
    $scope.titre = "Gestion des médecins";
    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.srcMenu = "vues/menuMedecins.html";
    $scope.menu = function(){
                        $scope.isCollapsed = !$scope.isCollapsed;
                  };
    $scope.rechercheMedecin ={};           
    $scope.chargerMedecins = function(){
    var nomMedecin = $scope.rechercheMedecin.nom;
    if(nomMedecin.length >1){
            var req = {
                    method: 'POST',
                    url: 'ajax/traiterrecherchemedecins.php',
                    data: { nomMedecin : nomMedecin}
                    };
                $http(req)
                    .then(function (response) {
                        var lesMedecins = response.data;
                        $scope.medecins = lesMedecins;
                    });
            }    
        };
   
    $scope.choisirMedecin = function(medecin){
            $scope.rechercheMedecin.nom = medecin.nom + " "+medecin.prenom;
            $scope.medecins ={};// vide la liste;
            $rootScope.medecin = medecin; //enregistrement pour communiquer avec un autre contrôleur
                   
        } ;
});

/*-----------------------------------Controleur MajMedecin--------------------------------*/
app.controller('majMedecinController',function($scope, $http,$location){
    if($scope.medecin== undefined)
         $location.url("medecins");
     else{
        $scope.srcMenu = "vues/menuMedecins.html";
        $scope.btnVisible = true;
        $scope.titre = "Mise à jour";
        $scope.isCollapsed = true;
        $scope.menu = function(){
                        $scope.isCollapsed = !$scope.isCollapsed;
                  };
        $scope.lblAdresse = "Adresse";
        $scope.lblTel = "Téléphone";
        $scope.lblSpecialite = "Spécialité complémentaire ";
        $scope.lblEnvoyer = "Mettre à jour";
        var medecin = $scope.medecin; // héritage du rootScope
        $scope.m = {};
        $scope.m.adresse = medecin.adresse;
        $scope.m.tel = medecin.tel;
        $scope.m.specialite = medecin.specialitecomplementaire;
        $scope.valider  = function(){
              var req = {
                method: 'POST',
                url: 'ajax/traitermajmedecin.php',
                data: { 
                    id : $scope.medecin.id,
                    adresse : $scope.m.adresse,
                    tel : $scope.m.tel,
                    specialite : $scope.m.specialite
                    }
                };
          $http(req)
                .then(function (response) {
                    var message ="";
                    if(response.data==1){
                        message = "Médecin mis à jour";
                        $scope.typeMessage = "alert alert-success";
                    }
                    else{
                        message = "Veuillez réessayer plus tard..."; 
                        $scope.typeMessage = "alert alert-danger";
                    }
                   $scope.message = message;
                     });
                     

          };
     }
 });
 
 /*---------------------------------Controleur DerniersRapports---------------------*/
app.controller('derniersRapportsController',function($scope, $http,$location){
     if($scope.medecin== undefined)
         $location.url("medecins");
     else{
       $scope.srcMenu = "vues/menuMedecins.html";
       $scope.btnVisible = true;
       $scope.titre = "Les derniers rapports";
       $scope.isCollapsed = true;
       $scope.menu = function(){
                        $scope.isCollapsed = !$scope.isCollapsed;
                  };
        var req = {
            method: 'POST',
            url: 'ajax/traitergetlesrapports.php',
            data: { idMedecin : $scope.medecin.id}
        };
        $http(req)
            .then(function (response) {
                var lesRapports = response.data;
                if(lesRapports.length == 0){
                   $scope.message = "désolé, pas de rapport pour ce médecin..."
                   $scope.typeMessage = "alert alert-success";
               }
                else{
                   $scope.rapports = lesRapports;
                }
                    
            });
     }
 });
 
/*-----------------------Rapports------------------------------*/
app.controller('rapportsController',function($scope){
    $scope.titre = "Gestion des rapports";
    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.srcMenu = "vues/menuRapports.html";
    $scope.menu = function(){
                        $scope.isCollapsed = !$scope.isCollapsed;
                  };
  
});
/*-----------------------------------Controleur ChoisirRapport----------------------------------*/

app.controller('choisirRapportController',function($scope, $http){
     $scope.btnVisible = true;
     $scope.titre = "Choisir le rapport à modifier";
     $scope.srcMenu = "vues/menuRapports.html";
     $scope.lblDateRapport = "Sélectionner la date du rapport recherché";
     $scope.isCollapsed = true;
     $scope.menu = function(){
                        $scope.isCollapsed = !$scope.isCollapsed;
                  };
                  
//     $scope.changementDate = function(){
//         $scope.rapports = [
//                            {id:12,nomMedecin:"durand",prenomMedecin:"jean"},
//                            {id:13,nomMedecin:"dupond",prenomMedecin:"Anne"}
//                            ];
//     };
     

    $scope.changementDate = function(){
        $scope.message  ="";
        var dateRapport = $scope.dateRapport;
        var jour = dateRapport.getDate();
        var mois = dateRapport.getMonth() + 1 ;
        var annee = dateRapport.getFullYear();
        var date = annee+'-'+mois+'-'+jour;
        var req = {
                    method: 'POST',
                    url: 'ajax/traiterlesvisitesaunedate.php',
                    data: { dateRapport : date}
                  };

        $http(req)
            .then(function (response) {
                var lesRapports = response.data;
                if(lesRapports.length == 0)
                   $scope.message = "désolé, pas de rapport ce jour..."
                else{
                   $scope.rapports = lesRapports;
                }
            });
     };   
      
});
/*--------------------------------------- MajRapport-----------------------------*/

app.controller('majRapportController',function($scope,$location,$http){
    
      $scope.btnVisible = true;
      $scope.isCollapsed = true;
      $scope.titre = "Mise à jour du rapport";
      $scope.lblMotif = "Motif :";
      $scope.lblBilan = "Bilan :";
      $scope.lblEnvoyer = "Envoyer";
      $scope.srcMenu = "vues/menuRapports.html";
       $scope.menu = function(){
                        $scope.isCollapsed = !$scope.isCollapsed;
                  };
      var id = $location.search().id;
      $scope.nomMedecin = $location.search().nom;
      $scope.prenomMedecin = $location.search().prenom;
      var req = {
            method: 'POST',
            url: 'ajax/traiterchoixrapport.php',
            data: { id : id}
            };
      $http(req)
            .then(function (response) {
                var leRapport = response.data;
                var motif = leRapport.motif;
                var bilan = leRapport.bilan;
                $scope.bilan = bilan;
                $scope.motif = motif;
            });
     
      $scope.valider  = function(){
          var req = {
            method: 'POST',
            url: 'ajax/traitermajrapport.php',
            data: { 
                id : id,
                bilan : $scope.bilan,
                motif : $scope.motif
                }
            };
      $http(req)
            .then(function (response) {
                if(response.data==1)
                    alert("Rapport mis à jour");
                else
                    alert("Veuillez réessayer plus tard...");
                 });
      
      };
 });
 //-----------------------------------------Nouveau rapport-------------------------------------------//
 app.controller('nouveauRapportController',function($scope, $http,$rootScope){
	 
    $scope.titre = "Ajout d'un rapport"; //Met le titre
    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.srcMenu = "vues/menuRapports.html";
    $scope.lblMotif = "Motif de la visite"; //Met le label du Motif dans nouveauRapport.html (identique pour ceux dessous)
    $scope.lblBilan = "Bilan de la visite";
    $scope.lblTitreMedicament= "Médicaments offerts";
    $scope.lblEnvoyer="Enregistrer le rapport";
    $scope.lblQte ="Nombre d'exemplaires";
    $scope.lblDate ="Date de la visite";
    $scope.lblAjouterMedicament = "Ajouter";
    $scope.lblRetirerMedicament = "Retirer";
    $scope.r = {};
   // propriétés à valoriser
   
    
    $scope.rechercheMedecin={};              
    $scope.chargerMedecins = function(){
           
		    var nomMedecin = $scope.rechercheMedecin.nom; //Recupere le nom du medecin
            console.log($scope); //affiche dans la console
            if(nomMedecin.length >1){ //Si ya un medecin
                var req = {
                    method: 'POST',
                    url: 'ajax/traiterrecherchemedecins.php', //Envoi avec la méthode POST le nom du medecin
                    data: { nomMedecin : nomMedecin}
                    };
                $http(req)
                    .then(function (response) {
                        var lesMedecins = response.data; // On stock dans la variable lesMedecins la réponse de la requete
                        $scope.medecins = lesMedecins; //On affiche cette réponse
                    });
            } 
           // code à écrire
           
           
        };
   
    $scope.choisirMedecin = function(medecin){
            // Code à écrire
			$scope.rechercheMedecin.nom = medecin.nom + " "+medecin.prenom; //Indique le nom et le prenom du médecin
            $scope.medecins ={};// vide la liste;
            $rootScope.medecin = medecin; //enregistrement pour communiquer avec un autre contrôleur
            $scope.appelTel = "tel:" + medecin.tel;
            } ;
       // Sélection des medicaments
    $scope.rechercheMedicament={};
    $scope.chargerMedicaments = function(){
            // code à écrire
			 var nomMedicament = $scope.rechercheMedicament.nom; //Stock dans une variable le nom du médicament recherché
            if(nomMedicament.length > 0){ //Si un médicament a été renseigné alors
                var req = {
                    method: 'POST',
                    url: 'ajax/traiterrecherchemedicaments.php', //On envoi le nom de ce médicament via la méthode POST
                    data: { nomMedicament : nomMedicament}
                    };
                $http(req)
                    .then(function (response) {
                        var lesMedicaments = response.data; //On stock dans la variable lesMedicaments la réponse de la requete
                        $scope.medicaments = lesMedicaments; //On affiche cette réponse
                    });
            }   
        };
    $scope.choisirMedicament = function(data){
            
            // code à écrire
			  $scope.medicament = data;
            $scope.rechercheMedicament.nom = $scope.medicament.nomCommercial;
            $scope.medicaments ={};// vide la liste;
            
        } ;
    $scope.qtes = ["1","2","3","4","5","6"];
    $scope.medicamentsSelect = [];
    $scope.data={};
    $scope.ajouter = function(){
        if($scope.rechercheMedicament.nom != undefined &&
                $scope.data.qteSelect != undefined    ){
                $scope.medicamentsSelect.push({
                        nom:$scope.rechercheMedicament.nom,
                        qte:$scope.data.qteSelect,
                        idMedicament : $scope.medicament.id
                        });
                $scope.rechercheMedicament.nom = undefined; 
                $scope.data.qteSelect = undefined;
                }
         };
    $scope.retirer = function(){
        if($scope.medicamentsSelect.length>0)
                $scope.medicamentsSelect.pop();
    };
    $scope.enregistrer = function(){
             // code à écrire 
			 
			 console.log($scope.r);
              var dateRapport = $scope.r.date; //On récupere la date du rapport
              var jour = dateRapport.getDate(); //On récupere le jour de la date du rapport
              var mois = dateRapport.getMonth() + 1 ; //On récupere le moi de la date du rapport
              var annee = dateRapport.getFullYear(); //On récupere l'année de la date du rapport
              var date = annee+'-'+mois+'-'+jour; //On change le format de la date 
              var req = {
                    method: 'POST',
                    url: 'ajax/traiterajouterrapport.php', //On envoi le motif, le bilan et la date via la méthode POST
                    data: { 
                        idMedecin : $scope.medecin.id,
                         motif : $scope.r.motif,
                         bilan : $scope.r.bilan,
                         date : date,
                        lesMedicaments : $scope.medicamentsSelect
                         }
                    };
                $http(req)
                    .then(function (response) {
                           var message ="";
                            if(response.data==1){
                                message = "Rapport enregistré"; //On stock dans une variable le message positif
                                $scope.typeMessage = "alert alert-success";
                            }
                            else{
                                message = "Veuillez réessayer plus tard..."; //On stock dans une variable le message d'erreur
                                $scope.typeMessage = "alert alert-danger";
                            }
                           $scope.message = message; //On affiche le message
                   
                    
                    
                    });
            
        };
        
});

