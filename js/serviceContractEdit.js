angular.module('starter.controllers')
	
	
.controller('ServiceContractEditCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicPopup, $parse, $ionicScrollDelegate) {

	$scope.$parent.$parent.$parent.app_page_title = 'Service Contract Header';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$scope.$parent.$parent.$parent.showTodayTaskIcon = false;
	$rootScope.setupHttpAuthHeader();
$scope.recordSys = '';


	$scope.show_section = {};
	

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
	//$scope.records = angular.fromJson(selectedItem);
	//console.log($scope.records)

var selectedCustInfo = $localstorage.getWithOutEncryption('CUST-SYS-ID');


$scope.fetchLineData = function(recordSys){

	console.log('sys ='+ $scope.recordSys)
	try {
	$scope.ServiceLineData = [];
		//Utils.showPleaseWait(pleaseWait);
		
			database.getServiceContractLineData(function(result) {		
				
				var applicationAccess = result.rows.item(0);
				
					var serviceLineAll = angular.fromJson(applicationAccess.Data);
					
					for(var i = 0; i<serviceLineAll.length; i++){
						for(var j = 0; j<serviceLineAll[i].length; j++){
							
							if(serviceLineAll[i][j].field_refID == recordSys){
							
          							 $scope.ServiceLineData.push(serviceLineAll[i]);
      							 
								
								//console.log($scope.ServiceLineData);
							}
							
						}
					}
					$scope.noTicketFlag = true;
			Utils.hidePleaseWait();
			});
		} catch(e) {
			Utils.hidePleaseWait();
		}

}


if(selectedCustInfo){
	
	try {
		//Utils.showPleaseWait(pleaseWait);
			database.getOneServiceContractHeaderData(selectedCustInfo, function(result) {		
																				console.log(result);
				if(result && result.rows.length>0){
					var applicationAccess = result.rows.item(0);				
					$scope.records = angular.fromJson(applicationAccess.Data);
					console.log($scope.records)					
						
					Utils.hidePleaseWait();
					
					for(var i=0; i<$scope.records.length; i++){
						if($scope.records[i].field_name == 'sys_id'){
							$scope.recordSys = $scope.records[i].field_value;							
							$scope.fetchLineData($scope.recordSys)
							$scope.openFirstAccordion();
							break; 
						}	
					
					}
					//$scope.openFirstAccordion();
				} else {
					Utils.showAlert("Contract record not found");		
						history.back();
				}
			});
		} catch(e) {
			Utils.hidePleaseWait();
		}
} else {
	$scope.records = angular.fromJson(selectedItem);
	for(var i=0; i<$scope.records.length; i++){
						if($scope.records[i].field_name == 'sys_id'){
							$scope.recordSys = $scope.records[i].field_value;							
							$scope.fetchLineData($scope.recordSys)
							break; 
						}	
					
	}
}



// Create Contract Line data based on header sys id


//console.log('sys ='+ recordSys)



 
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


$scope.showDetails = function(data){
		$localstorage.set('SELECTED_ACCOUNT_Line', angular.toJson(data));		
		$state.go('eventmenu.contractlineedit');	
}






})