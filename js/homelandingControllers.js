/**
 *Controller for home landing page
 */
angular.module('starter.controllers')

.controller('HomeLandingCtrl', function($scope, $rootScope, Utils, database, $state, $localstorage, $timeout, $window, $http, applicationServices, pendingTicketUploadProcess, $ionicPopup) {
$scope.$parent.$parent.$parent.showBackButton = '';
	$scope.$parent.$parent.$parent.showLogo = 'showlogo';
	$scope.$parent.$parent.$parent.app_page_title = '';
	$rootScope.AppLogoImage = $localstorage.getWithOutEncryption('AppLogo');
	//console.log($rootScope.AppLogoImage);
	$rootScope.setupHttpAuthHeader();
	try {
		if (!Utils.isPhoneView()) {
			//$scope.$parent.$parent.$parent.app_page_title_subtitle = myOpenTicketTitle;
		} else {
			$scope.$parent.$parent.$parent.app_page_title_subtitle = '';
		}
	} catch(e) {
	}

	angular.element($window).bind('resize', function() {
		try {
			if (!Utils.isPhoneView()) {
				$scope.$parent.$parent.$parent.app_page_title_subtitle = myOpenTicketTitle;
			} else {
				$scope.$parent.$parent.$parent.app_page_title_subtitle = '';
			}
			$scope.$apply();
		} catch(e) {
		}
	});


	
	if ($rootScope.isOnline()) {
		$rootScope.onofflineclass = 'online-indicator';
	} else {
		$rootScope.onofflineclass = 'offline-indicator';
	}
	
	// Geolocation
	// Position
	var onSuccess = function(position) {
		console.log(position.coords.latitude)
   };
 
    // onError Callback receives a PositionError object 
    // 
    function onError(error) {  }
	
	try{
		//$interval(function() {
    		navigator.geolocation.getCurrentPosition(onSuccess, onError);
		//}, 1000);

	} catch(e) {		
	}
	
	

try {
cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
   // console.log("GPS is "+(enabled ? "enabled" : "disabled");   
	if(enabled){
		var onSuccess = function(position) {
		console.log(position.coords.latitude);
   };
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}
	if(!enabled){
		
		
		var confirmPopup = $ionicPopup.confirm({
     title: 'Looks like, GPS location is not on in your device, please enable the location',
     template: ''
   });

   confirmPopup.then(function(res) {
     if(res) {
	    cordova.plugins.diagnostic.switchToLocationSettings();      
     } else {
       console.log('You are not sure');
     }
   });
		
		
       
    }
},function(error){
    console.error("An error occurred: "+ error);
});
} catch(e){
}

// Visit Details Data fetch from server
			var promise = applicationServices.getVisitDetailsData();
				promise.then(function(payload) {
					if (payload) {
						//console.log(payload)
						if (payload && payload.status == 200) {
							database.deleteCMDBData(function(data) {															
								database.storeCMDBData(payload.data.result, function(data) {									
								});
							});
						}
					}
				}, function(errorPayload) {
				});
				
// Customer Information Data fetch from server
			var promise = applicationServices.getCustomerInformationData();
				promise.then(function(payload) {
					if (payload) {
						//console.log(payload)
						if (payload && payload.status == 200 && payload.data && payload.data.result && payload.data.result.length > 0) {
							database.deleteCustInfoData(function(data) {
															//console.log(payload.data.result)
								database.storeCustInfoData(payload.data.result, function(data) {
									
								});
							});
						}
					}
				}, function(errorPayload) {
				});
				
				// Temp Spare Inventory Data fetch from server
			var promise = applicationServices.getSpareInventoryData();
				promise.then(function(payload) {
					if (payload) {
						//console.log(payload)
						if (payload && payload.status == 200 && payload.data && payload.data.result && payload.data.result.length > 0) {
							database.deleteTempSpareData(function(data) {
															//console.log(payload.data.result)
								database.storeTempSpareData(payload.data.result, function(data) {
									
								});
							});
						}
					}
				}, function(errorPayload) {
				});

				// Carrying Spares/Tools Data fetch from server
			var promise = applicationServices.getCarryingToolsData();
				promise.then(function(payload) {
					if (payload) {
						//console.log(payload)
						if (payload && payload.status == 200 && payload.data && payload.data.result && payload.data.result.length > 0) {
							database.deleteCarryingToolsData(function(data) {
															//console.log(payload.data.result)
								database.storeCarryingToolsData(payload.data.result, function(data) {
									
								});
							});
						}
					}
				}, function(errorPayload) {
				});
				
				// Service Contract Header data fetching
			var promise = applicationServices.getServiceContractHeaderData();
				promise.then(function(payload) {
					if (payload) {
						//console.log(payload)
						if (payload && payload.status == 200 && payload.data && payload.data.result && payload.data.result.length > 0) {
							database.deleteServiceContractHeaderData(function(data) {
															//console.log(payload.data.result)
								database.storeServiceContractHeaderData(payload.data.result, function(data) {
									
								});
							});
						}
					}
				}, function(errorPayload) {
				});
				
				// Service Contract Line data fetching
			var promise = applicationServices.getServiceContractLineData();
				promise.then(function(payload) {
					if (payload) {
						//console.log(payload)
						if (payload && payload.status == 200 && payload.data && payload.data.result && payload.data.result.length > 0) {
							database.deleteServiceContractLineData(function(data) {
															//console.log(payload.data.result)
								database.storeServiceContractLineData(payload.data.result, function(data) {
									
								});
							});
						}
					}
				}, function(errorPayload) {
				});
				
				
				// ALM Asset
				/*var promise = applicationServices.getALMData();
				promise.then(function(payload) {
					if (payload) {
						if (payload && payload.status == 200 && payload.data && payload.data.result && payload.data.result.length > 0) {
							database.deleteALMData(function(data) {
								database.storeALMData(payload.data.result, function(data) {
									
								});
							});
						}
					}
				}, function(errorPayload) {
				});*/
				


