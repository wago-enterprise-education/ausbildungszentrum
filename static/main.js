/**
 * @file main.js
 * @brief js logic for the Ausbildungszentrum-Website
 * @author Frederic Stapel
 */


// Variables
var pinchZoomElement = document.getElementById('map-div'); // essentially the map itself
var scaling = false; // Bool for event handling
var initialDist; // Initial dist of the pinch fingers
var currentScale = 1; // current zoom factor
// var mid_x = 0; // detect the middle between the finger touches...
// var mid_y = 0; // ...to zoom at a certain position
var lastScale = 1; // make the difference to the last step visible


$(document).ready(function() {
    window.scrollTo(0,0);
    if(screen.width < 1000) {
        $('#ctrl_plus').hide();
        $('#ctrl_minus').hide();
        console.log("Removed + and - (only for desktop environments).");
    }
});


/**
 * open Navbar from the left
 *
 */
function openNav() {
    document.querySelector(".sidebar").classList.add("open");
}


/**
 * close Navbar to the left
 *
 */
function closeNav() {
    document.querySelector(".sidebar").classList.remove("open");
}


/**
 *  Zoom to a certain subject on the map
 * @param {String} topic abbrev. for the subject
 */
function zoom_to(topic) {

    var rooms = {};

    // room coordinates for zoom  to 300 %
    rooms["office"] = [0, 60];
    rooms["project"] = [0, 180];
    rooms["it_schulung"] = [0, 300];
    rooms["it_schulung_flur"] = [50, 300];
    rooms["workshop_2_3_4"] = [0, 400];
    rooms["e_ausbildung"] = [200, 400];
    rooms["meetings"] = [150, 150];
    rooms["studenten_1"] = [370, 0];
    rooms["studenten_2"] = [550, 0];
    rooms["labore"] = [450, 150];
    rooms["sonderprojekte"] = [650, 150];
    rooms["werkstatt"] = [500, 500];

    closeNav();
    zoom_in();
    window.scrollTo({
        top: rooms[topic][1],
        left: rooms[topic][0],
        behavior: "smooth",
    });
    document.body.style.overflow = "auto";
}


/**
 * Basic zoom-in function for desktop users
 * and the zoom_to function
 */
function zoom_in() {
    document.getElementById('map-div').style.width = "300%";
    currentScale = 3;
    lastScale = currentScale;
    document.body.style.overflow = "auto";
}


/**
 * Basic zoom-out function for desktop users
 */
function zoom_out() {
    document.getElementById('map-div').style.width = "100%";
    currentScale = 1;
    lastScale = currentScale;
    window.scrollTo(0, 0);
}


// PINCH-ZOOMING METHODS
// TODO: Maybe use https://github.com/manuelstofer/pinchzoom for the zoom?
/**
 * Start pinch zooming
 */
function pinchStart(e) {
    initialDist = getDistance(e.touches[0], e.touches[1]);
}


/**
 * Move and zoom the window to a certain position
 */
function pinchMove(e) {
    var currentDist = getDistance(e.touches[0], e.touches[1]);
    var scale = currentDist / initialDist;
    currentScale = lastScale * scale;

    currentScale = Math.min(Math.max(currentScale, 1), 3); // limit Zoom to 1 - 3

    // pinchZoomElement.style.transform = 'translate(-50%, -50%) scale(' + currentScale + ')';
    
    document.getElementById('map-div').style.width = "" + currentScale * 100 + "%";
    // var deltaX = pinchZoomElement.offsetLeft - mid_x;
    // var deltaY = pinchZoomElement.offsetTop - mid_y;

    // window.scrollBy({
    //     left: deltaX * scale,
    //     top: deltaY * scale,
    //     behavior: 'smooth'
    // });

    //console.log('current Zoom:', currentScale.toFixed(2));
    e.preventDefault(); // no other zooming allowed
}


/**
 * End of pinch zoom
 * Save current scale for the next scaling
 * @param {*} e 
 */
function pinchEnd(e) {
        lastScale = currentScale;
        if (lastScale == 1) {
            window.scrollTo(0, 0);
            //document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
}


/**
 * Calculate the distance between two points
 * @param {*} touch1 touch position 1
 * @param {*} touch2 touch position 2
 * @returns calculated distance between both points
 */
function getDistance(touch1, touch2) {
    mid_x = (touch1.pageX + touch2.pageX) * 0.5;
    mid_y = (touch1.pageY + touch2.pageY) * 0.5;
    return Math.hypot( // hypotenuse
        touch1.pageX - touch2.pageX,
        touch1.pageY - touch2.pageY
    );
}


// EVENT LISTENERS for the touch related events

pinchZoomElement.addEventListener('touchstart', function (e) {
    if (e.touches.length === 2) {
        scaling = true;
        pinchStart(e);
    }
});

pinchZoomElement.addEventListener('touchmove', function (e) {
    if (scaling) {
        pinchMove(e);
    }
});

pinchZoomElement.addEventListener('touchend', function (e) {
    if (scaling) {
        pinchEnd(e);
        scaling = false;
    }
});





// GPS PArt


// funkction that converts gps coordinates in px coordinates
function convert_gps_to_px(lat, lon) {
    // GPS coordinates of the map
    const gpsCoords = {
        "gps_left_top_office": [52.29872332103037, 8.92066718559268],
        "gps_left_bottom_workshop_2_3_4": [52.29840902385728, 8.920667733399881],
        "gps_right_top_eingang": [52.29885741458489, 8.921552314563716],
        "gps_right_bottom_werkstatt": [52.298129859657074, 8.921555615716422]
    };

    const pxCoords = {
        "gps_left_top_office": [18, 199],
        "gps_left_bottom_workshop_2_3_4": [18, 387],
        "gps_right_top_eingang": [359, 116],
        "gps_right_bottom_werkstatt": [336, 546]
    };

    // Calculate the pixel coordinates based on the GPS coordinates
    var latRange = gpsCoords.gps_left_top_office[0] - gpsCoords.gps_left_bottom_workshop_2_3_4[0];
    var lonRange = gpsCoords.gps_right_top_eingang[1] - gpsCoords.gps_left_top_office[1];

    var latRatio = (lat - gpsCoords.gps_left_bottom_workshop_2_3_4[0]) / latRange;
    var lonRatio = (lon - gpsCoords.gps_left_top_office[1]) / lonRange;

    var pxX = pxCoords.gps_left_top_office[0] + lonRatio * (pxCoords.gps_right_top_eingang[0] - pxCoords.gps_left_top_office[0]);
    var pxY = pxCoords.gps_left_bottom_workshop_2_3_4[1] - latRatio * (pxCoords.gps_left_bottom_workshop_2_3_4[1] - pxCoords.gps_left_top_office[1]);

    pxX = Math.round(pxX);
    pxY = Math.round(pxY);

    return [pxX, pxY];
}

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError, { timeout: 100 });
    } else {
        document.getElementById('location').innerText = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    [pxX, pxY] = convert_gps_to_px(latitude, longitude);

    // Add marker to the map
    const marker = document.createElement('div');
    marker.id = 'gps-marker';
    marker.style.position = 'absolute';
    marker.style.width = '10px';
    marker.style.height = '10px';
    marker.style.backgroundColor = 'red';
    marker.style.borderRadius = '50%';
    marker.style.top = `${pxY}px`;
    marker.style.left = `${pxX}px`;
    document.getElementById('map-div').appendChild(marker);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('location').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').innerText = "An unknown error occurred.";
            break;
    }
}
