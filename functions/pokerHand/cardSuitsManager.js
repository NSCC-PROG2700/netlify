const suits = require('./cardSuits')
const _ = require('lodash')

module.exports = {
    getAllSuits: () => {
        return suits
    },
    getRandomSuit: (options) => {
        let shuffled = _.shuffle(suits) //creates a copy
       
        if(options && options.hasOwnProperty('numberOfSuits')){
            if(options.numberOfSuits > 4){
                return [...shuffled, shuffled[Math.floor(Math.random() * shuffled.length)]]
            }
            else if(options.numberOfSuits > 1){
                return shuffled.slice(0, options.numberOfSuits)
            }
        }
        return shuffled[0]
    }
}
