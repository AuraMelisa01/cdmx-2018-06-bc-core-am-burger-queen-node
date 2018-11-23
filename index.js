'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;

//Conexion Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/burger_Queen', {useNewUrlParser: true})
  .then(() => {
    console.log('La conexión a la base de datos burger_Queen se ha realizado correctamente.');
    //Crear servidor
    app.listen(port, () => {
      console.log("Servidor corriendo en http://localhost:3800");
    });
  })
  .catch(err => console.log(err));


// const express = require('express');
// const mongoose = require('mongoose');
// const config = require('./config');
// const authMiddleware = require('./middleware/auth');
// const errorHandler = require('./middleware/error');
// const routes = require('./routes');
// const pkg = require('./package.json');


// const { port, mongoUrl, secret } = config;
// const app = express();


// // Conectar aplicación a MongoDB
// mongoose.connect(mongoUrl, { useNewUrlParser: true });


// app.set('config', config);
// app.set('pkg', pkg);


// app.use(express.json());
// app.use(authMiddleware(secret));


// // Registrar rutas
// routes(app, (err) => {
//   if (err) {
//     throw err;
//   }

//   // Registro de "middleware" que maneja posibles errores
//   app.use(errorHandler);

//   app.listen(port, () => console.log(`App listening on port ${port}`));
// });
