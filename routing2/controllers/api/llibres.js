var Llibre = require("../../models/llibre");
var router = require("express").Router();

router.get("/", function(req, res, next) {
    Llibre.find().sort('-date').exec(function(err, llibre) {
        if(err) {
            return next(err);
        }
        res.json(llibre);
    });
});

router.post("/", function(req, res, next) {
    if(req.auth) {
        var llibre = new Llibre({
            isbn: req.body.isbn,
            titol: req.body.titol,
            autors: req.body.autors,
            date: req.body.date
        });
        console.log(llibre);
        llibre.save(function(err, llibre) {
            if(err) {
                return next(err)
            }
            res.status(201).json(llibre);
        });
    } else {
        res.status(401).json({
            "Mensaje": "No está autorizado"
        });
    }
});

router.put("/:isbn", function(req, res, next) {
    if(req.auth) {
        var id = req.params.isbn;
        Llibre.findOne({
            'isbn': id
        }, function(err, llibre) {
            if(err) {
                return next(err);
            }
            if(!llibre) res.status(403).json({
                "Mensaje Error:": "El libro que buscas no existe"
            });
            Llibre.findByIdAndUpdate(llibre._id, req.nom, function(err) {
                if(err) {
                    return next(err);
                }
                res.status(201).json({
                    "Mensaje": "Actualizado Correctamente"
                });
            });
        });
    } else {
        res.status(401).json({
            "Mensaje": "No está autorizado"
        });
    }
});

router.delete("/:isbn", function(req, res, next) {
    if(req.auth) {
        var id = req.params.isbn;
        var rastreator = Llibre.findOne({
            'isbn': id
        });
        rastreator.exec(function(err, llibre) {
            if(err) {
                return handleError(err);
            }
            if(llibre == null) {
                return res.send("El libro no existe");
            }
            llibre.remove(function(err) {
                res.send("El libro se ha eliminado correctamente");
            });
        });
    } else {
        res.status(401).json({
            "Mensaje": "Actualizado Correctamente"
        });
    }
});

module.exports = router;