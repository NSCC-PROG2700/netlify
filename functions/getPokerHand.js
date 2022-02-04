const functions = require('./pokerHand/functions')

exports.handler = (event, context, callback) => {
    //console.log(event.path)    
    let subPath = event.path.split('/')[2];
    //console.log(subPath)

    switch(subPath.toLowerCase()){
        case 'royalflush': {
            functions.getRoyalFlush(event, context, callback)
            break;
        }
        case 'straightflush': {
            functions.getStraightFlush(event, context, callback)
            break;
        }
        case 'fourofakind': {
            functions.getFourOfAKind(event, context, callback)
            break;
        }
        case 'fullhouse': {
            functions.getFullHouse(event, context, callback)
            break;
        }
        case 'flush': {
            functions.getFlush(event, context, callback)
            break;
        }
        case 'straight': {
            functions.getStraight(event, context, callback)
            break;
        }
        case 'threeofakind': {
            functions.getThreeOfAKind(event, context, callback)
            break;
        }
        case 'twopair': {
            functions.getTwoPair(event, context, callback)
            break;
        }
        case 'onepair': {
            functions.getOnePair(event, context, callback)
            break;
        }
        case 'highcard': {
            functions.getHighCard(event, context, callback)
            break;
        }
        default: {
            callback(null, { statusCode: 404 })
        }
    }
}