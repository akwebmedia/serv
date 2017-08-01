angular.module('starter.controllers')
	
	
.controller('CreateNewWoCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices) {

	$scope.$parent.$parent.$parent.app_page_title = 'Create New Ticket';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
$rootScope.setupHttpAuthHeader();
$scope.ticketform = {};

$scope.backToTicketsListing = function() {
		if ($scope.openTicketCheckPhone()) {
			$state.go('eventmenu.myopenticketphone');
		} else {
			$state.go('eventmenu.home');
		}
	};

$scope.ticketCancel = function() {
		$scope.ticketform = {};
		$rootScope.onBackPress();
	};

$scope.uploadTicketProcess = function(){
	var ssoid = $localstorage.get('SN-USER-NAME');
		if (ssoid) {
			var d = new Date();
			var n = d.getTime();
			$scope.ticketform.ticketId = "" + n;
			$scope.ticketform.savedTS = "" + n;
			$scope.ticketform.opened_by = "abdulla";
			
			if ($rootScope.isOnline()) {
			
				//$scope.uploadTicket();

			} else {			
				//Save it locally for future upload process
				database.storePendingTicket($scope.ticketform.ticketId, ssoid, "NEW_WORK_ORDER", $scope.ticketform.savedTS, $scope.ticketform, function(status) {
					
					$scope.ticketform = {};
					$scope.backToTicketsListing();
				});
			}
		}
			
}
	/**
	 *Upload ticket to server in online mode
	 */
	$scope.uploadTicket = function() {
	Utils.showPleaseWait(uploadingTicket);
		$scope.ticketform.u_status = "Closed";
		$http({
			method : 'POST',
			url : $rootScope.baserootURL + 'api/now/import/u_true_sense_process_stage?sysparm_input_display_value=false',
			data : $scope.ticketform,
			headers : {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
			},
		}).success(function(data, status, headers, config) {
			if (data && data.result && data.result[0] && data.result[0].display_value && data.result[0].display_value.length > 0 && data.result[0].display_value) {
				Utils.showAlert("Ticket #" + data.result[0].display_value + createdSuccess);
				Utils.hidePleaseWait();
				$scope.backToTicketsListing();
			}
		}).error(function(data, status, headers, config) {
			Utils.showAlert(unableToUpload);
			Utils.hidePleaseWait();
		});
	};

$scope.ticketSubmit = function(){

var savedItems = $scope.ticketform;
		//console.log($scope.ticketform);		

		if (savedItems) {
			if (!(savedItems.u_priority && savedItems.u_priority.length > 0)) {
				Utils.showAlert(priorityEmpty);
			} else if (!(savedItems.u_status && savedItems.u_status.length > 0)) {
				Utils.showAlert(statusEmpty);
			} else {
				$scope.uploadTicketProcess(savedItems);
			}
		}
		

}


})
