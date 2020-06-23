const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath));

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Nandini'
    });
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Nandini'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'How may i help u?',
        title: 'Help',
        name: 'Nadnini'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send ({
            error: 'Enter the search query'
        });
    }
        geocode(req.query.address,(error, { latitude, longitude, location }={}) => {
            if(error){
                return res.send ({
                    error
                });
            }
            forecast(latitude,longitude,(error, forecastData)=>{
                if(error){
                    return res.send ({
                        error
                    });
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            })
        })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Nandini',
        message: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404error', {
        title: '404',
        name: 'Nandini',
        message: 'Page not found'
    });
})

app.listen(port, () => {
    console.log(`Server is set up at ${port}`);
})