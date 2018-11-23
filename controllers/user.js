'use strict'

const bcrypt = require('bcrypt-nodejs');
const mongoosePaginate = require('mongoose-pagination');
const User = require('../models/user');
const jwt = require('../services/jwt');

//metodo de prueba
const home = (req, res) => {
  res.status(200).send({
    message: 'HOLA MUNDO desde el servidor NodeJS'
  });
};

const pruebas = (req, res) => {
  console.log(req.body);
  res.status(200).send({
    message: 'Acción de pruebas con el servidor NodeJS'
  });
};

//Registro de usuarios
const saveUser = (req, res) => {
    let params = req.body;
    let user = new User();

    if (params.name && params.surname && params.email && params.password){
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        /*Control de usuarios duplicados */
        User.find({ $or: [
            {email: user.email.toLowerCase()}
        ]}).exec((err, users) => {
            if (err) return res.status(500).send({message: 'Error en la petición de usuarios'});

            if (users && users.length >= 1) {
                return res.status(200).send({message: 'El usuario que intentas registrar ya existe'});
            } else {
                    /* Cifra y guarda los datos */
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({message:'Error al guardar el usuario'});

                        if (userStored){
                            res.status(200).send({user:userStored});
                        } else {
                            res.status(404).send({message:'No se ha registrado el usuario'});
                        }
                    });
                });
            }
        });
    } else {
        res.status(200).send({
            message: 'Envia todos los campos necesarios!'
        });
    }
}

//Login
const loginUser = (req, res) => {
    let params = req.body;
    let email = params.email;
    let password = params.password;

    User.findOne({email: email}, (err, user) => {
        if (err) return res.status(500).send({message: 'Error en la petición'});

        if (user){
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){

                    if (params.gettoken){
                        //Devolver y generar token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });

                    } else {
                        //Devolver los datos del usuario
                        user.password = undefined;
                        return res.status(200).send({user})
                    }

                } else {
                    return res.status(404).send({message: 'El usuario no se ha podido identificar'});
                }
            });

        } else {
            return res.status(404).send({message: 'El usuario no se ha podido identificar¡!'});
        }
    });

}

//Conseguir datos de un usuario como objeto
const getUser = (req, res) => {
    let userId = req.params.id;

    User.findById(userId, (err, user) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});

        if(!user) return res.status(404).send({message: 'El usuario no existe'});

        return res.status(200).send({user});
    });
}

//Devolver un listado de usuarios paginado
const getUsers = (req, res) => {

    let identity_user_id = res.user.sub;
    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    }

    let itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        return res.status(500).send({message: 'Error en la petición'});

        if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});

        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total/itemsPerPage)
        });
    });
}

module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers
}
