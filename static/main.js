/**
 * @file main.js
 * @brief js logic for the Ausbildungszentrum-Website
 * @author Frederic Stapel
 */


// Variables
var pinchZoomElement = document.getElementById('map-div');
var scaling = false;
var initialDist;
var currentScale = 1;
var mid_x = 0; // detect the middle between the finger touches...
var mid_y = 0; // ...to zoom at a certain position
var lastScale = 1; // make the difference to the last step visible


/**
 * open Navbar from the left
 *
 */
function openNav() {
    document.getElementById("sidebar").style.width = "100%";
    document.getElementById("map-div").style.marginLeft = "100%";
    window.scrollTo(0, 0);
    $('#opennav').hide();
    $('#closenav').show();
    $('#map-img').hide();
    document.body.style.overflow = "auto";
}


/**
 * close Navbar to the left
 *
 */
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("map-div").style.marginLeft = "0";
    $('#opennav').show();
    $('#closenav').hide();
    $('#map-img').show();
    window.scrollTo(0, 0);
    if (currentScale > 1) {
        document.body.style.overflow = "auto";
    } else {
        //document.body.style.overflow = "hidden";
    }
}


$(document).ready(function() {
    $('#closenav').hide();
    window.scrollTo(0,0);
    if(screen.width < 1000) {
        $('#ctrl_plus').hide();
        $('#ctrl_minus').hide();
        console.log("Removed + and - (only for desktop environments).");
    }
});


/**
 *  Zoom to a certain subject on the map
 * @param {String} topic abbrev. for the subject
 */
function zoom_to(topic) {
    closeNav();
    zoom_in();
    switch (topic) {
        case 'IKFM':
            window.scrollTo(0, 200);
            break;
        case 'INFSYS':
            window.scrollTo(0, 0);
            break;
        case 'INFAPP':
            window.scrollTo(0, 0);
            break;
        case 'MGDP':
            window.scrollTo(0, 220);
            break;
        case 'GIM':
            window.scrollTo(0, 220);
            break;
        case 'WZM':
            window.scrollTo(250, 300);
            break;
        case 'TPD':
            window.scrollTo(0, 220);
            break;
        case 'ELK':
            window.scrollTo(100, 250);
            break;
        case 'FL':
            window.scrollTo(250, 300);
            break;
        case 'WING':
            window.scrollTo(0, 180);
            break;
        case 'ET':
            window.scrollTo(300, 100);
            break;
        case 'MB':
            window.scrollTo(0, 250);
            break;
        case 'INF':
            window.scrollTo(200, 0);
            break;
        case 'WINF':
            zoom_in();
            window.scrollTo(200,0);
        default:
            console.log("Not found.");
            break;
        }
        document.body.style.overflow = "auto";
    // document.getElementById("map-img").style.transform = 'scale(2.0)';
}


/**
 * Basic zoom-in function for desktop users
 * and the zoom_to function
 */
function zoom_in() {
    document.getElementById('map-div').style.width = "200%";
    currentScale = 2;
    document.body.style.overflow = "auto";
}


/**
 * Basic zoom-out function for desktop users
 */
function zoom_out() {
    document.getElementById('map-div').style.width = "100%";
    currentScale = 1;
    window.scrollTo(0, 0);
    //document.body.style.overflow = "hidden";
}


// PINCH-ZOOMING METHODS

/**
 * 
 */
function pinchStart(e) {
    initialDist = getDistance(e.touches[0], e.touches[1]);
}

/**
 * 
 */
function pinchMove(e) {
    var currentDist = getDistance(e.touches[0], e.touches[1]);
    var scale = currentDist / initialDist;
    currentScale = lastScale * scale;

    currentScale = Math.min(Math.max(currentScale, 1), 3); // limit Zoom to 1 - 3

    // pinchZoomElement.style.transform = 'translate(-50%, -50%) scale(' + currentScale + ')';
    
    document.getElementById('map-div').style.width = "" + currentScale * 100 + "%";
    var deltaX = pinchZoomElement.offsetLeft - mid_x;
    var deltaY = pinchZoomElement.offsetTop - mid_y;

    window.scrollBy({
        left: deltaX * scale,
        top: deltaY * scale,
        behavior: 'smooth'  // Optional: Fügt eine Scrollanimation hinzu
    });

    //console.log('current Zoom:', currentScale.toFixed(2));
    e.preventDefault(); // no other zooming allowed
}


/**
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
