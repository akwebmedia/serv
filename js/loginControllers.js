angular.module('starter.controllers').run(function($rootScope, $window, $location, $document, $parse, $timeout, $http, $templateCache, $state, $ionicPlatform, $ionicNavBarDelegate, database, $localstorage) {							  
		
	})
	
.controller('LoginhCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $ionicPlatform, $window, database, Utils) {

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




	/*$ionicPlatform.registerBackButtonAction(function(event) {
		try {
		navigator.notification.confirm(wantToExit, function(button) {
		if (button == 2) {
		return;
		} else {
		try {
			window.cookieEmperor.clearAll(
										function() {
										//alert('Cookies have been cleared');
										navigator.app.exitApp();
										},
										function() {
											console.log('Cookies could not be cleared');
										});
			
		
		} catch(e) {
		navigator.app.exitApp();
		}
		}
		}, "Confirmation", "Yes,No");
		} catch(e) {
		}
		}, 100);
		ionic.Platform.isFullScreen = true;
*/

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
					url : $rootScope.baseAppURL+'/api/12618/inm_app_active_auth/login_user_info',
					xhrFields : {
						withCredentials : false
					},
					success : function(data, textStatus, request) {
						//console.log("----------------------------")
						//alert('success');
						console.log(data);
						//console.log("----------------------------")
						//alert(data.result.login_user_id);
						//alert(data.result.isFuncUser);
						

						
						if (data) {
							if (data.result.login_user_id == "guest" && !desktopVersion) {								
								try {									
										Utils.hidePleaseWait();
										window.cookieEmperor.clearAll(
										function() {
										//alert('Cookies have been cleared');
										$state.go('login', {}, {
													reload : true
										});
										},
										function() {
											alert('Cookies could not be cleared');
										});
									
								} catch(e) {
								}
							} else {						
								database.deleteUserInfo(function() {
									database.storeUserInfo(data, function(data) {													 																
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
								
								//$rootScope.dbpasscode = ssoId;
								//$localstorage.set('SN-LOGIN-SSO', ssoId);							
								
										
										
								
								
							}
						}
					},
					error : function(xhr, msg) {						
						if ($scope.retries < $scope.totalNoRetries) {
							$scope.retries++;
							$scope.fetchUserDetails();
						} else {
							var apppin = $localstorage.get('APP_PIN')
							if (apppin) {
								$state.go('pinlogin');
							} else {
								$scope.updateSplashMessage(unableFetchUserInfo);
							}
						}
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



$scope.$on('$ionicView.enter', function() {
if ($rootScope.isOnline()) {
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
								
				 },600);			
			
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
							 }, 300);

}
} else {
	var passcodeReq = $localstorage.getWithOutEncryption('isPasscodeReq');
	var apppin = $localstorage.get('APP_PIN');
	if(passcodeReq){		
		if (apppin) {
			$state.go('pinlogin');
		} else {
			$state.go('pinnotset');
		}
	} else {
		$state.go('offline');
	}
	}
										})
})