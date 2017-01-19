
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
