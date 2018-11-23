'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_burger_melisa_aura';

exports.createToken = (user) => {
    let payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //Fecha
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret)
};
