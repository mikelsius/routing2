angular.module("appLearn", []),
angular.module("appLearn").controller("LlibresController", ["$scope", "LlibresService",
    function(e, s) {
        s.fetch().success(function(s) {
            e.llibres = s
        }).error(function(e) {
            console.log(e)
        }), e.afegirLlibre = function() {
            e.isbn && s.create({
                isbn: e.isbn,
                titol: e.titol,
                autors: e.autors,
                date: e.date
            }).success(function(s) {
                e.llibres.unshift(s), e.isbn = null
            })
        }, e.borrarLlibre = function(f) {
            s["delete"](f.isbn).success(function() {
                e.llibres.splice(e.llibres.indexOf(f), 1)
            })
        }
    }
]), angular.module("appLearn").service("LlibresService", ["$http",
    function(e) {
        this.fetch = function() {
            return e.get("/api/llibres")
        }, this.create = function(llibre) {
            return e.post("/api/llibres", llibre)
        }, this["delete"] = function(llibre) {
            return e["delete"]("/api/llibres/" + llibre)
        }, this.update = function(llibre, f) {
            return e.put("/api/llibres/" + llibre, f)
        }
    }
]);

/*angular.module("app", []), angular.module("app").controller("LlibresController", ["$scope", "LlibresService",
    function(i, l) {
        l.fetch().success(function(l) {
            i.llibres = l
        }).error(function(i) {
            console.log(i)
        }), i.afegirLlibre = function() {
            void 0 != i.llibreTitol & void 0 != i.llibreIsbn && l.create({
                titol: i.llibreTitol,
                isbn: i.llibreIsbn
            }).success(function(l) {
                i.llibres.unshift(l), i.llibreIsbn = null, i.llibreTitol = null
            })
        }, i.borrarLlibre = function(e) {
            l["delete"](e.isbn).success(function() {
                i.llibres.splice(i.llibres.indexOf(e), 1)
            })
        }, i.cancelarLlibre = function() {
            void 0 != i.llibreTitol & void 0 != i.llibreIsbn && (i.llibreIsbn = null, i.llibreTitol = null)
        }, i.cancelarEdicio = function() {
            void 0 != i.editarTitol & void 0 != i.editarIsbn && (i.editarIsbn = null, i.editarTitol = null)
        }, i.editarLlibre = function(l) {
            i.editarTitol = l.titol, i.editarIsbn = l.isbn, i.llibre_Editar = l
        }, i.actualitzarLlibre = function() {
            void 0 != i.editarTitol & void 0 != i.editarIsbn && l.update(i.llibre_Editar.isbn, {
                titol: i.editarTitol,
                isbn: i.editarIsbn
            }).success(function() {
                i.llibre_Editar.isbn = i.editarIsbn, i.llibre_Editar.titol = i.editarTitol, i.editarIsbn = null, i.editarTitol = null
            })
        }
    }
]), angular.module("app").service("LlibresService", ["$http",
    function(i) {
        this.fetch = function() {
            return i.get("/api/llibres")
        }, this.create = function(l) {
            return i.post("/api/llibres", l)
        }, this["delete"] = function(l) {
            return i["delete"]("/api/llibres/" + l)
        }, this.update = function(l, e) {
            return i.put("/api/llibres/" + l, e)
        }
    }
]);*/

/**
var app = angular.module('appLearn', []);
app.controller('LlibresController', function($scope, LlibresService) {
    LlibresService.fetch().success(function(llibres) {
        $scope.llibres = llibres;
    }).error(function(e) {
        console.log(e);
    });
    $scope.afegirLlibre = function() {
        if(($scope.titol != undefined) & ($scope.isbn != undefined)) {
            LlibresService.create({
                isbn: $scope.isbn,
                titol: $scope.titol,
                autors: "Gimenez con G",
                date: "12-12-12"
            }).success(function(llibre) {
                $scope.llibres.unshift(llibre);
            });
        }
    };
    $scope.esborrarLlibre = function(llibre) {
        LlibresService.romove(llibre.isbn).success(function() {
            $scope.llibres.splice($scope.llibres.indexOf(llibre), 1);
        });
    };
    $scope.editarLlibre = function(llibre) {
        LlibresService.update(llibre.isbn, {
            titol: $scope.titol
        }).success(function() {
            //$scope.llibres.codi = $scope.codi;
        });
    };
});
app.service("LlibresService", function($http) {
    this.fetch = function() {
        return $http.get("/api/llibres");
    };
    this.create = function(llibre) {
        return $http.post("/api/llibres", llibre);
    };
    this.romove = function(llibre) {
        return $http.delete("/api/llibres/" + llibre);
    };
    this.update = function(producte) {
        return $http.put("/api/llibres/" + isbn, llibre);
    };
});**/