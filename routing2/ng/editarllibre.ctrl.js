angular.module('appLearn').controller('EditarLlibreController', function($scope, $location, LlibresService) {
    LlibresService.fetch().success(function(llibres) {
        $scope.llibres = llibres;
    }).error(function(e) {
        console.log(e);
    });
    if(LlibresService.editarLlibre == null) {
        $location.path('/');
    } else {
        $scope.editarIsbn = LlibresService.editarLlibre.isbn;
        $scope.editarTitol = LlibresService.editarLlibre.titol;
        $scope.editarAutors = LlibresService.editarLlibre.autors;
        $scope.llibreAEditar = LlibresService.editarLlibre;
    }
    $scope.actualitzarLlibre = function(llibre) {
        if($scope.editarIsbn != undefined) {
            LlibresService.update($scope.llibreAEditar.isbn, {
                isbn: $scope.editarIsbn,
                titol: $scope.editarTitol,
                autors: $scope.editarAutors
            }).success(function() {
                LlibresService.llibreAEditar.isbn = $scope.editarIsbn;
                LlibresService.llibreAEditar.titol = $scope.editarTitol;
                LlibresService.llibreAEditar.titol = $scope.editarAutors;
                $scope.editarIsbn = null;
                $scope.editarTitol = null;
                $scope.editarAutors = null;
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
 
 
 
 
 *  **/