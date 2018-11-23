'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_burger_melisa_aura';

exports.ensureAuth = function(req, res, next) {
  if(!req.headers.authorization){
    return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
  }

  let token = req.headers.authorization.replace(/['"]+/g, '');


  try {
    let payload = jwt.decode(token, secret);
    if(payload.exp <= moment().unix()){
      return res.status(401).send({
        message: 'El token ha expirado'
      })
      req.user = payload;
    }
  } catch(ex) {
     return res.status(404).send({
        message: 'El token no es válido'
      });
  }

  next();
}






// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// module.exports = secret => (req, resp, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return next();
//   }

//   const [type, token] = authorization.split(' ');

//   if (type.toLowerCase() !== 'bearer') {
//     return next();
//   }

//   jwt.verify(token, secret, (err, decodedToken) => {
//     if (err) {
//       return next(403);
//     }

//     User.findById(decodedToken.uid, (err, user) => {
//       if (err) {
//         return next(500);
//       }

//       if (!user) {
//         return next(404);
//       }

//       Object.assign(req, { auth: { token, decodedToken, user } });
//       return next();
//     });
//   });
// };


// module.exports.isAuthenticated = req => (
//   req.auth
//   && req.auth.user
//   && req.auth.user._id
// );


// module.exports.isAdmin = req => (
//   module.exports.isAuthenticated(req)
//   && req.auth.user.roles
//   && req.auth.user.roles.admin
// );


// module.exports.requireAuth = (req, resp, next) => (
//   (!module.exports.isAuthenticated(req))
//     ? next(401)
//     : next()
// );


// module.exports.requireAdmin = (req, resp, next) => (
//   (!module.exports.isAuthenticated(req))
//     ? next(401)
//     : (!module.exports.isAdmin(req))
//       ? next(403)
//       : next()
// );
