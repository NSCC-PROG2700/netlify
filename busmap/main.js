(function(){
    var map = L.map('map').setView([44.669070, -63.613196], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
	
	L.circle([44.66909051825041, -63.61322564706731], {radius: 1000}).addTo(map);

    //var geoJSON = L.geoJSON(null).addTo(map);

    //generate custom bus icon
    var BusIcon = L.Icon.extend({
        options: {
            iconSize:       [36, 36],
            iconAnchor:     [18, 18],
            popupAnchor:    [0, -18]
        }
    });
    var busIcon = new BusIcon({iconUrl: 'bus.png'})

    //add empty geojson layer...will be updated once data arrives
    var busesGeoJSONLayer = L.geoJSON(
        null, 
        {
            pointToLayer: function (feature, latlng) {
                    // bus icon marker
                    return L.marker(latlng, 
                        {
                            icon: busIcon, 
                            rotationAngle: feature.properties.bearing
                        })
                        //.bindPopup(getPopupDisplay(feature));
            }
        }
    )//.addTo(map);
    
    var numbersGeoJSONLayer = L.geoJSON(
        null, 
        {
            pointToLayer: function (feature, latlng) {
                    // div marker
                    var i = L.divIcon({
                        className: 'number-icon',
                        iconSize: [18,18],
                        iconAnchor: [9,9],
                        html: feature.properties.trip.routeId,
                        popupAnchor: [0, -9]
                    });
                    return L.marker(latlng, { icon: i })

                    // div marker
                    var i = L.divIcon({
                        className: 'count-icon',
                        iconSize: [22,22],
                        iconAnchor: [11,11],
                        html: feature.properties.trip.routeId,
                        popupAnchor: [0, -10]
                    });
                    return L.marker(latlng, { icon: i })
            }
        }
    )//.addTo(map);

    var featureGroup = L.featureGroup()
    .addLayer(busesGeoJSONLayer)
    .addLayer(numbersGeoJSONLayer)
    .addTo(map);

    // var myIcon = L.divIcon({className: 'my-div-icon'});
    // // you can set .my-div-icon styles in CSS
    // L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);


    var routes = []; //make empty for all buses
    var getData = () => {
        const urlParams = new URLSearchParams(window.location.search)
        const route = urlParams.get('route')
        let queryString = '';
        if(route !== null){
            queryString = `?route=${route}`
        }


        //fetch(`http://localhost:9000/getHRMBusesGeoJson${queryString}`)
	    //fetch(`https://prog2700.netlify.com/.netlify/functions/getHRMBusesGeoJson${queryString}`)
		fetch(`https://hrmbusapi.herokuapp.com/geojson${queryString}`)
        .then(response => response.json())
        .then(json => {
            json.features = json.features.filter(item => routes.length === 0 || routes.includes(item.properties.trip.routeId))
            console.log(json);
            busesGeoJSONLayer.clearLayers();
            numbersGeoJSONLayer.clearLayers();
            busesGeoJSONLayer.addData(json);
            numbersGeoJSONLayer.addData(json);
            setTimeout(getData, 12000);
        })
        .catch(err => {
            console.log(`Error: ${err}`)
            setTimeout(getData, 12000);
        })
    }

    getData()
})();