const path = require('path');
const express = require('express');
const hbs = require('hbs');
//console.log(path.join(__dirname,))
const app = express();
//Getting the API functions
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const address = '';


//Define paths for Express Configuration
const publicDirectoryPath =path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')  

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name:'Rushabh Surana'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Rushabh Surana'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title:'HELP',
        msg:'This is a help page',
        name:'Rushabh Surana'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }else{
        geocode(req.query.address, (error, {latitude,longitude,location} ={}) => {
            if(error){
                res.send({error});
            }
          forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({error});
            } 
            res.send({
            forecast:forecastData,location,
            address:req.query.address
            })
          });
        });
        
    }
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404 Page',
        message: 'Help Page/Article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404 Page',
        message: 'Page Does not Exist'
    })
})

//Basic Query Strings
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.seacrh)
    res.send({
        products:[]
    })


})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})