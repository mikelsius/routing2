angular.module('appLearn').controller('LlibresController', function($scope, $location, LlibresService) {
    LlibresService.fetch().success(function(llibres) {
        $scope.llibres = llibres;
    });
    $scope.esborrarllibre = function(llibre) {
        LlibresService.delete(llibre._id).success(function() {
            var pos = $scope.llibres.indexOf(llibre);
            $scope.llibres.splice(pos, 1);
        });
    };
    $scope.editarllibre = function(llibre) {
        LlibresService.edit(llibre);
        $location.path('/editarllibre');
    };
});
