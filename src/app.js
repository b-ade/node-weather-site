const path = require('path')
const express = require('express')
const hbs = require('hbs')
const gc = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public/index.html'))
const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Awesome'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{title:'About',name:'Awesome'})
})

app.get('/help',(req,res) => {
    res.render('help', { 
        title: 'Help', 
        name: 'Awesome',
        help_message: 'Do not worry, you will be alright' 
    })
})

app.get('/weather',({query},res) => {
    console.log(query)
    const address = query.address
    if(!query.address)
        return res.send({error: 'Address mut be provided'})
        
    console.log('Should fetch weather for ',query.address)
    gc(query.address,(error,{latitude,longitude,location} = {}) => {
        if(error)
            return res.send({unable:'Unable to determine location, please try again later',error})
        
        forecast(latitude,longitude,(error,forcastData) => {
            if(error)
                return res.send({error})
            res.send({location,address,forcastData})
        })
    })
})

app.get('/products',({query},res) => {
    console.log(query)
    if(!query.name){
        return res.send({error: 'you must provide a product name'})
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'4 0 4',
        error_message: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'4 0 4',
        error_message: 'This if what you get when you request for a page not found'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})