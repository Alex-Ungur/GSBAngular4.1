var app = angular.module("gsbRapports",['ngRoute','ui.bootstrap.collapse','ngAnimate']);

app.config(function($routeProvider){
    $routeProvider
            .when('/',{
                templateUrl :'vues/connexion.html',
                controller :'connexionController'
            })
            .when('/accueil',{
                templateUrl :'vues/accueil.html',
                controller :'accueilController'
            })
             .when('/medecins',{
                templateUrl :'vues/medecins.html',
                controller :'medecinsController'
            })
            .when('/rapports',{
                templateUrl :'vues/rapports.html',
                controller :'rapportsController'
            })
             .when('/choisirrapport',{
                templateUrl :'vues/choisirRapport.html',
                controller :'choisirRapportController'
                
            })
            .when('/majrapport',{
                templateUrl :'vues/majRapport.html',
                controller :'majRapportController'
                
            })
             .when('/majmedecin',{
                templateUrl :'vues/majMedecin.html',
                controller :'majMedecinController'
            })
              .when('/derniersrapports',{
                templateUrl :'vues/derniersRapports.html',
                controller :'derniersRapportsController'
            })
            .when('/nouveaurapport',{
                templateUrl :'vues/nouveauRapport.html',
                controller :'nouveauRapportController'
            })
            .otherwise({redirectTo: '/'});
});


