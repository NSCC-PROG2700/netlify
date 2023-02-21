var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request')

exports.handler = (event, context, callback) => {
    //console.log(event.queryStringParameters.route === undefined)

    //set up request for remote Open Halifax Data Endpoint
    const requestSettings = {
        method: 'GET',
        url: 'http://gtfs.halifax.ca/realtime/Vehicle/VehiclePositions.pb',
        encoding: null
    };

    //make the request
    request(requestSettings, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
            let features = feed.entity
            if(event.queryStringParameters.route !== undefined){
                features = features.filter(entity =>  event.queryStringParameters.route.replace(' ','').split(',').includes(entity.vehicle.trip.routeId))
            }
            features = features.map(entity => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [entity.vehicle.position.longitude, entity.vehicle.position.latitude]
                    },
                    properties: {
                        trip: entity.vehicle.trip,
                        vehicle: entity.vehicle.vehicle,
                        bearing: entity.vehicle.position.bearing,
                        speed: entity.vehicle.position.speed
                    }
                }
            })

            const collection = {
                type: "FeatureCollection",
                features: features
            }

            callback(null, {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(collection)
            })

        } else {
            //console.log('error')
        }
    });
}