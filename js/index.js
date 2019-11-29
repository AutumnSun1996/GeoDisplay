'use strict';
const emptyData = { 'type': 'FeatureCollection', 'features': [] };


const map = new mapboxgl.Map({
    container: 'map', // container id
    zoom: 8,
    bearing: 0,
    pitch: 0,
    style: {
        "version": 8,
        'sprite': location.href + 'sprite/sprite',
        'sources': {
            "Source": {
                'type': 'geojson',
                'data': emptyData
            }
        },
        "light": {
            "anchor": "viewport",
            "color": "white",
            "intensity": 0
        },
        "layers": layers
    },
});

var popup = new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: true,
}).addTo(map);

map.on('load', () => {
    updateSource();
});

map.on('click', (e) => {
    var features = map.queryRenderedFeatures(e.point);
    var sep = document.getElementById('seperator').value;
    sep = sep.replace(/\\[trn]/g, (a) => {
        return eval(`"${a}"`);
    });
    var prefix = document.getElementById('prefix').value;
    var text = `${prefix}${e.lngLat.lng}${sep}${prefix}${e.lngLat.lat}`;
    var copyArea = document.getElementById('copyArea');
    copyArea.value = text;
    copyArea.select();
    document.execCommand('copy');

    var info = [e.lngLat.lng + ',' + e.lngLat.lat];
    for (let feature of features) {
        info.push(JSON.stringify(feature.properties));
    }
    var html = info.join('<br>');
    popup.setLngLat(e.lngLat).setHTML(html);
    if (!popup.isOpen()) {
        popup.addTo(map);
    }
    console.log(e.lngLat, features, ids, names);
});

function findCoordinate(feature) {
    var geom = feature['geometry'];
    if (!geom) {
        return findCoordinate(feature['features'][0])
    }
    var lvl = 1;
    var coordinate = geom['coordinates'];
    while(typeof coordinate[0] != "number"){
        coordinate = coordinate[0]
    }
    console.log(coordinate)
    return coordinate;
}

function updateSource() {
    map.getSource("Source").setData(emptyData);
    var source = document.getElementById("source").value;
    fetch(source).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(`${source} loaded`, data);
        map.getSource("Source").setData(data);
        map.jumpTo({
            center: findCoordinate(data)
        });
    });
}

function rotate(degree) {
    var bearing = map.getBearing() + degree;
    map.setBearing(bearing);
    console.log("bearing now:", bearing);
}
document.addEventListener("keydown", (event) => {
    console.log("keydown:", event, event.code)
    switch (event.code) {
        case "KeyH":
            $(".banner").toggle();
            break;
        case "KeyE":
            if (event.shiftKey) {
                rotate(-0.1);
            } else {
                rotate(-0.5);
            }
            break;
        case "KeyQ":
            if (event.shiftKey) {
                rotate(0.1);
            } else {
                rotate(0.5);
            }
            break;
    }
})