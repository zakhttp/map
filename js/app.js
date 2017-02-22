// Create the map
var map = L.map('map');

// Add a tile layer, this can be used to add background maps like open street maps ...
L.tileLayer('', {
    maxZoom: 10,
    minZoom: 1,
    continuousWorld: true,
    // detectRetina: true,
    unloadInvisibleTiles: true,
    noWrap: true,
    updateWhenIdle: true,
    opacity: 1,
}).addTo(map);

// Tell the map to show all the countries independently of screen size
map.fitWorld().zoomIn();

// Set the map's initial view the the initial coordinates
map.setView([30.372875, -6.503906]);

// Add the geojson data to the map, this data is contained in /data/world.js or world.min.js which is the minified version to be used in production
var geojson = L.geoJson(worldEn, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// Add style to the countries features
function style(feature) {
    return {
        fillColor: '#fff',
        weight: 0.5,
        lineJoin: 'round',
        lineCap: 'round',
        opacity: 1,
        color: '#EB3B41',
        fillOpacity: 1
    };
}

// This funciton will apply to each feature (country), to it i attached mouse events
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: layerMouseOverHandler,
        mouseout: layerMouseOutHandler,
        click: layerClickHandler
    });

    function layerMouseOverHandler(event) {
        // highlight feature on mouse over
        var layer = event.target;
        layer.setStyle({
            weight: 1,
            color: '#EB3B41',
            fillColor: '#fbd8d9'
        });

        // display country name on hover in the body
        $('#country-name').text(layer.feature.properties.ADMIN);
        $('#country-ISO-3').text(layer.feature.properties.ISO_A3);
    }

    function layerMouseOutHandler(event) {
        // reset feature style on mouse out
        geojson.resetStyle(event.target);

    }

    function layerClickHandler(event) {
        map.fitBounds(event.target.getBounds());
    }

}
