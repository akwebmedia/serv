angular.module('starter.controllers').run(function($rootScope, $window, $location, $document, $parse, $timeout, $http, $templateCache, $state, $ionicPlatform, $ionicNavBarDelegate, database, $localstorage) {
								  
		
	})
	
	
.controller('SplashCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices) {
$rootScope.setupHttpAuthHeader();
$scope.retries = 0;
	$scope.totalNoRetries = 1;

$scope.updateSplashMessage = function(msg) {
		try {
			$timeout(function() {
				$scope.splashmessage = msg;
				$scope.$apply();
			});
		} catch(e) {
		}
	};

$scope.fetchAppDetails = function(){
					var base = $localstorage.getWithOutEncryption('INSTANCE_DETAILS');					
					$rootScope.baseAppURL = base;
					if(!$scope.$$phase) {
  						$scope.$apply();
					}					
Utils.showPleaseWait(pleaseWait);
	// App Info
			var promise = applicationServices.getAppInfo();
				promise.then(function(payload) {
					if (payload) {
						if (payload && payload.status == 200 && payload.data && payload.data.result && payload.data.result.length > 0) {
							database.deleteAppDetails(function() {
								database.storeAppDetails(payload.data.result, function(data) {	
                                                            
									Utils.hidePleaseWait();
									//console.log(payload.data.result);
									//$rootScope.saveAppInfo(payload.data.result);
									
									for(var j=0; j<payload.data.result.length; j++){
											if(payload.data.result[j].u_name == 'com.snow.inm.company_name'){
												$localstorage.setWithOutEncryption('AppCompName', payload.data.result[j].u_description);										
											} else if(payload.data.result[j].u_name == 'com.snow.inm.func_uid'){
												$localstorage.setWithOutEncryption('FunctionUserId', payload.data.result[j].u_description);
											} else if(payload.data.result[j].u_name == 'com.snow.inm.passcode_required'){
												$localstorage.setWithOutEncryption('isPasscodeReq', payload.data.result[j].u_active);
											} else if(payload.data.result[j].u_name == 'com.snow.inm.product_name'){
												$localstorage.setWithOutEncryption('AppProductName', payload.data.result[j].u_description);
											} else if(payload.data.result[j].u_name == 'com.snow.inm.comp_logo_sys_id'){
												$localstorage.setWithOutEncryption('AppLogo', payload.data.result[j].u_description);
											} else {
											
											}
		}
									
									if(desktopVersion){
										$scope.launchLoginScreen();
										} else {
											window.cookieEmperor.clearAll(
										function() {
										//alert('Cookies have been cleared');
										Utils.hidePleaseWait();
										$scope.launchLoginScreen();
										
										},
										function() {
											console.log('Cookies could not be cleared');
										});
										}
								});
							});
						}
					}
				}, function(errorPayload) {
					Utils.hidePleaseWait();
				});

}

/**
	 *Fetch the SSOId from service now after inappbrowser sets the coockie
	 */
	$scope.fetchUserDetails = function() {
	
		try {
			Utils.showPleaseWait(fetchingUserInfo);
			//$scope.updateSplashMessage(fetchingUserInfo);
			
			$timeout(function() {
				$.ajax({
					type : "GET",
					url : $rootScope.baseAppURL+'/api/inmpl/inm_mobile_application/login_user_info',
					xhrFields : {
						withCredentials : false
					},
					success : function(data, textStatus, request) {
						//console.log("----------------------------")
						//alert('success');
						//console.log(data);
						//console.log("----------------------------")
						//alert(data.result.login_user_id);
						//alert(data.result.isFuncUser);
						

						var ssoId = data.result.login_user_id;
						var sysId = data.result.login_user_sysID;
						//alert(ssoId+sysId);
						if (data) {
							if (data.result.isFuncUser == "true" && !desktopVersion) {								
								try {									
										Utils.hidePleaseWait();
										window.cookieEmperor.clearAll(
										function() {
										//alert('Cookies have been cleared');
										$state.go('splash', {}, {
													reload : true
										});
										},
										function() {
											alert('Cookies could not be cleared');
										});
									
								} catch(e) {
								}
							} else {
								$rootScope.dbpasscode = ssoId;
								$localstorage.set('SN-USER-NAME', ssoId);
								$localstorage.set('SN-USER-SYSID', sysId);		
								database.deleteUserInfo(ssoId, function() {
									database.storeUserInfo(ssoId, data.result, function(result) {												 																
										var passcodeReq = $localstorage.getWithOutEncryption('isPasscodeReq');
										var apppin = $localstorage.get('APP_PIN');
										Utils.hidePleaseWait();
										if(passcodeReq.toLowerCase() == 'true'){											
												if (apppin) {											
													$state.go('eventmenu.home');
												} else {
													$state.go('pinregister');
												}
										} else {
											$state.go('eventmenu.home');
										}
																	
																		});
																	});
							}
						}
					},
					error : function(xhr, msg) {
                                 //$scope.updateSplashMessage(unableFetchUserInfo);
                       Utils.hidePleaseWait();
                       $state.go('nonvaliduser');
						
					}
				});
			}, 500);
		} catch(e) {
			$scope.updateSplashMessage(unableFetchUserInfo);
			try {
				Utils.hidePleaseWait();
				ref.close();
				try {
					activityInfo.activityStop();
				} catch(e) {

				}
			} catch(e) {
			}

		}
	
	};




$scope.launchLoginScreen = function(){

if(desktopVersion){
	$scope.fetchUserDetails();
} else {
	setTimeout(function(){	
		var ref = cordova.InAppBrowser.open($rootScope.baseAppURL, '_blank', 'location=no,toolbar=no');								
		
		ref.addEventListener('loadstart', function(event) {
		
		try {
				navigator.notification.activityStart(pleaseWaitSp, loading);
			} catch(e) {
			}
		
		setTimeout(function(){ 
			window.cookieEmperor.getCookie($rootScope.baseAppURL, 'glide_session_store', function(data) {
							//alert('glide_session_store'+data.cookieValue);
							
							if(data.cookieValue){
								try {
									navigator.notification.activityStop();
								} catch(e) {
								}
								ref.close();
			 					$scope.fetchUserDetails();	
							}
			
			}, function(error) {
				//alert(error)
				//var n = error.search("Cookie not");
				//alert(n)
			  
			});			
								
		},500);			
			
		});

		ref.addEventListener('loadstop', function(event) {
			try {				
				navigator.notification.activityStop();				
			} catch(e) {
			}
			
			setTimeout(function(){ 
			window.cookieEmperor.getCookie($rootScope.baseAppURL, 'glide_session_store', function(data) {
							//alert('glide_session_store'+data.cookieValue);
							
							if(data.cookieValue){
								try {
										navigator.notification.activityStop();
									} catch(e) {
									}
								ref.close();
			 					$scope.fetchUserDetails();	
							}
			
			}, function(error) {
				//alert(error)
				//var n = error.search("Cookie not");
				//alert(n)
			  
			});			
								
				 }, 300);
			
		});

		ref.addEventListener('loaderror', function(event) {
			try {
				//$state.go('eventmenu.loaderrorlogin');
				navigator.notification.activityStop();
				ref.close();
			} catch(e) {
			}

		});

		ref.addEventListener('exit', function(event) {
			try {
				navigator.notification.activityStop();
			} catch(e) {
			}
		});
}, 200);

}

			
}





$scope.launchSplash = function(){
if ($rootScope.isOnline()) {

		//$scope.loginUser();
		var instance = $localstorage.getWithOutEncryption('INSTANCE_DETAILS');
		if (instance) { 
			
		$scope.fetchAppDetails();
		//$state.go('login');
		
		} else {	
	//$scope.fetchUserDetails();
		$state.go('instanceRegister');		
	} 
} else {	
	var apppin = $localstorage.get('APP_PIN')
		if (apppin) {
			$state.go('pinlogin');
		} else {
			$state.go('pinnotset');
		}
	} 
	
}

$scope.launchSplash();
var myVar = setInterval(function(){ 
try{
	
	if($rootScope.platformReady == 'true'){
		clearInterval(myVar);
		
	}
	} catch(e){
	
	}
}, 1000);


})
