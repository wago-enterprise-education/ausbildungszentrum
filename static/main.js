function openNav() {
    document.getElementById("sidebar").style.width = "100%";
    document.getElementById("map-div").style.marginLeft = "100%";
    window.scrollTo(0, 0);
    $('#opennav').hide();
    $('#closenav').show();
    $('#map-img').hide();
    document.body.style.overflow = "auto";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("map-div").style.marginLeft = "0";
    $('#opennav').show();
    $('#closenav').hide();
    $('#map-img').show();
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
}

$(document).ready(function() {
    $('#closenav').hide();
    window.scrollTo(0,0);
});

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
    // document.getElementById("map-img").style.transform = 'scale(2.0)';
}


function zoom_in() {
    document.getElementById('map-div').style.width = "200%";
}


function zoom_out() {
    document.getElementById('map-div').style.width = "100%";
}


// PINCH-ZOOMING METHODS

var pinchZoomElement = document.getElementById('map-div');
var scaling = false;
var initialDist;
var currentScale = 1;
var mid_x = 0; // detect the middle between the finger touches...
var mid_y = 0; // ...to zoom at a certain position

function pinchStart(e) {
    initialDist = getDistance(e.touches[0], e.touches[1]);
}

function pinchMove(e) {
    var currentDist = getDistance(e.touches[0], e.touches[1]);
    var scale = currentDist / initialDist;

    currentScale = Math.min(Math.max(scale, 1), 3); // limit Zoom to 1 - 3

    pinchZoomElement.style.transform = 'scale(' + currentScale + ')';
    //pinchZoomElement.style.left = mid_x + 'px';
    //pinchZoomElement.style.right = mid_y + 'px';
    console.log('current Zoom:', currentScale.toFixed(2));
}

function getDistance(touch1, touch2) {
    mid_x = (touch1.pageX + touch2.pageX) * 0.5;
    mid_y = (touch1.pageY + touch2.pageY) * 0.5;
    return Math.hypot(
        touch1.pageX - touch2.pageX,
        touch1.pageY - touch2.pageY
    );
}

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
        scaling = false;
    }
});

