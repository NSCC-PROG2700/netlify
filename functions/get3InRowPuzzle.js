const puzzle6x6 = require('../json/3inarow/6x6a.json')
const puzzle8x8 = require('../json/3inarow/8x8a.json')
const puzzle10x10 = require('../json/3inarow/10x10a.json')
const puzzle14x14 = require('../json/3inarow/14x14a.json')

exports.handler = (event, context, callback) => {

    let puzzle;
    const random = Math.floor(Math.random() * 4) + 1;

    //console.log(random);

    switch(random){
        case 1:{ puzzle = puzzle6x6; break; }
        case 2:{ puzzle = puzzle8x8; break; }
        case 3:{ puzzle = puzzle10x10; break; }
        case 4:{ puzzle = puzzle14x14; break; }
    }

    callback(null, {
        statusCode: 200,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(puzzle)
    })
}