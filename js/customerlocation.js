angular.module('starter.controllers')
	
	
.controller('CustomerLocationCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicScrollDelegate,NgMap) {

	$scope.$parent.$parent.$parent.app_page_title = 'Customer Location';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$scope.$parent.$parent.$parent.showTodayTaskIcon = false;
	$scope.totalRecords = '';
	$scope.noTicketFlag = false;
	
	$localstorage.setWithOutEncryption('CUST-SYS-ID', '');
	$localstorage.setWithOutEncryption('PARTIAL_TICKET_DATA','');
	
$scope.backToTicketsListing = function() {
		if ($scope.openTicketCheckPhone()) {
			$state.go('eventmenu.myopenticketphone');
		} else {
			$state.go('eventmenu.home');
		}
	};

$scope.mapSource  = $localstorage.getWithOutEncryption('USER-LOCATION');
$scope.mapDestination  = $localstorage.getWithOutEncryption('CUST-LOCATION');
console.log($scope.mapDestination)
//$scope.mapSource = '28.5870718,77.31311269999999';
//$scope.mapDestination = '28.612912,77.22951';


})
