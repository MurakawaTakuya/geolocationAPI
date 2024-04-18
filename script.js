function getLocationPeriodically() {
    if (navigator.geolocation) {
        let interval_time = 10000; // 10 seconds interval
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }, interval_time);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

let count = 1;
function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    document.getElementById("latitude").innerHTML = "Latitude: " + latitude;
    document.getElementById("longitude").innerHTML = "Longitude: " + longitude;
    document.getElementById("count").innerHTML = "Count: " + count++;

    let iframe = document.getElementById("mapframe");
    iframe.src = `https://maps.google.co.jp/maps?ll=${latitude},${longitude}&q=${latitude},${longitude}&output=embed&t=m&z=25`;
    
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

getLocationPeriodically();
