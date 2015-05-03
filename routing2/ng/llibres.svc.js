angular.module('appLearn').service("LlibresService", function($http) {
    console.error("patata error")
    this.fetch = function() {
        return $http.get("/api/llibres");
    };
    this.create = function(llibre) {
        return $http.post("/api/llibres", llibre);
    };
    this.delete = function(isbn) {
        return $http.delete("/api/llibres/" + isbn);
    };
    this.update = function(isbn, llibre) {
        return $http.put("/api/llibres" + isbn, llibre);
    };
});