angular.module('starter.controllers')
	
	
.controller('VisitDetailsListingCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicScrollDelegate) {

	$scope.$parent.$parent.$parent.app_page_title = 'Visit Details Listing';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showTodayTaskIcon = true;
	$scope.$parent.$parent.$parent.showLogo = '';
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
	
try {
Utils.showPleaseWait(pleaseWait);
			database.getVisitDetailsData(function(result) {		
				
				var applicationAccess = result.rows.item(0);
				
					$scope.totalRecords = angular.fromJson(applicationAccess.Data);
					//console.log($scope.totalRecords)
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
for(var i=0; i<$scope.totalRecords.length; i++){
	for(j=0; j<$scope.totalRecords[i].length;j++){
		if($scope.totalRecords[i][j].field_name == 'u_due_date' && $scope.totalRecords[i][j].field_value==todayDate){
			$scope.pendingListItems.push($scope.totalRecords[i])
			break;
		}		
	}
}
$scope.totalRecords = $scope.pendingListItems;
$ionicScrollDelegate.scrollTop();
Utils.hidePleaseWait();
}


setTimeout(function() {
			$scope.allRecords();
				// If city record could not load
			}, 300);


/*$scope.isInvalid = function(data){
 var className = '';
 var a;
 var b;
 var c;
for(var i=0; i<data.length;i++){
	if(data[i].field_name == 'u_esc1' && data[i].field_value == 'false'){
		a = true;
	} else if(data[i].field_name == 'u_esc2' && data[i].field_value == 'false'){
		b = true
	} else if(data[i].field_name == 'u_esc3' && data[i].field_value == 'false'){
		c = true
	} else {
	}
	}
	if(a == true){
		className = 'yellow';
		return className; 
	}
	

}*/


})
