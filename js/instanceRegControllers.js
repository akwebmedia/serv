angular.module('starter.controllers').controller('InstanceRegisterCtrl', function($scope, $rootScope, $state, $localstorage, $window, $http, database, Utils, applicationServices) {
$rootScope.setupHttpAuthHeader();
$scope.apiStatus = 'none';
$scope.passcode = 'https://averyindiadev.service-now.com'

$scope.instanceSubmit = function(){	
if($scope.passcode && $scope.passcode.length > 0){	
		Utils.showPleaseWait(pleaseWait);
                                                 setTimeout(function(){
                                                            
                                                            if($scope.apiStatus = 'none'){
                                                            $scope.errorMsg = instanceInvalidMsg;
                                                            Utils.hidePleaseWait();
                                                            }
                                                            
                                                            },10000);
                                                 
		$http.get($scope.passcode+'/api/inmpl/inm_mobile_application/inm_app_active_auth').success(function(data, status, headers, config) {
			
                                                                                                    
                                                                                                       
		/*	if(status > 250 && status < 450)
			{
						$scope.errorMsg = instanceInvalidMsg;
						Utils.hidePleaseWait();
						$scope.apiStatus = 'failed'
			}*/
			
			
			
			
			if (data && status == 200 && data.result) {
					if(data.result.isAppActive.toLowerCase() == 'true'){
					$scope.errorMsg = '';
					$scope.apiStatus = 'success';
					//$scope.closedData = data.result;
					//console.log(data);
					var baseURL = $scope.passcode;
					$localstorage.setWithOutEncryption('INSTANCE_DETAILS', baseURL);
					$rootScope.baseAppURL = baseURL;
					if(!$scope.$$phase) {
  						$scope.$apply();
					}
					
					Utils.hidePleaseWait();					
					$state.go('splash');
					//$scope.fetchuserdetails();
					} else {
						$scope.errorMsg = instanceInvalidMsg;
						$scope.apiStatus = 'failed';
						Utils.hidePleaseWait();
					}
					
					
				
			} else {
				$scope.errorMsg = instanceInvalidMsg;
				$scope.apiStatus = 'failed';
				Utils.hidePleaseWait();
			}
		}).error(function(data, status, headers, config) {
			//console.log(data.error.message)
				//Utils.showAlert(unableToCheck);
				$scope.apiStatus = 'failed';
				Utils.hidePleaseWait();
				$scope.errorMsg = instanceInvalidMsg;
			
		});


} else {
	Utils.showAlert(instanceNameBlank);
}

//

}

})