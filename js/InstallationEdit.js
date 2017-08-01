angular.module('starter.controllers')
	
.controller('InsallationEditCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicPopup, $parse, $ionicScrollDelegate) {
	$scope.$parent.$parent.$parent.app_page_title = 'Installation Details';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$rootScope.setupHttpAuthHeader();
	$scope.ticketform = {};
	$scope.ticketform.u_sre_latitude = '';
	$scope.ticketform.u_sre_longitude = ''
	$scope.show_section = {};

// Accordion Display
$scope.section_click = function(section, $event) {
		$scope.closeAllAccord(section);
};

   $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
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

$scope.ticketCancel = function() {
		$scope.ticketform = {};
		$rootScope.onBackPress();
};

// Get the selected record from local storage
var selectedItem = $localstorage.get('SELECTED_ACCOUNT');
	$scope.records = angular.fromJson(selectedItem);
	console.log($scope.records)
 


// Create the Choice options, get the ticket status and create dynamic name		
$scope.accordName = [];		
	for(var i=0; i<$scope.records.length;i++){
		if($scope.records[i].field_type=='choice'){
			var name = $scope.records[i].field_name;
			$scope.choiceValue = $scope.records[i].field_choiceValue;			
			var the_string = name;
			// Get the model
			var model = $parse(the_string);
			// Assigns a value to it
			model.assign($scope, $scope.choiceValue);
		} else if($scope.records[i].field_lable=='Status'){
			$scope.currentFormStatus = $scope.records[i].field_value;		
		} else if($scope.records[i].field_type == 'Date' && $scope.records[i].field_value != ''){
			var formDate = $scope.records[i].field_value;
			$scope.records[i].field_value = new Date(formDate.slice(0, 4), (formDate.slice(5, 7))-1, formDate.slice(8, 10));
		} else if($scope.records[i].field_type == 'acc_start') {
			$scope.accordName.push($scope.records[i].field_tgtField);
		} else {
			}
	}

$scope.closeAllAccord = function(section){
for(var i=0; i<	$scope.accordName.length; i++){
			if($scope.accordName[i] == section){				
				$scope[section] = !$scope[section];
			} else {			
			var modelNew = $parse($scope.accordName[i]);
			modelNew.assign($scope, false);
			}

}
$ionicScrollDelegate.resize()
}


if($scope.currentFormStatus == 'Owner Assigned'){
$scope.closeAllAccord('start_home');
}

// Call the customer and open dialer
$scope.callDialer = function(number){
	function onSuccess(result){
}

function onError(result) {
  //alert('error'+result)
}

if(number && number.length > 0){		
		window.plugins.CallNumber.callNumber(onSuccess, onError, number, true);	
} else {
		Utils.showAlert("Contact number not available");
}	
}



// On Form Submit
$scope.SubmitFormData = function(btnType){

// Get the position
var onSuccess = function(position) { 	 	
		$scope.ticketform.u_sre_latitude = position.coords.latitude;
		$scope.ticketform.u_sre_longitude = position.coords.longitude;
		
   };
 
    // onError Callback receives a PositionError object 
    // 
    function onError(error) {
		
    }
	
	try{
	navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 2000});
	} catch(e) {
		
	}


for(var i=0; i<$scope.records.length; i++){
	if($scope.records[i].field_Visible=='true'|| $scope.records[i].field_name=='sys_id' ){		
		var namee = $scope.records[i].field_name;		
		if( $scope.records[i].field_type == "Date" && $scope.records[i].field_value){
			date = new Date($scope.records[i].field_value);
				year = date.getFullYear();
				month = date.getMonth()+1;
				dt = date.getDate();
				
				if (dt < 10) {
				  dt = '0' + dt;
				}
				if (month < 10) {
				  month = '0' + month;
				}
				$scope.ticketform[namee] = year+'-' + month + '-'+dt;
				console.log(year+'-' + month + '-'+dt);
		} else {
			$scope.ticketform[namee] = $scope.records[i].field_value;
		}
		
	} 
}


