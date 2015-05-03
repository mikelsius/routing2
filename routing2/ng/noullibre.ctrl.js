angular.module('appLearn').controller('NouLlibreController', function($scope, $location, LlibresService) {
    LlibresService.fetch().success(function(llibres) {
        $scope.llibres = llibres;
    }).error(function(e) {
        console.log(e);
    });
    $scope.afegirLlibre = function() {
        if($scope.titol != undefined && $scope.isbn != undefined) {
            LlibresService.create({
                isbn: $scope.isbn,
                titol: $scope.titol,
                autors: $scope.autors,
                date: $scope.date //Date.now
            }).success(function(llibre) {
                $scope.llibres.unshift(llibre);
                $scope.isbn = null;
                $scope.titol = null;
                $location.path('/');
            });
        }
    };
});


/**
 
 
    $scope.borrarLlibre = function(llibre) {
        LlibresService.delete(llibre.isbn).success(function() {
            $scope.llibres.splice($scope.llibres.indexOf(llibre), 1);
        });
    };
    $scope.editarLlibre = function(llibre) {
        $scope.editarTitol = llibre.titol;
        $scope.editarIsbn = llibre.isbn;
        $scope.llibre_editar = llibre;
    }
    $scope.actualizarLlibre = function() {
        if($scope.editarIsbn != undefined) {
            LlibresService.update($scope.llibre_editar.isbn, {
                isbn: $scope.editarTitol,
                titol: $scope.editarTitol
            }).success(function() {
                $scope.llibre_editar.isbn = $scope.editarIsbn;
                $scope.llibre_editar.titol = $scope.editarTitol;
                $scope.editarIsbn = null;
                $scope.editarTitol = null;
            });
        }
    };
 
 
 
 
 *  **/         $scope.editarTitol = null;
            });
        }
    };
 
 
 
 
 *  **/