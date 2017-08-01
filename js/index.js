// JavaScript Document

var desktopVersion = true;
var pleaseWait = "Please wait";
var pleaseWaitSp = "Please Wait";
var loading = "Loading...";
var fetchingUserInfo = "Please Wait Fetching User Info..."; 
var unableFetchUserInfo = "Unable to fetch user info. Please try after some time.";
var unableToUpload = "Unable to upload data, please check your network connection";
var instanceNameBlank = "Please enter the instance name";
var unableToCheck = "Unable to verify the data, Please try again after some time";
var uploadingTicket = "Please wait, updating data";
var instanceInvalidMsg = "You are not authorized to use this application. For more information please contact support@inmorphis.com";

// Page Title
var settingPageTitle = "Settings";


//Controller
//Controller
var wantToExit = "Are you sure you want to exit ?";
var wantToLogout = "Are you sure you want to logout ?";
var passcodeNotSaved = "Application passcode is yet not saved. Please login in online mode and set the Passcode.";
var passcodeNotSame = "Passcode and re-enter passcode are not same.";
var passcodeLength = "Passcode must be 4 digits only.";
var passcodeNumber = "Passcode must be 4 digits only, no character value is allowed.";
var reenterPasscode = "Please re-enter passcode";
var enterPasscode = "Please enter passcode";
var defectHierarchyTitle = "Defect Hierarchy Details";
var wrongPasscode = "Wrong Passcode. Please try again.";
var enterFourDigitPasscode = "Please enter your four digit passcode";
var emptyPasscode = "Empty Passcode.";
var oldPasscodeNotMatching = "Your old passcode is not matching";
var correctOldPasscode = "Please enter the correct old passcode";
var enterOldPasscode = "Please enter Old Passcode, New Passcode and Confirm Passcode";
var passcodeUpdated = "Passcode updated successfully";
var myOpenTicketTitle = "New Ticket";
// Validation message
var priorityEmpty = "Please select the priority";
var statusEmpty = "Please select the status";
var acceptanceDate = "Please select the acceptance date";




var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
// Called when a photo is successfully retrieved
//

function onPhotoDataSuccess(imageURI) {
	//alert("fire");
    // Uncomment to view the base64-encoded image data
    console.log(imageURI);
    // Get image handle
    //
    var cameraImage = document.getElementById('image');
    // Unhide image elements
    //
    cameraImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    cameraImage.src = imageURI;
}
// Called when a photo is successfully retrieved
//

function onPhotoURISuccess(imageURI) {
	//alert("fire");
    // Uncomment to view the image file URI
    console.log(imageURI);
    // Get image handle
    //
    var galleryImage = document.getElementById('image');
    // Unhide image elements
    //
    galleryImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    galleryImage.src = imageURI;
}
// A button will call this function
//

function capturePhoto() {
	//alert('camera')
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}
// A button will call this function
//

function getPhoto(source) {
	//alert('gallery')
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
// Called if something bad happens.
//

function onFail(message) {
    //alert('Failed because: ' + message);
}

function upload() {
    var img = document.getElementById('image');
    var imageURI = img.src;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, "https://www.example.com/upload.php", win, fail,
        options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
