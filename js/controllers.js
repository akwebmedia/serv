angular.module('starter.controllers', [])
.run(function($rootScope, $window, $location, $document, $parse, $timeout, $http, $templateCache, $state, $ionicPlatform, $ionicHistory, $ionicNavBarDelegate, database, $localstorage, $interval) {
	$ionicPlatform.ready(function() {
		database.createDbAndTables();
		$rootScope.platformReady = 'true';
		$ionicPlatform.on("resume", function() {
											 
					if (navigator.connection.type == 'Connection.NONE' || navigator.connection.type == 'none') {
				try {
					$timeout(function() {
						$rootScope.$apply(function() {
							$rootScope.online = false;
							try {
								$rootScope.onofflineclass = 'offline-indicator';
							} catch(e) {
							}
						});
					}, 10, false);
				} catch(e) {
				}
			} else {
				try {
					$timeout(function() {
						$rootScope.$apply(function() {
							$rootScope.online = true;
							try {
								$rootScope.onofflineclass = 'online-indicator';
							} catch(e) {
							}
						});
					}, 10, false);
				} catch(e) {
				}
			}							 
		})
		
	}) // End of Resume
	
	var baseURL = $localstorage.getWithOutEncryption('INSTANCE_DETAILS');	
	if(baseURL){
		try {					
						$rootScope.$apply(function() {							
							try {
								$rootScope.baseAppURL = baseURL;
							} catch(e) {
							}
						});
					
				} catch(e) {
				}
		
	} else {
		$rootScope.baseAppURL = '';
	}
	
	$rootScope.isOnline = function() {
		try {
			if (desktopVersion) {
				//return false;
				return navigator.onLine;
			} else {
				if (navigator.connection.type == 'Connection.NONE' || navigator.connection.type == 'none') {
					return false;
				} else {
					return true;
				}
			}
		} catch(e) {
			return false;
		}
	};
	//
	

	 $interval(function() {
		var onSuccess = function(position) {
		var locationData = {};
		var sysId = $localstorage.get('SN-USER-SYSID');
 	 	//alert('position'+position.coords.latitude);
		//console.log(position.coords.latitude)
		locationData.user_latitude = position.coords.latitude;
		locationData.user_longitude = position.coords.longitude;
		locationData.user_sysID = sysId;
		$localstorage.setWithOutEncryption('USER-LOCATION', locationData.user_latitude+','+locationData.user_longitude);
		//$scope.uploadTicketProcess();
		
			$http({
			method : 'PUT',
			url : $rootScope.baseAppURL + '/api/inmpl/inm_mobile_application/put_latest_location',
			data : locationData,
			headers : {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
			},
		}).success(function(data, status, headers, config) {
			if(status == 200){
				//Utils.hidePleaseWait();
				//$scope.backToTicketsListing();
			}
			
			
		}).error(function(data, status, headers, config) {
			//Utils.showAlert(unableToUpload);
			//Utils.hidePleaseWait();
		});
		
		
		
   };
 
    // onError Callback receives a PositionError object 
    // 
    function onError(error) {
		
    }
	
	try{
		if ($rootScope.isOnline()) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
	} catch(e) {
		
	}			 
			
			
	}, 60000);
	
	
	
	$rootScope.logout = function() {	
		try {	
		if(desktopVersion){
			$state.go('splash');
			} else {
			navigator.notification.confirm(wantToLogout, function(button) {
				if (button == 2) {
					return;
				} else {
					try {
						
						if(desktopVersion){
										$state.go('splash');
										} else {
											window.cookieEmperor.clearAll(
										function() {
										//alert('Cookies have been cleared');
										$state.go('splash');
										},
										function() {
											console.log('Cookies could not be cleared');
										});
						}						
						
					} catch(e) {
					}
				}
			}, "Confirmation", "Yes,No");
										}
		
		
			
		} catch(e) {
		}
	};

$rootScope.online = $rootScope.isOnline();

	$rootScope.onBackPress = function() {
		history.back();
	};

/*	$ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
}, 100);*/
	$ionicPlatform.registerBackButtonAction(function (event) {
  if ($ionicHistory.currentStateName() == 'splash' || $ionicHistory.currentStateName() == 'eventmenu.home'){
    //event.preventDefault();
	try {
		navigator.notification.confirm(wantToExit, function(button) {
		if (button == 2) {
		return;
		} else {
		try {
		window.cookieEmperor.clearAll(function() {
		navigator.app.exitApp();
		});
		} catch(e) {
		navigator.app.exitApp();
		}
		}
		}, "Confirmation", "Yes,No");
		} catch(e) {
		}		
		ionic.Platform.isFullScreen = true;
  } else {
    $ionicHistory.goBack();
  }
}, 100);

	if (!$rootScope.dbpasscode) {
		$rootScope.dbpasscode = $localstorage.get('SN-USER-NAME');
	}
	$rootScope.setupHttpAuthHeader = function() {
		try {
			if (!$http.defaults.headers.common.Authorization) {
				//var ssOID = $localstorage.get('SN-LOGIN-SSO');
				$http.defaults.headers.common.Authorization = "Basic NTAyMzIzODY2OjUwMjMyMzg2NkAxMjM=";
				/*if (ssOID && ssOID.length > 0) {
					database.getUserInfo(ssOID, function(result) {
						if (result && result.rows && result.rows.length > 0) {
							var applicationAccess = result.rows.item(0);
							if (applicationAccess) {
								var applicationAccessJSON = angular.fromJson(Tea.decrypt(applicationAccess.UserInfo, $rootScope.dbpasscode));
								if (applicationAccessJSON) {
									if (applicationAccessJSON && applicationAccessJSON.functional_user && applicationAccessJSON.functional_user.length > 0) {
										$http.defaults.headers.common.Authorization = applicationAccessJSON.functional_user;
									}
								}
							}
						}
					});
				}*/
			}

			try {
				navigator.notification.activityStop();
			} catch(e) {
			}
		} catch(e) {
		}
	};
	


//var ssoid = $localstorage.get('SN-LOGIN-SSO')
	//if (ssoid) {
		
		
	//} // end if*/


 })

