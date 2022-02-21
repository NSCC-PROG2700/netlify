const pokerhand = require('@macaines/pokerhand')

exports.handler = (event, context, callback) => {
    
    //remove substring if in event.path
    let eventPath = event.path.replace('/.netlify/functions', '')
    let subPath = eventPath.split('/')[2];

    const response = {}
    let responseBody;

    switch(subPath.toLowerCase()){
        case 'royalflush': {
            responseBody = pokerhand.generateRoyalFlush(); break;
        }
        case 'straightflush': {
            responseBody = pokerhand.generateStraightFlush(); break;
        }
        case 'fourofakind': {
            responseBody = pokerhand.generateFourOfAKind(); break;
        }
        case 'fullhouse': {
            responseBody = pokerhand.generateFullHouse(); break;
        }
        case 'flush': {
            responseBody = pokerhand.generateFlush(); break;
        }
        case 'straight': {
            responseBody = pokerhand.generateStraight(); break;
        }
        case 'threeofakind': {
            responseBody = pokerhand.generateThreeOfAKind(); break;
        }
        case 'twopair': {
            responseBody = pokerhand.generateTwoPair(); break;
        }
        case 'onepair': {
            responseBody = pokerhand.generatePair(); break;
        }
        case 'highcard': {
            responseBody = pokerhand.generateHighCard(); break;
        }
        default: {
            response.statusCode = 404
        }
    }

    if(response.statusCode !== 404){
        response.statusCode = 200
        response.headers = {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
        response.body = JSON.stringify(responseBody)
    }

    callback(null, response)
}