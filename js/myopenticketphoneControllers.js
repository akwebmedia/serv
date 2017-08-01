/**
 *Controller for home landing page for mobile
 */
angular.module('starter.controllers').controller('myopenticketphoneCtrl', function($scope, Utils, database, $ionicScrollDelegate, applicationServices, $localstorage, $rootScope, $state, pendingTicketUploadProcess) {
	$scope.$parent.$parent.$parent.app_page_title = "Visit Details";
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$rootScope.setupHttpAuthHeader();

	//Utils.showAllTiles($scope);
	//Utils.showPleaseWait(pleaseWait);
	if ($rootScope.isOnline()) {
		$rootScope.onofflineclass = 'online-indicator';
	} else {
		$rootScope.onofflineclass = 'offline-indicator';
	}


	
});
