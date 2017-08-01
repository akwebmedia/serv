angular.module('starter.controllers')
	
	
.controller('ServiceContractEditCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicPopup, $parse, $ionicScrollDelegate) {

	$scope.$parent.$parent.$parent.app_page_title = 'Service Contract Header';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$scope.$parent.$parent.$parent.showTodayTaskIcon = false;
	$rootScope.setupHttpAuthHeader();
	$scope.records = '';
	$scope.ServiceLineData = '';

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
var selectedItem = $localstorage.get('SELECTED_ACCOUNT');
	$scope.records = angular.fromJson(selectedItem);
	console.log($scope.records)
 



// Create Contract Line data based on header sys id

for(var i=0; i<$scope.records.length; i++){
	if($scope.records[i].field_name == 'sys_id'){
		var recordSys = $scope.records[i].field_value;
		break; 
	}	

}

console.log('sys ='+ recordSys)

if(recordSys){
	//console.log(selectedCustInfo);
	try {
		//Utils.showPleaseWait(pleaseWait);
			database.getParticularServiceLineData(recordSys, function(result) {				
				
				if(result && result.rows.length>0){
					var applicationAccess = result.rows.item(0);				
					$scope.ServiceLineData = angular.fromJson(applicationAccess.Data);
					console.log($scope.ServiceLineData)					
						
					Utils.hidePleaseWait();
					//$scope.openFirstAccordion();
				
				} else {
					//Utils.showAlert("Customer record not found");		
						//history.back();
				}
			});
		} catch(e) {
			Utils.hidePleaseWait();
		}
} else {
	//$scope.records = angular.fromJson(selectedItem);
}

				



 
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