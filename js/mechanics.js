var nbpCurrApp = angular.module("nbpCurrApp", []);

nbpCurrApp.controller("currDispCtrl", function ($scope, $http, $filter){
	$scope.readyMessage = "Working.";
	$scope.nbpJson = "";
	
	$scope.fromDate = $filter('date')(new Date(),'yyyy-MM-dd');
	$scope.toDate = $filter('date')(new Date(),'yyyy-MM-dd');

	$scope.getData = function () {

		angular.element(document.querySelector('#info')).addClass('bg-info');
		
		if ($scope.getUrl === undefined) {
			$scope.getUrl = ""
		} else {		
			$scope.getUrl = "http://api.nbp.pl/api/exchangerates/tables/a/"+$scope.fromDate+"/"+$scope.toDate+"/?format=json";
		}

		$scope.promise = $http({method: "GET", url:	$scope.getUrl, responseType: "json"});
		$scope.promise.then( function(data){
		$scope.nbpJson = data;
		});

		$scope.promise
			.then(
				function(response) { 
					$scope.nbpJson = response.data;
					angular.element(document.querySelector('#info')).removeClass('bg-danger bg-info');
					}, 
				function (error) {
					angular.element(document.querySelector('#info')).addClass('bg-danger');
				});

	};
	$scope.getData(); // init function on startup
});