/**
 * Controller to Register PIN for Offline
 */.controller('pinregisterCtrl', function($scope, $ionicPopup, $timeout, $localstorage, $state, $rootScope) {	
	$scope.doRemoveError = function() {
		$scope.pinregwrong = '';
		$scope.pinregister = {};
	};
	$scope.doRegisterPin = function(pinregister) {
		
		if (pinregister && pinregister.enter && pinregister.enter.toString().length > 0) {
			if (pinregister && pinregister.reenter && pinregister.reenter.toString().length > 0) {
				if ((!isNaN(pinregister.enter)) && (!isNaN(pinregister.reenter))) {
					if (pinregister.enter.toString().length <= 4 && pinregister.reenter.toString().length <= 4 && pinregister.enter.toString().length == 4 && pinregister.reenter.toString().length == 4) {
						if (pinregister.reenter === pinregister.enter) {
							var ssoid = $localstorage.get('SN-USER-NAME')
							if (ssoid) {
								$localstorage.set('APP_PIN', ssoid + pinregister.enter);
								$state.go('eventmenu.home');
							}
							
						} else {
							$scope.pinregwrong = passcodeNotSame;
						}
					} else {
						$scope.pinregwrong = passcodeLength;
					}
				} else {
					$scope.pinregwrong = passcodeNumber;
				}
			} else {
				$scope.pinregwrong = reenterPasscode;
			}
		} else {
			$scope.pinregwrong = enterPasscode;
		}
	};
})

/**
 * Controller to PIN Login for Offline login
 */.controller('pinloginCtrl', function($scope, $timeout, $localstorage, $state, $rootScope) {
	$rootScope.setupHttpAuthHeader();
	$scope.loginWithPIN = function() {
		if ($scope.passcode.length > 0 && $scope.passcode.length <= 4) {
			$scope.pinwrong = "";
			if ($scope.passcode.length == 4) {
				var ssoId = $localstorage.get('SN-USER-NAME');
				$rootScope.dbpasscode = ssoId;
				var apppin = $localstorage.get('APP_PIN');
				if (ssoId) {
					if (apppin) {
						if (apppin === ssoId + $scope.passcode) {
							$state.go('eventmenu.home');
						} else {

							$scope.pinwrong = wrongPasscode;
							$scope.passcode = "";
						}
					} else {
						$state.go('pinnotset');
					}
				} else {
					$scope.pinwrong = passcodeNotSaved;
					$scope.passcode = "";
				}
			} else {
				$scope.pinwrong = enterFourDigitPasscode;
				$scope.passcode = "";
			}
		} else {
			$scope.pinwrong = emptyPasscode;
		}
	};

	$scope.init = function() {
		$scope.passcode = "";
		$scope.pinwrong = "";
	}
	
	
	
})