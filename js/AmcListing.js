angular.module('starter.controllers')
	
	
.controller('AmcListingCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicScrollDelegate) {

	$scope.$parent.$parent.$parent.app_page_title = 'AMC Listing';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$scope.$parent.$parent.$parent.showTodayTaskIcon = true;
	$scope.totalRecords = '';
	$rootScope.setupHttpAuthHeader();
	$scope.ticketform = {};
	$scope.noTicketFlag = false;

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
		$localstorage.set('SELECTED_ACCOUNT_MODE', 'amc');
		$state.go('eventmenu.visitdetailsedit');	
}



try {
			var ssoid = $localstorage.get('SN-USER-NAME')
			database.getPendingTickets(ssoid, function(result) {
				
				$scope.pendingVDItems = [];
				

				//console.log(result)
				if (result && result.rows && result.rows.length > 0) {
					for (var i = result.rows.length - 1; i >= 0; i--) {
						var tktData = angular.fromJson(Tea.decrypt(result.rows.item(i).TicketInfo, $rootScope.dbpasscode));
						tktData.Type = result.rows.item(i).Type;
						
						if (result.rows.item(i).UserId == ssoid && result.rows.item(i).Type == 'VISIT_DETAILS_EDIT') {
							$scope.pendingVDItems.push(tktData);
							console.log($scope.pendingVDItems)
						}
						

					}					

				} else {
					setTimeout(function() {
						$scope.pendingVDItems = [];
						//$scope.pendingSPItems = [];
						//$scope.pendingODRSPItems = [];
						//$scope.$apply();
						//this triggers a $digest
					}, 1000);
				}
			});
		} catch(e) {
		}




$scope.allRecords = function(){
	$scope.amcRecords = [];
try {
Utils.showPleaseWait(pleaseWait);
			database.getVisitDetailsData(function(result) {
				
				
				var applicationAccess = result.rows.item(0);
				
					$scope.totalRecords = angular.fromJson(applicationAccess.Data);
					console.log($scope.totalRecords)
					for(var i=0; i<$scope.totalRecords.length; i++){
						for(j=0; j<$scope.totalRecords[i].length;j++){
							if($scope.totalRecords[i][j].field_name == 'u_activity_type'){
								if($scope.totalRecords[i][j].field_refID == '42d1d6524fd3ba00def782818110c723' ||$scope.totalRecords[i][j].field_refID == '68b156524fd3ba00def782818110c700'){
								$scope.amcRecords.push($scope.totalRecords[i])							
							}	
							}	
							
						}
					}
						console.log($scope.amcRecords)				
						
						
			$scope.noTicketFlag = true;		
			Utils.hidePleaseWait();
			});
		} catch(e) {
			Utils.hidePleaseWait();
		}

}

$scope.filterAllActivity = function(){
$scope.allRecords();
}




$scope.filterTodayActivity = function(){
	Utils.showPleaseWait(pleaseWait);
	var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
var todayDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0,10);
	
	//alert(todayDate)
$scope.pendingListItems = [];
for(var i=0; i<$scope.amcRecords.length; i++){
	for(j=0; j<$scope.amcRecords[i].length;j++){
		if($scope.amcRecords[i][j].field_name == 'u_due_date' && $scope.amcRecords[i][j].field_value==todayDate){
			$scope.pendingListItems.push($scope.amcRecords[i])
			break;
		}		
	}
}
$scope.amcRecords = $scope.pendingListItems;
$ionicScrollDelegate.scrollTop();
Utils.hidePleaseWait();
}


setTimeout(function() {
			$scope.allRecords();
				// If city record could not load
			}, 300);

})
