// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers','starter.directives', 'ngMap'])


.run(function($ionicPlatform, $rootScope, database) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
		
	
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {



$ionicConfigProvider.tabs.position('bottom'); //bottom

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('eventmenu', {
    url: '/event',
    abstract: true,
    templateUrl: 'templates/event-menu.html'
  })

  // Each tab has its own nav history stack:

.state('eventmenu.home', {
		url : "/home",
		cache: "false",
		views : {
			'menuContent' : {
				templateUrl : "templates/homelanding.html",
				controller : 'HomeLandingCtrl'
			}
		}
	})
.state('eventmenu.myopenticketphone', {
		url : '/myopenticketphone',
		views : {
			'menuContent' : {
				templateUrl : 'templates/myopenticketphone.html',
				controller : 'myopenticketphoneCtrl'
			}
		}
	})
	.state('eventmenu.createnew', {
		url : "/createnew",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/createnewwo.html",
				controller : 'CreateNewWoCtrl'
			}
		}
	})
	.state('eventmenu.visitdetailslisting', {
		url : "/visitdetailslisting",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/VisitDetailsListing.html",
				controller : 'VisitDetailsListingCtrl'
			}
		}
	})
	.state('eventmenu.visitdetailsedit', {
		url : "/visitdetailsedit",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/VisitDetails.html",
				controller : 'VisitDetailsCtrl'
			}
		}
	})
	.state('eventmenu.installationlisting', {
		url : "/installationlisting",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/InstallationListing.html",
				controller : 'InstallationListingCtrl'
			}
		}
	})
	.state('eventmenu.installationedit', {
		url : "/installationedit",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/InstallationEdit.html",
				controller : 'InsallationEditCtrl'
			}
		}
	})
	.state('eventmenu.amclisting', {
		url : "/amclisting",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/AmcListing.html",
				controller : 'AmcListingCtrl'
			}
		}
	})
	.state('eventmenu.amcedit', {
		url : "/amcedit",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/AmcEdit.html",
				controller : 'AmcEditCtrl'
			}
		}
	})
	.state('eventmenu.evvlisting', {
		url : "/evvlisting",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/EvvListing.html",
				controller : 'EvvListingCtrl'
			}
		}
	})
	.state('eventmenu.evvedit', {
		url : "/evvedit",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/EvvEdit.html",
				controller : 'EvvEditCtrl'
			}
		}
	})
	.state('eventmenu.settings', {
		url : "/settings",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/settings.html",
				controller : 'SettingsCtrl'
			}
		}
	})
	.state('eventmenu.custinfolist', {
		url : "/custinfolist",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/custinfolist.html",
				controller : 'CustInfoListCtrl'
			}
		}
	})
	.state('eventmenu.custinfoedit', {
		url : "/custinfoedit",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/custinfoedit.html",
				controller : 'CustInfoEditCtrl'
			}
		}
	}).state('eventmenu.inventorylist', {
		url : "/inventorylist",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/inventorylist.html",
				controller : 'InventoryListCtrl'
			}
		}
	})
	.state('eventmenu.inventoryedit', {
		url : "/inventoryedit",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/inventoryedit.html",
				controller : 'InventoryEditCtrl'
			}
		}
	})
	.state('eventmenu.servicecontractlist', {
		url : "/servicecontractlist",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/servicecontractlist.html",
				controller : 'ServiceContractListCtrl'
			}
		}
	})
	.state('eventmenu.servicecontractedit', {
		url : "/servicecontractedit",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/servicecontractedit.html",
				controller : 'ServiceContractEditCtrl'
			}
		}
	})
	.state('eventmenu.customerlocation', {
		url : "/customerlocation",
		cache: 'false',
		views : {
			'menuContent' : {
				templateUrl : "templates/customerlocation.html",
				controller : 'CustomerLocationCtrl'
			}
		}
	})
	
  .state('splash', {
    url: '/splash',   
	cache: "false",
        templateUrl: 'templates/splash.html',
        controller: 'SplashCtrl'      
  })
  
  .state('login', {
    url: '/login',   
        templateUrl: 'templates/login.html',
        controller: 'LoginhCtrl'      
  })
  
  .state('pinregister', {
		url : '/pinregister',
		templateUrl : 'templates/pinregister.html',
		controller : 'pinregisterCtrl'
	})
  .state('pinlogin', {
		url : '/pinlogin',
		templateUrl : 'templates/pinlogin.html',
		controller : 'pinloginCtrl'
	})
  .state('pinnotset', {
		url : '/pinnotset',
		templateUrl : 'templates/pinnotset.html',
	})
   .state('offline', {
		url : '/offline',
		templateUrl : 'templates/offline.html',
	})
   .state('nonvaliduser', {
		url : '/nonvaliduser',
		templateUrl : 'templates/nonvaliduser.html',
	})
  
  .state('instanceRegister', {
    url: '/instanceRegister', 
	cache: "false",
        templateUrl: 'templates/instance-register.html',
        controller: 'InstanceRegisterCtrl'      
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('splash');

});
