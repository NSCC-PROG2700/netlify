const suitsManager = require('./cardSuitsManager')
const valuesManager = require('./cardValuesManager')
const cardGenerator = require('./cardGenerator')
const payload = require('./payload')
const _ = require('lodash')

module.exports = {
    getRoyalFlush: (event, context, callback) => {
        const randomSuit = suitsManager.getRandomSuit()
        const royalFlushValues = valuesManager.getRoyalFlushValues()

        const cards = royalFlushValues.map(value => {
            return cardGenerator.generateCard(value, randomSuit)
        })

        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getStraightFlush: (event, context, callback) => {
        const suit = suitsManager.getRandomSuit()
        const straight = valuesManager.getStraightValues({ excludeHighAce: true })
      
        cards = straight.map(value => {
          return cardGenerator.generateCard(value, suit)
        })
      
        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getFourOfAKind: (event, context, callback) => {
        const allSuits = suitsManager.getAllSuits()
        const randomValue = valuesManager.getRandomValue()
      
        //generate the four of a kind cards
        const cards = allSuits.map(suit => {
          return cardGenerator.generateCard(randomValue, suit)
        })
      
        //generate one extra card
        const options = {
          exclude: randomValue
        }
        const extraCard = cardGenerator.generateCard(valuesManager.getRandomValue(options),
                                                     suitsManager.getRandomSuit())
        cards.push(extraCard)
        
        payload.cards = _.shuffle(cards)
        
        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getFullHouse: (event, context, callback) => {
        const threeOfAKindSuits = suitsManager.getRandomSuit({ numberOfSuits: 3 })
        const twoOfAKindSuits = suitsManager.getRandomSuit({ numberOfSuits: 2 })
        const threeOfAKindValue = valuesManager.getRandomValue()
        const twoOfAKindValue = valuesManager.getRandomValue({ exclude: threeOfAKindValue })
      
        const allSuits = [...threeOfAKindSuits, ...twoOfAKindSuits]
        const allValues = [...Array(3).fill(threeOfAKindValue), ...Array(2).fill(twoOfAKindValue)]
      
        const cards = allSuits.map((suit, index) => {
          return cardGenerator.generateCard(allValues[index], suit)
        })
      
        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getFlush: (event, context, callback) => {
        const randomSuit = suitsManager.getRandomSuit()
        const highCardHand = valuesManager.getHighCardHand()
      
        const cards = highCardHand.map(value => {
          return cardGenerator.generateCard(value, randomSuit)
        })
      
        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getStraight: (event, context, callback) => {
        const straightValues = valuesManager.getStraightValues()
        //console.log(straightValues)
        const suits = suitsManager.getNonFlushSuitHand()
        //console.log(suits)
      
        const cards = straightValues.map((value, index) => {
          return cardGenerator.generateCard(value, suits[index])
        })
      
        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getThreeOfAKind: (event, context, callback) => {
        const suits = suitsManager.getRandomSuit({ numberOfSuits: 3 })
        const randomValue = valuesManager.getRandomValue()
      
        //generate the three of a kind cards
        const cards = suits.map(suit => {
          return cardGenerator.generateCard(randomValue, suit)
        })
      
        //generate and add two extra cards to go with the three of a kind
        const options = {
          numberOfValues: 2,
          exclude: randomValue //exclude the value from the three of a kind
        }
        valuesManager.getRandomValue(options).forEach(value => {
          const newCard = cardGenerator.generateCard(value, suitsManager.getRandomSuit())
          cards.push(newCard)
        })
      
        //build the payload
        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getTwoPair: (event, context, callback) => {
        const firstPairSuits = suitsManager.getRandomSuit({ numberOfSuits: 2 })
        const secondPairSuits = suitsManager.getRandomSuit({ numberOfSuits: 2 })
        const pairValues = valuesManager.getRandomValue({ numberOfValues: 2 })
        const fifthCardValue = valuesManager.getRandomValue({ exclude: pairValues })
      
        const cards = []
        firstPairSuits.forEach(suit => {
          cards.push(cardGenerator.generateCard(pairValues[0], suit))
        })
        secondPairSuits.forEach(suit => {
          cards.push(cardGenerator.generateCard(pairValues[1], suit))
        })
        cards.push(cardGenerator.generateCard(fifthCardValue, suitsManager.getRandomSuit()))
      
        //build the payload
        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getOnePair: (event, context, callback) => {
        const suits = suitsManager.getRandomSuit({ numberOfSuits: 2 })
        const randomValue = valuesManager.getRandomValue()
      
        //generate the pair
        const cards = suits.map(suit => {
          return cardGenerator.generateCard(randomValue, suit)
        })
      
        //generate and add three extra cards to go with the pair
        const options = {
          numberOfValues: 3,
          exclude: randomValue //exclude the value from the pair
        }
        valuesManager.getRandomValue(options).forEach(value => {
          const newCard = cardGenerator.generateCard(value, suitsManager.getRandomSuit())
          cards.push(newCard)
        })
      
        //build the payload
        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    },
    getHighCard: (event, context, callback) => {
        function isAllSameSuit(arrayOfSuits){
            if(arrayOfSuits.length <= 1){
              return false;
            }
            for(let i=1; i<arrayOfSuits.length; i++){
              if(arrayOfSuits[i].code !== arrayOfSuits[i-1].code){
                return false;
              }
            }
            return true;
        }
        
        const highCardHand = valuesManager.getHighCardHand()
    
        const randomSuits = []
        while(randomSuits.length < 5){
            const newSuit = suitsManager.getRandomSuit()
            if(randomSuits.length < 4){
                randomSuits.push(newSuit)
            } else if (!isAllSameSuit(randomSuits)) {
                randomSuits.push(newSuit)
            } else if (randomSuits[0].code !== newSuit.code) {
                randomSuits.push(newSuit)
            }
        }
    
        const cards = []
        highCardHand.forEach((value, index) => {
            cards.push(cardGenerator.generateCard(value, randomSuits[index]))
        })
    
        //build the payload
        payload.cards = _.shuffle(cards)

        callback(null, {
            statusCode: 200,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload)
        })
    }
}