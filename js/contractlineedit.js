angular.module('starter.controllers')
	
	
.controller('ContractLineEditCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicPopup, $parse, $ionicScrollDelegate) {

	$scope.$parent.$parent.$parent.app_page_title = 'Contract Line';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$scope.$parent.$parent.$parent.showTodayTaskIcon = false;
	$rootScope.setupHttpAuthHeader();
	$scope.ticketform = {};
	$scope.ticketform.u_sre_latitude = '';
	$scope.ticketform.u_sre_longitude = ''
	$scope.show_section = {};
	$scope.records = ''

// Accordion Display
$scope.section_click = function(section, $event) {
		$scope[section] = !$scope[section];
		$ionicScrollDelegate.resize();
};

  
  
  
  

$scope.openTicketCheckPhone = function() {
		if ($('#openTicketCheckPhone').is(':hidden')) {
			return false;
		} else {
			return true;
		}
	};

$scope.backToTicketsListing = function() {
		if ($scope.openTicketCheckPhone()) {
			//$state.go('eventmenu.myopenticketphone');
			$state.go('eventmenu.home');
		} else {
			$state.go('eventmenu.home');
		}
	};



// Get the selected record from local storage
var selectedItem = $localstorage.get('SELECTED_ACCOUNT_Line');
	$scope.records = angular.fromJson(selectedItem);
	//console.log($scope.records)
	

 
$scope.openFirstAccordion = function(){
	 $timeout(function() {
	$scope.accordName = [];
			for(var i=0; i<1;i++){
				 if($scope.records[i].field_type == 'acc_start') {
					$scope.accordName.push($scope.records[i].field_tgtField);
				}
			}
			console.log($scope.accordName[0])	
			var modelNew = $parse($scope.accordName[0]);
			modelNew.assign($scope, true);
			$ionicScrollDelegate.resize();
			}, 400);
}




})