$scope.startSyncProcess = function(ssoid) {
		if (ssoid) {
			try {
				$scope.pendingListItems = [];						
				database.getPendingTickets(ssoid, function(result) {
					if (result && result.rows && result.rows.length > 0) {
						$scope.pendingListItems = [];
						
						for (var i  = 0; i < result.rows.length; i++) {
							var tktData = angular.fromJson(Tea.decrypt(result.rows.item(i).TicketInfo, $rootScope.dbpasscode));
							tktData.Type = result.rows.item(i).Type;
							$scope.pendingListItems.push(tktData);			

						}						
						//console.log('home')
						//console.log($scope.pendingListItems)
						pendingTicketUploadProcess.uploadTicketsToServiceNow($scope.pendingListItems, $scope, function() {
							$scope.createUI(ssoid);
						});
					}
				});
			} catch(e) {
			}
		}
}


			

/**
	 *Create the ui only for my open tickets
	 * @param {Object} ssoid
	 */
	$scope.createUI = function(ssoid) {
		try {
			database.getCompletedTickets(ssoid, function(result) {
				if (result && result.rows && result.rows.length > 0) {
					var compltedTaskArray = [];
					for (var i = 0; i < result.rows.length; i++) {
						if (result.rows.item(i).UserId == ssoid && result.rows.item(i).IsGroupTkt == 'false') {
							compltedTaskArray.push(angular.fromJson(Tea.decrypt(result.rows.item(i).TicketInfo, $rootScope.dbpasscode)));
							//console.log(compltedTaskArray)
						}
					}
					
					$scope.completedItems = compltedTaskArray;
					databasecache.completedItemsCache = compltedTaskArray;
					Utils.hidePleaseWait();
				} else {
					Utils.hidePleaseWait();
				}
			});
		} catch(e) {
			Utils.hidePleaseWait();
		}
		try {
			database.getPendingTickets(ssoid, function(result) {
				
				$scope.pendingWOItems = [];
				

				//console.log(result)
				if (result && result.rows && result.rows.length > 0) {
					for (var i = result.rows.length - 1; i >= 0; i--) {
						var tktData = angular.fromJson(Tea.decrypt(result.rows.item(i).TicketInfo, $rootScope.dbpasscode));
						tktData.Type = result.rows.item(i).Type;
					
						
						if (result.rows.item(i).UserId == ssoid && result.rows.item(i).Type == 'NEW_WORK_ORDER') {
							$scope.pendingWOItems.push(tktData);
							console.log($scope.pendingWOItems)
						}
						

					}
					$scope.pendingItemsNonGroup = [];
					$scope.pendingItemsNonGroup = $scope.pendingListItemsNonGroup;

				} else {
					setTimeout(function() {
						$scope.pendingItemsNonGroup = [];
						$scope.pendingSPItems = [];
						$scope.pendingODRSPItems = [];
						$scope.$apply();
						//this triggers a $digest
					}, 1000);
				}
			});
		} catch(e) {
		}
	};


//Set the User Access Details.
setTimeout(function() {
	var ssoid = $localstorage.get('SN-USER-NAME')
	if (ssoid) {		
		$scope.createUI(ssoid);
		//console.log(ssoid)
		database.getUserInfo(ssoid, function(result) {
			Utils.hidePleaseWait();
			if (result && result.rows && result.rows.length > 0) {
				
				var applicationAccess = result.rows.item(0);
				if (applicationAccess) {
					var applicationAccessJSON = angular.fromJson(Tea.decrypt(applicationAccess.UserInfo, $rootScope.dbpasscode));
					if (applicationAccessJSON) {
						//console.log(applicationAccessJSON);
						//console.log(applicationAccessJSON.isFuncUser);
						
						/*if (applicationAccessJSON && applicationAccessJSON.functional_user && applicationAccessJSON.functional_user.length > 0) {
							$http.defaults.headers.common.Authorization = applicationAccessJSON.functional_user;
						}*/
						
						if (JSON.stringify(applicationAccessJSON.isFuncUser).toLowerCase() == 'true') {
							try {
								window.cookieEmperor.clearAll(
										function() {
										//alert('Cookies have been cleared');
										$state.go('nonvaliduser');
										},
										function() {
											//alert('Cookies could not be cleared');
										});
								
							} catch(e) {
								$state.go('nonvaliduser');
							}
						} else {
							//$scope.dashboardaccess = applicationAccessJSON;
							//$scope.accessControl(applicationAccessJSON);
							//console.log('asd')
							if ($rootScope.isOnline()) {
								$scope.startSyncProcess(ssoid);
								
							//	$scope.createUI(ssoid);
							} else {
								$scope.createUI(ssoid);
							}

						}
					}
				}
			}
		});
	} else {
		try {
			window.cookies.clear(function() {
				$state.go('nonvaliduser');
			});
		} catch(e) {
		}
	}
}, 1000);	
	$scope.woDetailsPage = function(details, type) {
		$localstorage.set('TICKET_EDIT_MODE', angular.toJson(details));
		$localstorage.set('TICKET_TYPE', angular.toJson(type));
		$localstorage.set('TICKET_EDIT_FROM', 'MY_TICKET');
		$state.go('eventmenu.openticketedit');
	};
	

});
