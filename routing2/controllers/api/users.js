var router = require("express").Router();
var bcrypt = require("bcrypt");
var jwt = require('jwt-simple');
var User = require("../../models/users");
var config = require("../../config");

router.get('/', function(req, res, next) {
    if(!req.headers['x-auth']) return res.status(401).json({
        "Mensaje": "Error de autenticación"
    });
    var auth = jwt.decode(req.headers['x-auth'], config.secret);
    User.findOne({
        username: auth.username
    }, function(err, user) {
        if(err) return next(err);
        res.status(200).json(user);
    });
});

router.post('/', function(req, res, next) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if(err) return next(err);
        if(user) {
            res.status(409).json({
                "Mensaje": "El usuario ya existe"
            });
        } else {
            var nouUser = new User({
                username: req.body.username
            });
            bcrypt.hash(req.body.password, 11, function(err, hash) {
                if(err) return next(err);
                nouUser.password = hash;
                nouUser.save(function(err) {
                    if(err) return next(err);
                    res.status(201).json({
                        "Mensaje": "Usuario autenticado"
                    });
                });
            });
        }
    });
});

module.exports = router;