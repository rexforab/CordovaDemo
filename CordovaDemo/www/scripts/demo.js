

function saveData()
{
    var data = { name: 'Test', date: Date.now() };
    writeData(data);
    $("#btnSaveData").text("Saved");
    $("#btnSaveData").addClass("flash");
    setTimeout(function () {
        $("#btnSaveData").text("Save Data").removeClass("flash");;
    }, 3000);

}

function writeData(jsonData) {
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        console.log('file system open: ' + fs.name);
        fs.root.getFile("data.json", { create: true, exclusive: false }, function (fileEntry) {

            writeFile(fileEntry, jsonData);
            


        }, onErrorCreateFile);

    }, onErrorLoadFs);

    //return false;
}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function () {
            console.log("Successful file write...");
            //readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}

function loadData() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getFile("data.json", { create: true, exclusive: false }, function (fileEntry) {
                readFile(fileEntry);
        }, onErrorCreateFile);
    }, onErrorLoadFs);
}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function () {
            console.log("Successful file read: " + this.result);
            //displayFileData(fileEntry.fullPath + ": " + this.result);

            var obj = JSON.parse(this.result);
            $("#lblData").text("date: " + obj.date);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
}


function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true,  //Corrects Android orientation quirks
        saveToPhotoAlbum: true
    }
    return options;
}

function savePhoto() {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    var func = saveIt; //createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageData) {

        displayImageFromData(imageData);

        // You may choose to copy the picture, save it somewhere, or upload.
        func(imageData);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function getPhoto() {
    navigator.camera.getPicture(function (imageUri) {
        displayImageFromUri(imageUri, "gotImage");
    }, 
    function (error) {
        alert(error);
    },
    {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}

function displayImageFromUri(imgUri, imgId) {

    var elem = document.getElementById(imgId);
    elem.src = imgUri;
}

function displayImageFromData(imageData) {

    var elem = document.getElementById('imageFile');
    elem.src = "data:image/jpeg;base64," + imageData;
}

function onErrorCreateFile(error) {
    alert(error);
    return false;
}

function onErrorLoadFs(error) {
    alert(error);
    return false;
}

function onErrorReadFile(error)
{
    alert(error);
    return false;
}

function saveIt(imageData) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

        console.log('file system open: ' + fs.name);
        fs.root.getFile("newImage.jpg", { create: true, exclusive: false }, function (fileEntry) {

            console.log("fileEntry is file?" + fileEntry.isFile.toString());
            // fileEntry.name == 'someFile.txt'
            // fileEntry.fullPath == '/someFile.txt'
            writeFile(fileEntry, imageData);

        }, onErrorCreateFile);

    }, onErrorLoadFs);
}

function createNewFileEntry(imgUri) {
    var onErrorCreateFile = function () { alert('error creating file') };
    var onErrorResolveUrl = "fakeurl";

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

            // Do something with it, like write to it, upload it, etc.
            writeFile(fileEntry, imgUri);
            console.log("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");

        }, onErrorCreateFile);

    });
}




function takePhoto() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}
function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    document.getElementById("text1").innerHTML = imageData;
}
function onFail(message) {
    alert('Failed because: ' + message);
}



function getLocation() {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, { enableHighAccuracy: true });

    return false;

}

function locationSuccess(position) {
    //alert('Latitude: ' + position.coords.latitude + '\n' +
    //      'Longitude: ' + position.coords.longitude + '\n' +
    //      'Altitude: ' + position.coords.altitude + '\n' +
    //      'Accuracy: ' + position.coords.accuracy + '\n' +
    //      'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
    //      'Heading: ' + position.coords.heading + '\n' +
    //      'Speed: ' + position.coords.speed + '\n' +
    //      'Timestamp: ' + position.timestamp + '\n');

    $("#lblCurrentLocation").text('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude);
};

function locationError(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}
