angular.module('starter.services', [])
.factory('$localstorage', ['$window', '$http',
function($window, $rootScope) {
	return {
		/**
		 * Set data in local storage in encrypted form
		 * @param {Object} key : Key for local storage
		 * @param {Object} value : Value associated
		 */
		set : function(key, value) {
			if (key == 'SN-LOGIN-SSO') {
				$window.localStorage[key] = value;
			} else {
				$window.localStorage[key] = Tea.encrypt(value, $rootScope.dbpasscode);
			}
		},

		/**
		 * Get data from local storage in deencrypted form
		 * @param {Object} key : Key for local storage
		 */
		get : function(key) {
			
			if (key == 'SN-LOGIN-SSO') {
				return $window.localStorage[key];
			} else {
				if ($window.localStorage[key]) {
					return Tea.decrypt($window.localStorage[key], $rootScope.dbpasscode);
				} else {
					return $window.localStorage[key];
				}
			}
		},

		/**
		 * Set data in local storage in without encrypted form
		 * @param {Object} key : Key for local storage
		 * @param {Object} value : Value associated
		 */
		setWithOutEncryption : function(key, value) {
			$window.localStorage[key] = value;
		},

		/**
		 * Get data from local storage in without decypyted form
		 * @param {Object} key : Key for local storage
		 */
		getWithOutEncryption : function(key) {
			return $window.localStorage[key];
		},
	}
}])

