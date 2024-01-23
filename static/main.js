function openNav() {
    document.getElementById("sidebar").style.width = "100%";
    document.getElementById("content").style.marginLeft = "100%";
    window.scrollTo(0, 0);
    $('#opennav').hide();
    $('#closenav').show();
    $('#map-img').hide();
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("content").style.marginLeft = "0";
    $('#opennav').show();
    $('#closenav').hide();
    $('#map-img').show();
    window.scrollTo(0, 0);
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
    // document.getElementById("map-img").style.transform = 'scale(1.5)';
    document.getElementById('content').style.width = "200%";

    // var image = $('#map-img');
    // image.animate({
    //     width: image.width() * 2,
    //     height: image.height() * 2
    // }, 200);
}


function zoom_out() {
    // document.getElementById("map-img").style.transform = 'scale(1)';
    document.getElementById('content').style.width = "100%";

    // var image = $('#map-img');
    // image.animate({
    //     width: image.width() / 2,
    //     height: image.height() / 2
    // }, 200);
}
