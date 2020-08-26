const path = require('path')
const express = require('express') //express is a function 
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//console.log(__dirname)
//console.log(__filename)

const app = express()
const port = process.env.PORT || 3000 //Heroku port or local port

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//create for dynamic templates, depend on the folder 'views'
//Setup handlebars engin and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    //render handlebars: first argument matches the name of view (the hbs file)
    //second argument ia an object contains all of the values you want the view to be access
    res.render('index', {
        title: 'Weather',
        name: 'Evii'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Evii'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some helpful message',
        name: 'Evii'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
            console.log(location)
            console.log(forecastData)
        })
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search item'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Evii',
        errorMessage: 'Help article not found'
    })
})

// * means match anything that hasn't been matched so far
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Evii',
        errorMessage: 'Page not found'
    })
})


// //req: request, res: response
// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

//send HTML: res.send('<h1>Weather</h1>)
//send object (automatically convert it to JSON): res.send({name: 'Andrew', name: 27})

//app.com
//app.com/help
//app.com/about


//start the server up at port 3000
//the default port for http is 80
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})