.factory('Utils', function($ionicLoading, $parse, $rootScope) {
	
return {
		/**
		 * Check if UI is of mobile or tab
		 */
		isPhoneView : function() {
			if ($('#MainMenuForPhone').is(':hidden')) {
				return false;
			} else {
				return true;
			}
		},

		

		/**
		 * Show Plaese wait screen
		 * @param {Object} loadingMessage
		 */
		showPleaseWait : function(loadingMessage) {
			$ionicLoading.show({
				template : '<i class=" ion-loading-b"></i> ' + loadingMessage,
				maxWidth : 400,
			});
		},

		/**
		 * Hide wait screen
		 */
		hidePleaseWait : function() {
			$ionicLoading.hide();
		},
		showAlert : function(msg) {
			try {
				navigator.notification.alert(msg, // message
				function() {

				}, // callback
				'Alert', // title
				'Ok' // buttonName
				);
			} catch(e) {
				alert(msg);
			}
		},
		
		isPhoneView : function() {
			if ($('#MainMenuForPhone').is(':hidden')) {
				return false;
			} else {
				return true;
			}
		},
	
}})
.factory('applicationServices', function($http, $rootScope, $localstorage) {
	
	return {
		/**
		 * Uplaod Order spare part to service now
		 * @param {Object} _data : data to upload
		 */
		getAppInfo : function() {
			//var baseURL = $localstorage.getWithOutEncryption('INSTANCE_DETAILS');			
			//var rootURL = 'https://'+baseURL+'.service-now.com';	
			var rootURL = $rootScope.baseAppURL;	
			
			return $http({
				method : 'GET',
				url : rootURL +"/api/now/table/u_inm_mobile_config?sysparm_fields=u_name%2Cu_active%2Cu_description",				
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
				},
			});
		}, // end of service
		getCustomerInformationData : function() {
			var rootURL = $rootScope.baseAppURL ;	
			var sysId = $localstorage.get('SN-USER-SYSID');
			return $http({
				method : 'GET',
				url : rootURL + "/api/inmpl/inm_mobile_application/inm_app_customer_details?user_sysId="+sysId,				
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
				},
			});
		}, // end of service
		/**
		 * Uplaod Order spare part to service now
		 * @param {Object} _data : data to upload
		 */
		getVisitDetailsData : function() {
			var rootURL = $rootScope.baseAppURL ;
			var sysId = $localstorage.get('SN-USER-SYSID');
			return $http({
				method : 'GET',
				url : rootURL + "/api/inmpl/inm_mobile_application/inm_app_workreq_task?user_sysId="+sysId,				
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
				},
			});
		}, // end of service
		getSpareInventoryData : function() {
			var rootURL = $rootScope.baseAppURL ;
			var sysId = $localstorage.get('SN-USER-SYSID');
			return $http({
				method : 'GET',
				url : rootURL + "/api/inmpl/inm_mobile_application/inm_app_temp_spare_inventory?user_sysId="+sysId,				
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
				},
			});
		}, // end of service
		getCarryingToolsData : function() {
			var rootURL = $rootScope.baseAppURL ;
			var sysId = $localstorage.get('SN-USER-SYSID');
			return $http({
				method : 'GET',
				url : rootURL + "/api/inmpl/inm_mobile_application/inm_app_item_master?user_sysId="+sysId,				
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
				},
			});
		}, // end of service
		getServiceContractHeaderData : function() {
			var rootURL = $rootScope.baseAppURL ;
			var sysId = $localstorage.get('SN-USER-SYSID');
			return $http({
				method : 'GET',
				url : rootURL + "/api/inmpl/inm_mobile_application/inm_app_contract_hdr?user_sysId="+sysId,					
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
				},
			});
		}, // end of service
		getServiceContractLineData : function() {
			var rootURL = $rootScope.baseAppURL ;
			var sysId = $localstorage.get('SN-USER-SYSID');
			return $http({
				method : 'GET',
				url : rootURL + "/api/inmpl/inm_mobile_application/inm_app_contract_line?user_sysId="+sysId,					
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
				},
			});
		}, // end of service
		
	}
})
.factory('database', function($ionicLoading, $parse, $rootScope) {
	return {
		/**
		 * Create database table for the app. Can utilize web sql for desktop and sqlite from mobile application
		 */
		createDbAndTables : function() {
			if (desktopVersion) {
				$rootScope.db = openDatabase('myClientDB127', '1.0', 'Mobile Client DB', 2 * 1024 * 1024);
			} else {
				$rootScope.db = window.sqlitePlugin.openDatabase({name: 'myClientDB123.db', location: 'default'});
				
				
			}
			
			$rootScope.db.transaction(function(tx) {
											   
				//tx.executeSql('DROP TABLE IF EXISTS CustInfo');
				
				tx.executeSql('CREATE TABLE IF NOT EXISTS AppInfo (Data clob)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS UserInfo (UserId text, UserInfo clob)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS CMDB (Data clob)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS CustInfo (SysId text primary key, Data clob)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS TempSpareInvntry (SysId text primary key, Data clob)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS SpareTools (SysId text primary key, Data clob)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS ServiceHdr (SysId text primary key, Data clob)');
				tx.executeSql('CREATE TABLE IF NOT EXISTS ServiceLine (RefId text primary key, Data clob)');				
				tx.executeSql('CREATE TABLE IF NOT EXISTS pendingTickets (TicketId text primary key, UserId text, Type text, SysUpdatedOn datetime,TicketInfo clob)');
				
			});			
		},
		deleteAppDetails : function(callback) {
			
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('DELETE FROM AppInfo', [], function(tx, res) {
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		
		storeAppDetails : function(data, callback) {			
			$rootScope.db.transaction(function(tx) {
											   
											   var iIndex = 0;
					for (var i = 0; i < data.length; i++) {
						if (data[i]) {
							tx.executeSql('INSERT or REPLACE INTO AppInfo (Data) VALUES (?)', [JSON.stringify(data[i])], function(tx, res) {
								iIndex++;
								if (iIndex == data.length) {
									callback(true, "");
								}
							});
						}
					}   
											   
				
			});
		
		},
		
				getBasicAppDetails : function(callback) {				
				$rootScope.db.transaction(function(tx) {
					tx.executeSql('SELECT * FROM AppInfo', [], function(tx, results) {
						if (results && results.rows && results.rows.length > 0) {	
						console.log('sss');
							callback(results);
						} else {	
						
							callback(null);
						}
					});
				});
		},
		
		/**
		 * Store User info based on the ssoid
		 */
		storeUserInfo : function(userId, user, callback) {			
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('INSERT or REPLACE INTO UserInfo (UserId,UserInfo) VALUES (?,?)', [userId, Tea.encrypt(JSON.stringify(user), $rootScope.dbpasscode)], function(tx, res) {
					if (res && res.rowsAffected && res.rowsAffected == 1) {						
						callback(true);
					} else {						
						callback(false);
					}
				});
			});
		},
		
		deleteUserInfo : function(userId, callback) {		
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('DELETE FROM UserInfo WHERE UserId=?', [userId], function(tx, res) {					
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		/**
		 * Get complete user info based on the SSO
		 */
		getUserInfo : function(userId, callback) {	
		
				$rootScope.db.transaction(function(tx) {
					tx.executeSql('SELECT * FROM UserInfo WHERE UserId=?', [userId], function(tx, results) {
						if (results && results.rows && results.rows.length > 0) {
							callback(results);
						} else {							
							callback(null);
						}
					});
				});
			
		},
		
		/**
		 * Store CMDB data
		 */
		storeCMDBData : function(data, callback) {
			//console.log(data);
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('INSERT or REPLACE INTO CMDB (Data) VALUES (?)', [JSON.stringify(data)], function(tx, res) {
					if (res && res.rowsAffected && res.rowsAffected == 1) {	
						callback(true);
					} else {					
						callback(false);
					}
				});
			});
		},
		
		deleteCMDBData : function(callback) {			
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('DELETE FROM CMDB', [], function(tx, res) {
					
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		getVisitDetailsData : function(callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('SELECT * FROM CMDB', [], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		/**
		 * Store Customer Information data
		 */
		storeCustInfoData : function(data, callback) {			
			$rootScope.db.transaction(function(tx) {
											   
					var iIndex = 0;
					for (var i = 0; i < data.length; i++) {
						for(var j=0; j<data[i].length; j++){
						if (data[j] && data[i][j].field_name=='sys_id') {												
							tx.executeSql('INSERT or REPLACE INTO CustInfo (SysId,Data) VALUES(?,?)', [data[i][j].field_value, JSON.stringify(data[i])], function(tx, res) {
								iIndex++;
								if (iIndex == data.length) {
									callback(true, "");
								}
																																																																								  							});
						}
					}
					}
											   
											   
											   
				/*tx.executeSql('INSERT or REPLACE INTO CustInfo (Data) VALUES (?)', [JSON.stringify(data)], function(tx, res) {
					if (res && res.rowsAffected && res.rowsAffected == 1) {	
						callback(true);
					} else {					
						callback(false);
					}
				});*/
			});
		},
		
		deleteCustInfoData : function(callback) {			
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('DELETE FROM CustInfo', [], function(tx, res) {
					
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		getCustInfoData : function(callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('SELECT Data FROM CustInfo', [], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		getParticularCustInfoData : function(sysid, callback) {
			console.log(sysid)
			$rootScope.db.transaction(function(tx) {				
				tx.executeSql('SELECT * FROM CustInfo WHERE SysId=?', [sysid], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		/**
		 * Store Temp Spare Inventory data
		 */
		storeTempSpareData : function(data, callback) {			
			$rootScope.db.transaction(function(tx) {
											   
					var iIndex = 0;
					for (var i = 0; i < data.length; i++) {
						for(var j=0; j<data[i].length; j++){
						if (data[j] && data[i][j].field_name=='sys_id') {												
							tx.executeSql('INSERT or REPLACE INTO TempSpareInvntry (SysId,Data) VALUES(?,?)', [data[i][j].field_value, JSON.stringify(data[i])], function(tx, res) {
								iIndex++;
								if (iIndex == data.length) {
									callback(true, "");
								}
																																																																								  							});
						}
					}
					}
											   
											   
											   
				/*tx.executeSql('INSERT or REPLACE INTO CustInfo (Data) VALUES (?)', [JSON.stringify(data)], function(tx, res) {
					if (res && res.rowsAffected && res.rowsAffected == 1) {	
						callback(true);
					} else {					
						callback(false);
					}
				});*/
			});
		},
		
		deleteTempSpareData : function(callback) {			
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('DELETE FROM TempSpareInvntry', [], function(tx, res) {
					
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		getTempSpareData : function(callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('SELECT Data FROM TempSpareInvntry', [], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		getParticularTempSpareData : function(sysid, callback) {
			console.log(sysid)
			$rootScope.db.transaction(function(tx) {				
				tx.executeSql('SELECT * FROM TempSpareInvntry WHERE SysId=?', [sysid], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		
		/**
		 * Store Carrying Spares/Tools data
		 */
		storeCarryingToolsData : function(data, callback) {			
			$rootScope.db.transaction(function(tx) {
											   
					var iIndex = 0;
					for (var i = 0; i < data.length; i++) {
						for(var j=0; j<data[i].length; j++){
						if (data[j] && data[i][j].field_name=='sys_id') {												
							tx.executeSql('INSERT or REPLACE INTO SpareTools (SysId,Data) VALUES(?,?)', [data[i][j].field_value, JSON.stringify(data[i])], function(tx, res) {
								iIndex++;
								if (iIndex == data.length) {
									callback(true, "");
								}
																																																																								  							});
						}
					}
					}				
			});
		},
		
		deleteCarryingToolsData : function(callback) {			
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('DELETE FROM SpareTools', [], function(tx, res) {
					
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		getCarryingToolsData : function(callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('SELECT Data FROM SpareTools', [], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		getParticularCustInfoData : function(sysid, callback) {
			
			$rootScope.db.transaction(function(tx) {				
				tx.executeSql('SELECT * FROM SpareTools WHERE SysId=?', [sysid], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		/**
		 * Store Service Contract Header data
		 */
		storeServiceContractHeaderData : function(data, callback) {			
			$rootScope.db.transaction(function(tx) {
											   
					var iIndex = 0;
					for (var i = 0; i < data.length; i++) {
						for(var j=0; j<data[i].length; j++){
						if (data[j] && data[i][j].field_name=='sys_id') {												
							tx.executeSql('INSERT or REPLACE INTO ServiceHdr (SysId,Data) VALUES(?,?)', [data[i][j].field_value, JSON.stringify(data[i])], function(tx, res) {
								iIndex++;
								if (iIndex == data.length) {
									callback(true, "");
								}
																																																																								  							});
						}
					}
					}						   
				
			});
		},
		
		deleteServiceContractHeaderData : function(callback) {			
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('DELETE FROM ServiceHdr', [], function(tx, res) {
					
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		getServiceContractHeaderData : function(callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('SELECT Data FROM ServiceHdr', [], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		
		/**
		 * Store Service Contract Line data
		 */
		storeServiceContractLineData : function(data, callback) {			
			$rootScope.db.transaction(function(tx) {
										
					var iIndex = 0;
					for (var i = 0; i < data.length; i++) {
						for(var j=0; j<data[i].length; j++){
						if (data[j] && data[i][j].field_lable=='Customer Contract') {												
							tx.executeSql('INSERT or REPLACE INTO ServiceLine (RefId,Data) VALUES(?,?)', [data[i][j].field_refID, JSON.stringify(data[i])], function(tx, res) {
								iIndex++;
								if (iIndex == data.length) {
									callback(true, "");
								}
																																																																								  							});
						}
					}
					}						   
				
			});
		},
		
		deleteServiceContractLineData : function(callback) {			
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('DELETE FROM ServiceLine', [], function(tx, res) {
					
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		getServiceContractLineData : function(callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('SELECT Data FROM ServiceLine', [], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		getParticularServiceLineData : function(recId, callback) {			
			$rootScope.db.transaction(function(tx) {				
				tx.executeSql('SELECT * FROM ServiceLine WHERE RefId=?', [recId], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		
		storePendingTicket : function(ticketId, userId, type, sysUpdatedOn, ticketInfo, callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('INSERT or REPLACE INTO pendingTickets (TicketId,UserId,Type,SysUpdatedOn,TicketInfo) VALUES (?,?,?,?,?)', [ticketId, userId, type, sysUpdatedOn, Tea.encrypt(JSON.stringify(ticketInfo), $rootScope.dbpasscode)], function(tx, res) {
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		},
		
		getPendingTickets : function(userId, callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('SELECT * FROM pendingTickets WHERE UserId=?', [userId], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		getPendingTicketsCount : function(userId, callback) {
			$rootScope.db.transaction(function(tx) {
				tx.executeSql('SELECT COUNT(*) AS count FROM pendingTickets WHERE UserId=?', [userId], function(tx, results) {
					if (results && results.rows && results.rows.length > 0) {
						callback(results);
					} else {
						callback(null);
					}
				});
			});
		},
		
		deletePendingTickets : function(ticketId, callback) {
			$rootScope.db.transaction(function(tx) {											   
				tx.executeSql('DELETE FROM pendingTickets WHERE TicketId=?', [ticketId], function(tx, res) {
					if (res && res.rowsAffected && res.rowsAffected == 1) {
						callback(true);
					} else {
						callback(false);
					}
				});
			});
		}
		
		
	}
})
.factory('pendingTicketUploadProcess', function($ionicLoading, $parse, $rootScope, $q, $http, database, applicationServices, $localstorage) {
	return {
		/**
		 * fetchRecords for My and My group open tickets
		 * @param {Object} ssoid
		 * @param {Object} reqTS
		 * @param {Object} callback
		 */
		fetchRecords : function(ssoid, reqTS, callback) {
			try {
				var promise = applicationServices.getMyAndMyGroupOpenTicketsData(ssoid);
				promise.then(function(payload) {
					if (payload) {
						if (payload && payload.status == 200 && payload.data && payload.data.result && payload.data.result.length > 0) {
							database.storeBulkCompletedTickets(payload.data.result, ssoid, function(data) {
								callback(data);
							});
						}
					}
				}, function(errorPayload) {
				});
			} catch(e) {
			}
		},

		/**
		 * Create the UI of pending items based on the SSOId
		 * @param {Object} ssoid
		 * @param {Object} scope
		 */
		createUI : function(ssoid, scope) {
			try {
				database.getCompletedTickets(ssoid, function(result) {
					if (result && result.rows && result.rows.length > 0) {
						var compltedTaskArray = [];
						for (var i = 0; i < result.rows.length; i++) {
							if (result.rows.item(i).UserId == ssoid) {
								compltedTaskArray.push(angular.fromJson(Tea.decrypt(result.rows.item(i).TicketInfo, $rootScope.dbpasscode)));
							}
						}
						scope.completedItems = compltedTaskArray;
					} else {
						scope.completedItems = [];
					}
				});
			} catch(e) {
			}
		},

		/**
		 * Create the UI after upload for pending items
		 * @param {Object} scope
		 */
		uploadPendingTicketsUI : function(scope) {
			var ssoid = $localstorage.get('SN-LOGIN-SSO')
			if (ssoid) {
				database.getPendingTickets(ssoid, function(result) {
					if (result && result.rows && result.rows.length > 0) {
						for (var i = result.rows.length - 1; i >= 0; i--) {
							scope.pendingListItems.push(angular.fromJson(Tea.decrypt(result.rows.item(i).TicketInfo, $rootScope.dbpasscode)));
						}
						scope.pendingItems = scope.pendingListItems;
					} else {
						scope.pendingItems = [];
					}
				});
			}
		},

		hideServicePleaseWait : function() {
			$ionicLoading.hide();
		},

		/*
		pendingTicektsSettingUI : function(ssoid, scope) {
		try {
		database.getPendingTicketsCount(ssoid, function(results) {
		if (results && results.rows && results.rows.length > 0) {
		// console.log(scope.ptcount);
		setTimeout(function() {
		alert(results.rows.item(0).count);
		scope.ptcount = results.rows.item(0).count;
		scope.$apply();
		//this triggers a $digest
		}, 500);

		}
		});
		} catch(e) {
		}
		},*/

		/**
		 * Create the UI for the uploaded Tickets
		 * @param {Object} scope
		 */
		uploadCompletedTicketsUI : function(scope) {
			var me = this;
			var ssoid = $localstorage.get('SN-USER-NAME')
			if (ssoid) {
				try {
					database.getLatestSysUpdatedTimeTickets(ssoid, function(results) {
						if (results && results.rows && results.rows.length > 0) {
							me.createUI(ssoid, scope);
							var reqTS = "'2014-10-10 23:59:59'";
							try {
								reqTS = results.rows.item(0).SysUpdatedOn;
							} catch(e) {

							}
							me.fetchRecords(ssoid, reqTS, function(data) {
								if (data) {
									me.createUI(ssoid, scope);
								}
							});
						} else {
							var reqTS = "'2014-10-10 23:59:59'";
							me.fetchRecords(ssoid, reqTS, function(data) {
								if (data) {
									me.createUI(ssoid, scope);
								}
							});
						}
					});
				} catch(e) {
				}
			}
		},

		/**
		 * Upload the pending items to service now one by one
		 * @param {Object} ticketform  : Details of the single ticket
		 */
		uploadSingleTicket : function(ticketform) {			
			return $http({
				method : ticketform.methodType,
				url : ticketform.url,
				data : ticketform.data,
				headers : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json',
				},
			}).success(function(data, status, headers, config) {
				if (ticketform.deleteRecord) {
					if (ticketform.type) {
						
						if (ticketform.type == 'VISIT_DETAILS_EDIT') {
							if (ticketform.data.ticketId) {
								database.deletePendingTickets(ticketform.data.ticketId, function(status) {
								});
							}
						} else if (ticketform.type == 'MY_SPARE_PART') {
							if (ticketform.data.number) {
								database.deletePendingTickets(ticketform.data.number + '_OSP', function(status) {
								});
							}
						} else if (ticketform.type == 'ORDER_SPARE_PART') {							
							if (ticketform.data.number) {
								database.deletePendingTickets(ticketform.data.number, function(status) {
								});
							}
						} else if (ticketform.type == 'MY_GROUP_SPARE_PART') {
							if (ticketform.data.number) {
								database.deletePendingTickets(ticketform.data.number + '_OSP', function(status) {
								});
							}
						} else if (ticketform.type == 'CORRECTION') {
							if (ticketform.number) {								
								database.deletePendingTickets(ticketform.number, function(status) {
								});
							}
						} else if (ticketform.type == 'NEWACCOUNT') {
							if (ticketform.data.ticketId) {							
								database.deletePendingTickets(ticketform.data.ticketId, function(status) {
								});
							}
						} else {
							//console.log(ticketform.data.ticketId)
							if (ticketform.data.ticketId) {
								database.deletePendingTickets(ticketform.data.ticketId, function(status) {
								});
							}
						}
					}
				}
			}).error(function(data, status, headers, config) {
				// console.log(data, status, headers, config);
			});
		},

		/**
		 * Start the process of uploading the tickets to SN.
		 * @param {Object} tickets : Ticket queue
		 */
		uploadTicketsSequential : function(tickets) {
			var me = this;
			var previous = $q.when(null)//initial start promise that's already resolved
			for (var i = 0; i < tickets.length; i++) {( function(i) {
						previous = previous.then(function() {//wait for previous operation
							return me.uploadSingleTicket(tickets[i])
						})
					}(i)) //create a fresh scope for i as the `then` handler is asynchronous
			}
			return previous
		},

		/**
		 * Create the request for each and every tickets to service now upload
		 * @param {Object} ticketforms
		 * @param {Object} scope
		 */
		uploadTicketsToServiceNow : function(ticketforms, scope, callback) {
			var tickets = [];
			var me = this;
			for (var i = 0; i < ticketforms.length; i++) {
				var requestType = {
					deleteRecord : "",
					url : "",
					methodType : "",
					type : "",
					data : ""
				};
				console.log(ticketforms[i])
				if (ticketforms[i] && ticketforms[i].Type && ticketforms[i].Type == 'VISIT_DETAILS_EDIT') {
					
					//WIP
					requestType.type = ticketforms[i].Type;
					requestType.deleteRecord = true;
					requestType.url = $rootScope.baseAppURL + '/api/now/table/u_avery_workreq_task/'+ticketforms[i].sys_id+'?sysparm_fields=number';
					requestType.methodType = 'PUT';
					requestType.data = ticketforms[i];
					//console.log(requestType)
					tickets.push(requestType);			
				}			
				
				else {	
							
					
				}
			}
			var uploadOperation = this.uploadTicketsSequential(tickets);
			uploadOperation.then(function(file) {
				me.uploadPendingTicketsUI(scope);
				me.uploadCompletedTicketsUI(scope);
				me.hideServicePleaseWait();
				if (callback) {
					callback();
				}
			}, function(err) {
				me.hideServicePleaseWait();
			});
		},
	}
});