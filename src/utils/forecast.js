const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d869998a9e0ab2bfbbea9c9577248a37/' + latitude + ',' + longtitude
    //using shorthand for object url
    request({url, json: true}, (error, {body}) => {//using destructuring for response.body
        if (error) {
            callback('Unable to connect the network!', undefined)
        } else if (body.error) { 
            callback('Unable to find location!', undefined)
        } else {
            const temp = body.currently.temperature
            const precipProb = body.currently.precipProbability * 100
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. The High today is ' + body.daily.data[0].temperatureHigh + ', with a low of '+ body.daily.data[0].temperatureLow + '. There is a ' +  + precipProb + '% chance of rain. ')
        }
    })
}

module.exports = forecast


// //dark sky API
// const url = 'https://api.darksky.net/forecast/d869998a9e0ab2bfbbea9c9577248a37/37.8267,-122.4233'

// request({url: url, json: true}, (error, response) => {
//     if (error) {
//          console.log('Unable to connect the network!')
//     } else if (response.body.error) {
//         console.log('Unable to find location!')
//     }
//     else {
//         const temp = response.body.currently.temperature
//         const precipProb = response.body.currently.precipProbability * 100
//         console.log(response.body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. There is a ' + precipProb + "% chance of reain.")
//     }
// })
