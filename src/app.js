const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
//Define path for Express config.

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location.

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directories to use.

app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App!',
        name:'Srikanta Pradhan',
        footer :'siku@gmail.com'
    });
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name : 'Srikanta Pradhan',
        footer: 'siku@gmail.com'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title : 'Help!',
        name : 'Srikanta Pradhan',
        helpText:'This page is to help you.',
        footer: 'siku@gmail.com'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Srikanta Pradhan',
        errorMessage:'Help article not found!',
        footer: 'siku@gmail.com'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Srikanta Pradhan',
        errorMessage: 'Page not found!',
        footer: 'siku@gmail.com'
    })
})

app.listen(3000, () =>{
    console.log('Server is upon port 3000.')
})