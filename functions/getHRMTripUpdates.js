const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request')

exports.handler = (event, context, callback) => {
    //console.log(event.queryStringParameters.route === undefined)

    //set up request for remote Open Halifax Data Endpoint
    const requestSettings = {
        method: 'GET',
        url: 'http://gtfs.halifax.ca/realtime/TripUpdate/TripUpdates.pb',
        encoding: null
    };

    //make the request
    request(requestSettings, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);

            const features = feed.entity
            if(event.queryStringParameters.route !== undefined){
                features = features.filter(entity =>  event.queryStringParameters.route.replace(' ','').split(',').includes(entity.tripUpdate.trip.routeId))
            }

            callback(null, {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(features)
            })

        } else {
            //console.log('error')
            callback(null, {
                statusCode: 400,
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({message: 'error'})
            })
        }
    });
}