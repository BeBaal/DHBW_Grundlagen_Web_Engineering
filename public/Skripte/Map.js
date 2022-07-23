
window.addEventListener('load', function () {

    /* Hier ist der Code für die Map */
    var map = L.map('map').setView([52.968932166810234, 7.620386952639823], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);


})