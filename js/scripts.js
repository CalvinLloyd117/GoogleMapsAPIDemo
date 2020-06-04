var activeInfoWindow;

/***********************************************************
 * Function to add a marker to a map.button
 * Parameters: 
 * map - A google maps object, which the marker will be added to.button
 * location - A latLng object, which defined the latitude and longitude 
 * where the marker will be added.
 * options: an options object, which can contain attributes that denote 
 * the iconImage, marker type, etc.
 *  The options parameter is not required, and all of the information can be put into the location object instead.
 * This was added so the user can have more control over the markers.
 */
function addMarker(map, location, options = {}) {
    //if the location has a coords attribute, use that
    if (location.coords) {
        var marker = new google.maps.Marker({
            position: location.coords,
            map: map,
            label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: 'Your text here' }
        });
        //otherwise, the location is a latLng object
    } else {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }
    if (location.iconImage) {
        marker.setIcon(location.iconImage);
    } else if (options.iconImage) {
        marker.setIcon(options.iconImage);
    } else if (location.type) {
        marker.setIcon(icons[location.type].icon)
    } else if (options.type) {
        marker.setIcon(icons[options.type].icon)
    }
    if (location.info) {
        var infoWindow = new google.maps.InfoWindow({
            content: location.info
        });
        marker.addListener('click', function() {
            //infoWindow.open(map, marker);
            if (activeInfoWindow) { activeInfoWindow.close(); }
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;
        });
    } else if (options.info) {
        var infoWindow = new google.maps.InfoWindow({
            content: options.info
        });
        marker.addListener('click', function() {
            //infoWindow.open(map, marker);
            if (activeInfoWindow) { activeInfoWindow.close(); }
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;
        });
    }
    //return marker
}
/***************************************
 * Function to return the lat/lng of a location on click. 
 * To be used as an on-click listener.
 */
function getLatLng(event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    setTimeout(console.log.bind(console, '{ lat: ' + latitude + ', lng: ' + longitude + ' },'));
    //console.log('{ lat: ' + latitude + ', lng: ' + longitude + ' },');
}

function addCircle(map, location, options, radius) {
    var Circle = new google.maps.Circle({
        map: map,
        center: location
    })
    if (radius) {
        Circle.setOptions({ radius: radius })
    } else if (options.radius) {
        Circle.setOptions({ radius: options.radius })
    } else {
        Circle.setOptions({ radius: 1000 })
    }
    if (options.strokeColor) {
        Circle.setOptions({ strokeColor: options.strokeColor })
    }
    if (options.strokeOpacity) {
        Circle.setOptions({ strokeOpacity: options.strokeOpacity })
    }
    if (options.strokeWeight) {
        Circle.setOptions({ strokeWeight: options.strokeWeight })
    }
    if (options.fillColor) {
        Circle.setOptions({ fillColor: options.fillColor })
    }
    if (options.fillOpacity) {
        Circle.setOptions({ fillOpacity: options.fillOpacity })
    }
    if (location.info) {
        var infoWindow = new google.maps.InfoWindow({
            content: location.info
                //position: location
        });
        Circle.addListener('click', function(event) {
            console.log('circle clicked')
                //infoWindow.open(map, marker);
            if (activeInfoWindow) { activeInfoWindow.close(); }
            console.log('window should open')
            infoWindow.setPosition(event.latLng)
            infoWindow.open(map);
            activeInfoWindow = infoWindow;
        });
    } else if (options.info) {
        var infoWindow = new google.maps.InfoWindow({
            content: options.info
                //position: location
        });
        Circle.addListener('click', function(event) {
            console.log('circle clicked')
            if (activeInfoWindow) { activeInfoWindow.close(); }
            console.log('window should open')
            infoWindow.setPosition(event.latLng)
            infoWindow.open(map);
            activeInfoWindow = infoWindow;
        });
    }
}

function addShape(map, path, options) {
    var Shape = new google.maps.Polygon({
        map: map,
        paths: path,
        strokePosition: google.maps.StrokePosition.OUTSIDE,
    })
    if (options.strokeColor) {
        Shape.setOptions({ strokeColor: options.strokeColor })
    }
    if (options.strokeOpacity) {
        Shape.setOptions({ strokeOpacity: options.strokeOpacity })
    }
    if (options.strokeWeight) {
        Shape.setOptions({ strokeWeight: options.strokeWeight })
    }
    if (options.fillColor) {
        Shape.setOptions({ fillColor: options.fillColor })
    }
    if (options.fillOpacity) {
        Shape.setOptions({ fillOpacity: options.fillOpacity })
    }
    if (options.info) {
        var infoWindow = new google.maps.InfoWindow({
            content: options.info
        });
        Shape.addListener('click', function(event) {
            console.log('circle clicked')
            if (activeInfoWindow) { activeInfoWindow.close(); }
            console.log('window should open')
            infoWindow.setPosition(event.latLng)
            infoWindow.open(map);
            activeInfoWindow = infoWindow;
        });
    }
}

function addOverlay(map, location, image) {
    var north1 = location.lat + 0.15
    var south1 = location.lat - 0.1
    var east1 = location.lng + 0.225
    var west1 = location.lng - 0.225

    var imageBounds = {
        north: north1,
        south: south1,
        east: east1,
        west: west1
    };

    historicalOverlay = new google.maps.GroundOverlay(image,
        imageBounds);
    historicalOverlay.setMap(map);
}