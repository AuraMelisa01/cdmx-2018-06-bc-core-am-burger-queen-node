'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//cargar rutas
const user_routes = require('./routes/users');

//middlewares -- es un metodo que se ehecuta antes de que llegue a un controlador y se ejecuta en cada peticion
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());//convierte lo que le llega en el body de la peticion a un objeto JSON

//cors

//rutas
app.use('/api', user_routes);


//exportar
module.exports = app;
