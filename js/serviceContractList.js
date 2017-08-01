angular.module('starter.controllers')
	
	
.controller('ServiceContractListCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicScrollDelegate) {

	$scope.$parent.$parent.$parent.app_page_title = 'Service Contract Header';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$scope.$parent.$parent.$parent.showTodayTaskIcon = false;

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

$scope.showDetails = function(data){
		$localstorage.set('SELECTED_ACCOUNT', angular.toJson(data));		
		$state.go('eventmenu.servicecontractedit');
	
}



try {
Utils.showPleaseWait(pleaseWait);
			database.getServiceContractHeaderData(function(result) {
				
				$scope.totalRecords = [];
				if (result && result.rows.length > 0) {
					try {
						
						for (var i = 0; i < result.rows.length; i++) {
							//console.log(angular.fromJson(result.rows.item(i).Data))
							var applicationAccess = result.rows.item(i);
							$scope.totalRecords.push(angular.fromJson(applicationAccess.Data));
						}
					} catch(e) {
					}
					//Utils.hidePleaseWait();
		}				
						
			$scope.noTicketFlag = true;			
			Utils.hidePleaseWait();
			});
		} catch(e) {
			Utils.hidePleaseWait();
		}



})