if(btnType == 'Accept'){
	
var confirmPopup = $ionicPopup.confirm({
     title: '',
     template: 'Have you taken PRIOR customer appointment for the job?'
   });

   confirmPopup.then(function(res) {
     if(res) {
	   if (!($scope.ticketform.u_acceptance_date && $scope.ticketform.u_acceptance_date.length > 0)) {
				setTimeout(function() {
				//Utils.showAlert(acceptanceDate);
				$scope.ticketform.u_status = 'Owner Assigned';
				$scope.uploadTicketProcess();
				
			}, 100);
				
			} else {
				 $scope.ticketform.u_status = 'Owner Assigned';
				 $scope.uploadTicketProcess();
	  			
			}
      
     } else {
       console.log('You are not sure');
     }
   });



}else if(btnType == 'First Response'){
	$scope.ticketform.u_status = 'New';
	$scope.uploadTicketProcess();	
}else if(btnType == 'Start Travel(Forward)'){
	$scope.ticketform.u_status = 'Start Travel Forward';
	$scope.uploadTicketProcess();
	
}else if(btnType == 'End Travel(Forward)'){
	$scope.ticketform.u_status = 'End Travel Forward';
	$scope.uploadTicketProcess();
} else if(btnType == 'Start Work'){
	$scope.ticketform.u_status = 'Start Work';
	$scope.uploadTicketProcess();
} else if(btnType == 'End Work'){
	$scope.ticketform.u_status = 'End Work';
	$scope.uploadTicketProcess();
} else if(btnType == 'Start Travel(Back)'){
	$scope.ticketform.u_status = 'Start Travel Back';
	$scope.uploadTicketProcess();
} else if(btnType == 'Completed'){
	$scope.ticketform.u_status = 'Completed';
	$scope.uploadTicketProcess();
} else if(btnType == 'End Travel(Back)'){
	$scope.ticketform.u_status = 'Completed';
	$scope.uploadTicketProcess();
}  else if(btnType == 'Suspend'){
	$scope.ticketform.u_status = 'Suspend';
	$scope.closeAllAccord('suspension');
	$scope.uploadTicketProcess();
}  else if(btnType == 'Resume'){
	$scope.ticketform.u_status = 'Owner Assigned';
	
} else {

}	
}

$scope.uploadTicketProcess = function(){
	//alert('Lat:'+$scope.ticketform.u_sre_latitude+', Long: '+ $scope.ticketform.u_sre_longitude);
	Utils.showPleaseWait(uploadingTicket);

var ssoid = $localstorage.get('SN-USER-NAME');
		if (ssoid) {
			var d = new Date();
			var n = d.getTime();
			$scope.ticketform.ticketId = "" + n;
			$scope.ticketform.savedTS = "" + n;
			$scope.ticketform.opened_by = ssoid;
			console.log($scope.ticketform)
			if ($rootScope.isOnline()) {
			
				$scope.uploadTicket();

			} else {	
			
				//Save it locally for future upload process
				database.storePendingTicket($scope.ticketform.ticketId, ssoid, "VISIT_DETAILS_EDIT", $scope.ticketform.savedTS, $scope.ticketform, function(status) {					
					$scope.ticketform = {};
					Utils.hidePleaseWait();
					$scope.backToTicketsListing();
				});
			}
		}
			
}
	/**
	 *Upload ticket to server in online mode
	 */
	$scope.uploadTicket = function() {
	
		//$scope.ticketform.u_status = "Closed";
		$http({
			method : 'PUT',
			url : $rootScope.baseAppURL + '/api/now/table/u_avery_workreq_task/'+$scope.ticketform.sys_id+'?sysparm_fields=number',
			data : $scope.ticketform,
			headers : {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
			},
		}).success(function(data, status, headers, config) {
			if(status == 200){
				Utils.hidePleaseWait();
				$scope.backToTicketsListing();
			}
			
			
		}).error(function(data, status, headers, config) {
			Utils.showAlert(unableToUpload);
			Utils.hidePleaseWait();
		});
	};





})