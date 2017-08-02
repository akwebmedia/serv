angular.module('starter.controllers')
	
	
.controller('VisitDetailsCtrl', function($scope, $rootScope, $timeout, $state, $localstorage, $http, $window, database, Utils, applicationServices, $ionicPopup, $parse, $ionicScrollDelegate) {

	$scope.$parent.$parent.$parent.app_page_title = 'Ticket Details';
	$scope.$parent.$parent.$parent.showBackButton = 'showBackButton';
	$scope.$parent.$parent.$parent.showLogo = '';
	$scope.$parent.$parent.$parent.showTodayTaskIcon = false;
	$rootScope.setupHttpAuthHeader();
	$scope.ticketform = {};
	$scope.partialform = {};
	$scope.ticketform.u_sre_latitude = '';
	$scope.ticketform.u_sre_longitude = ''
	$scope.show_section = {};
	$scope.showSpareParts = false;

// Accordion Display
$scope.section_click = function(section, $event) {
		$scope[section] = !$scope[section];
		$ionicScrollDelegate.resize();
		//$scope.closeAllAccord(section);
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


// Get the selected record from local storage
var selectedItem = $localstorage.get('SELECTED_ACCOUNT');
	$scope.records = angular.fromJson(selectedItem);
	console.log($scope.records)
	
// Get the Partial Saved data from local storage	
 var partialData = $localstorage.getWithOutEncryption('PARTIAL_TICKET_DATA');
	if(partialData && partialData.length>0){	
		$scope.filledData = angular.fromJson(partialData);
			for(var i=0; i<$scope.records.length; i++){
				if($scope.records[i].field_Visible=='true' && $scope.records[i].field_readonly=='false' ){		
					var namee = $scope.records[i].field_name;		
					$scope.records[i].field_value = $scope.filledData[namee];				
				} 
			}
	}


// Accordion Options
$scope.closeAllAccord = function(section){
	for(var i=0; i<	$scope.accordName.length; i++){
				if($scope.accordName[i] == section){				
					$scope[section] = true;
				} else {			
				var modelNew = $parse($scope.accordName[i]);
				modelNew.assign($scope, false);
				}
				$ionicScrollDelegate.resize();
	}
}

// By default accordion open
if($scope.currentFormStatus == 'Owner Assigned'){
	$scope.closeAllAccord('start_home');
} else if ($scope.currentFormStatus == 'Start Work'){
	$scope.closeAllAccord('chk_end_work');
} else {
}


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
		} else if($scope.records[i].field_lable == 'Customer Latitude') {
			$scope.custLatitude = $scope.records[i].field_value;
		} else if($scope.records[i].field_lable == 'Customer Longitude') {
			$scope.custLongitude = $scope.records[i].field_value;
		} else {
			}
	}




$scope.validateChoice = function(type){	
	var isChoiceValid = 'true';
	
	//console.log(($scope.records.length)-1)
for(var i=0; i<$scope.records.length; i++){	

		if($scope.records[i].field_type=='choice'){
				//console.log(type)
				//console.log($scope.records[i].acc_src)
				//console.log($scope.records[i].field_Mandatory)
				//console.log($scope.records[i].field_value)
				
			if($scope.records[i].acc_src == type  && !$scope.records[i].field_value){
				//console.log('enter')
				//console.log($scope.records[i].field_value)
				$scope.isChoiceFilled = 'false';		
				
				Utils.showAlert("Please enter the value for all mandatory fields");				
				break;
				
			} else {				
				
			}
			
		} 	
				if(isChoiceValid == 'true' && i == ($scope.records.length)-1)
				return true;
	}
	
	
		
}

$scope.validateComments = function(type){	
for(var i=0; i<$scope.records.length; i++){	
		if($scope.records[i].acc_src == type){				
			if($scope.records[i].field_name == 'u_others_cal'){				
				var otherChoiceVal = $scope.records[i].field_value;
			} 
			else if($scope.records[i].field_Mandatory=='true' && $scope.records[i].field_name == 'u_comments_chk_std'){
				var commentsVal = $scope.records[i].field_value;
			} 			
		} 	
	}
	
	if(otherChoiceVal == 'yes' || otherChoiceVal == 'Yes' && !commentsVal){
				Utils.showAlert("Please fill the comments");	
			} else {				
				return true;
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
	if($scope.records[i].field_name=='sys_id' || $scope.records[i].field_name=='number' || ($scope.records[i].field_readonly=='false' && $scope.records[i].field_Visible=='true')){		
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
				//console.log(year+'-' + month + '-'+dt);
		} else if($scope.records[i].field_type=='REF') {
			$scope.ticketform[namee] = $scope.records[i].field_refID;
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
				Utils.showAlert(acceptanceDate);
				//$scope.uploadTicketProcess();
				
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
}else if(btnType == 'Approve'){
	$scope.ticketform.u_status = 'New';
	$scope.uploadTicketProcess();	
}else if(btnType == 'Start Travel(Forward)'){	
	$scope.closeAllAccord('start_home');
	if($scope.validateChoice('start_home')){
			$scope.ticketform.u_status = 'Start Travel Forward';
			$scope.uploadTicketProcess();
	}

}else if(btnType == 'End Travel(Forward)'){
	$scope.ticketform.u_status = 'End Travel Forward';
	$scope.uploadTicketProcess();
} else if(btnType == 'Start Work'){
	$scope.ticketform.u_status = 'Start Work';
	$scope.uploadTicketProcess();
} else if(btnType == 'End Work'){
	$scope.closeAllAccord('chk_end_work');
	$scope.chk_end_work = 'true';
	if($scope.validateChoice('chk_end_work')){
			if($scope.validateComments('"chk_end_work"')){
				$scope.ticketform.u_status = 'End Work';
				$scope.uploadTicketProcess();
			}
	}
	
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
	$scope.closeAllAccord('chk_suspention');		
		//console.log($scope.records[i].field_value)
	if($scope.validateChoice('chk_suspention')){
		$scope.chk_suspention = 'true';
			if($scope.validateComments('chk_suspention')){
				$scope.ticketform.u_status = 'Suspend';		
				$scope.uploadTicketProcess();
	}
	}
	
		
	
}  else if(btnType == 'Resume'){
	$scope.ticketform.u_status = 'Owner Assigned';
	
} else {

}	
}

$scope.uploadTicketProcess = function(){
	//alert('Lat:'+$scope.ticketform.u_sre_latitude+', Long: '+ $scope.ticketform.u_sre_longitude);
	//Utils.showPleaseWait(uploadingTicket);

var ssoid = $localstorage.get('SN-USER-NAME');
var sysId = $localstorage.get('SN-USER-SYSID');
		if (ssoid) {
			var d = new Date();
			var n = d.getTime();
			$scope.ticketform.ticketId = "" + n;
			$scope.ticketform.savedTS = "" + n;
			$scope.ticketform.u_updated_by = sysId;
			$scope.ticketform.u_update_from = 'mobile';
			//alert($scope.ticketform.u_updated_by)
			
			//console.log($scope.ticketform)
			//console.log($scope.ticketform.sys_id)
			if ($rootScope.isOnline()) {			
				console.log($scope.ticketform)
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
				$scope.uploadImage();				
			}
			
			
		}).error(function(data, status, headers, config) {
			Utils.showAlert(unableToUpload);
			Utils.hidePleaseWait();
		});
	};

// Saving Partial Data
$scope.openCustomerInformation = function(custID){
	$localstorage.setWithOutEncryption('CUST-SYS-ID', custID);	
	for(var i=0; i<$scope.records.length; i++){
	if($scope.records[i].field_Visible=='true' && $scope.records[i].field_readonly=='false' ){		
		var namee = $scope.records[i].field_name;		
		$scope.partialform[namee] = $scope.records[i].field_value;		
	} 
}
	
	$localstorage.setWithOutEncryption('PARTIAL_TICKET_DATA', JSON.stringify($scope.partialform));
	
	$state.go('eventmenu.custinfoedit');
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

// Open Map
$scope.openMap = function(){
	
	$localstorage.setWithOutEncryption('CUST-LOCATION', $scope.custLatitude+','+$scope.custLongitude);	// Setting Customer location for map screen
	var userLocation = $localstorage.getWithOutEncryption('USER-LOCATION'); // Getting user location
	//console.log($scope.custLatitude);
	//console.log($scope.custLongitude.length);
	
	if(($scope.custLatitude && $scope.custLongitude) && ($scope.custLatitude.length>1 && $scope.custLongitude.length>1) ){
		if(userLocation){
			$state.go('eventmenu.customerlocation');
		} else {
			Utils.showAlert('Unable to detect your location, kindly make sure to on the GPS');	
		}
	} else {
		Utils.showAlert('Customer location is not correct');	
	}								 

}

// Open Attached images
$scope.openAttachedImages = function(data){
	cordova.InAppBrowser.open($rootScope.baseAppURL + '/sys_attachment.do?sysparm_referring_url=tear_off&view=true&sys_id=' + data, '_blank', 'location=yes,toolbar=yes');		
}

// Open Contract Number
$scope.openContract = function(data){
	$localstorage.setWithOutEncryption('CUST-SYS-ID', data);	
		for(var i=0; i<$scope.records.length; i++){
		if($scope.records[i].field_Visible=='true' && $scope.records[i].field_readonly=='false' ){		
			var namee = $scope.records[i].field_name;		
			$scope.partialform[namee] = $scope.records[i].field_value;		
		} 
	}
	
	$localstorage.setWithOutEncryption('PARTIAL_TICKET_DATA', JSON.stringify($scope.partialform));
	
	$state.go('eventmenu.servicecontractedit');
}


// Get the Carrying Spares/Tools Data  /sys_attachment.do?sysparm_referring_url=tear_off&view=true&sys_id=2e90049f4f71120031577d2ca310c7a1'




$scope.openSpareDetails = function(fltr,fldId){	

try {
	$scope.toolsData = [];
	$scope.temp = [];

	var str = fltr;
var n = str.indexOf("=");
var filter1 = str.substring(0, n);
//alert(res1);
var filter2 = str.substring(n+1, str.length);

Utils.showPleaseWait(pleaseWait);
			database.getCarryingToolsData(function(result) {
				
				$scope.toolsData = [];
				if (result && result.rows.length > 0) {
					try {						
						for (var i = 0; i < result.rows.length; i++) {
							//console.log(angular.fromJson(result.rows.item(i).Data))
							var applicationAccess = result.rows.item(i);
							$scope.temp = (angular.fromJson(applicationAccess.Data));
							
							//$scope.totalRecords.push(angular.fromJson(applicationAccess.Data));							
							//console.log(fltr)
							//console.log($scope.temp)
							
							for(var j=0; j < $scope.temp.length; j++){
								//console.log($scope.temp[j])
								if(($scope.temp[j].field_name == filter1 && $scope.temp[j].field_value == filter2) || $scope.temp[j].field_name == 'sys_id'){
									var tempData = result.rows.item(i).Data;
									$scope.toolsData.push(angular.fromJson(tempData));
								}
							}
						}
					} catch(e) {
					}
					//Utils.hidePleaseWait();
		}				
			
			console.log($scope.toolsData)
			
			Utils.hidePleaseWait();
			});
		} catch(e) {
			Utils.hidePleaseWait();
		}

	$scope.showSpareParts = true;
	$scope.tempFldId = fldId;
	$ionicScrollDelegate.scrollTop();
}


$scope.selectedTempData = function(data){
		for(var i = 0; i<data.length; i++){
			if(data[i].field_name == 'u_model_number')	{
					var valuePos = i;					
			} else if(data[i].field_name == 'sys_id'){
					var sysPos = i;
			}
		}
		
		for(var j=0; j<$scope.records.length; j++){
				if($scope.records[j].field_name==$scope.tempFldId){		
					//var namee = $scope.records[i].field_name;		
					//console.log(data[i].field_value)
					$scope.records[j].field_value = data[valuePos].field_value;
					$scope.records[j].field_refID = data[sysPos].field_value;
					$scope.showSpareParts = false;
					//$ionicScrollDelegate.scrollTop();
				} 
		}		
}

// End of Carrying Spares/Tools Data

// Image Attachment

function toDataUrl(url, callback, outputFormat) {

		var img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function() {
			var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
			var dataURL;
			canvas.height = this.height;
			canvas.width = this.width;
			ctx.drawImage(this, 0, 0);
			dataURL = canvas.toDataURL(outputFormat);
			callback(dataURL);
			canvas = null;
		};
		img.src = url;
	}

$scope.uploadImage = function() {
	
		Utils.showPleaseWait(pleaseWait);
		// Check whether image is attached or not
		var imgStatus = document.getElementById('image').style.display;
		//console.log(imgStatus)
		//alert(imgStatus)
		if (imgStatus == "block") {
			for(var i=0; i<$scope.records.length; i++){
					if($scope.records[i].field_name=='sys_id'){	
						var ticketSysId = $scope.records[i].field_value;
					} 
		}
			var d = new Date(); // for now
			datetext = d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
			var allowedExtension = ['jpeg', 'jpg', 'gif', 'png'];
			var fileExtension = document.getElementById('image').src.split('.').pop().toLowerCase();
			var imgPath = document.getElementById('image').src;
			var imgUrlPos = imgPath.lastIndexOf('/') + 1;
			var imgUrl = imgPath.lastIndexOf(".");			
			
			var cameraImg = document.getElementById('image');
			if(cameraImg.alt){
				var attachmentName = cameraImg.alt+'-'+datetext;
			} else {
				var attachmentName = imgPath.slice(imgUrlPos, imgUrl); //for Gallery
			}
			
			//	alert(fileExtension)
			var isValidFile = false;
			for (var index in allowedExtension) {
				if (fileExtension.search(allowedExtension[index]) > -1) {
					isValidFile = true;
					var imgType = allowedExtension[index]
					break;
				}

			}

			if (!isValidFile) {
				Utils.showAlert('Allowed Extensions are : *.' + allowedExtension.join(', *.') + '. Please remove the attachment OR try another image');
			} else {
				var imageURI = document.getElementById('image').src;
				toDataUrl(imageURI, function(base64Img) {
					var pos = base64Img.indexOf(',');
					pos = pos + 1;
					$scope.afterDot = base64Img.substr(pos);
					//console.log($scope.afterDot)

					$http({
						method : 'POST',
						url : $rootScope.baseAppURL + '/api/inmpl/inm_mobile_application/inm_app_attachment_creator',
						data : {
							'tableName' : "u_avery_workreq_task",
							'recordSysId' : ticketSysId,
							'fileName' : attachmentName + '.' + imgType,
							'contentType' : "image/x-"+imgType,
							'payload' : $scope.afterDot,
						},
						headers : {
							'Content-Type' : 'application/json',
							'Accept' : 'application/json',
						},
					}).success(function(record, status, headers, config) {
						if (status == 200) {
							//console.log(record && record.records && record.records[0] && record.records[0].__status && record.records[0].__status == 'success')
							//Utils.showAlert('Image has been uploaded successfully');
							Utils.hidePleaseWait();
							$scope.backToTicketsListing();
						}
					}).error(function(record, status, headers, config) {
						Utils.showAlert(unableToUpload);
						Utils.hidePleaseWait();
					});

				});

			}

		} else {
				Utils.hidePleaseWait();
				$scope.backToTicketsListing();
		}

	}


})
