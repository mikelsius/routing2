angular.module("appLearn", ["ngRoute"]), angular.module("appLearn").controller("ApplicationController", ["$scope", "$location", "UserSvc",
    function(e, t, r) {
        e.$on("login", function(t, r) {
            e.currentUser = r
        }), e.logout = function() {
            r.logOut(), delete e.currentUser, t.path("/")
        }
    }
]), angular.module("appLearn").controller("EditarMissatgeController", ["$scope", "$location", "MissatgesService",
    function(e, t, r) {
        e.missatgeBody = r.missatgeToEdit.body, e.editarMissatge = function() {
            e.missatgeBody && r.put({
                _id: r.missatgeToEdit._id,
                body: e.missatgeBody
            }).success(function() {
                r.missatgeToEdit.body = e.missatgeBody, e.missatgeBody = null, t.path("/")
            })
        }
    }
]), angular.module("appLearn").controller("LlibresController", ["$scope", "$location", "LlibresService",
    function(e, t, r) {
        r.fetch().success(function(t) {
            e.llibres = t
        }), e.esborrarllibre = function(t) {
            r["delete"](t._id).success(function() {
                var r = e.llibres.indexOf(t);
                e.llibres.splice(r, 1)
            })
        }, e.editarllibre = function(e) {
            r.edit(e), t.path("/editarllibre")
        }
    }
]), angular.module("appLearn").controller("LlibresController", ["$scope", "LlibresService",
    function(e, t) {
        t.fetch().success(function(t) {
            e.llibres = t
        }).error(function(e) {
            console.log(e)
        }), e.afegirLlibre = function() {
            void 0 != e.titol && void 0 != e.isbn && t.create({
                isbn: e.isbn,
                titol: e.titol,
                autors: e.autors,
                date: e.date
            }).success(function(t) {
                e.llibres.unshift(t), e.isbn = null, e.titol = null
            })
        }, e.borrarLlibre = function(r) {
            t["delete"](r.isbn).success(function() {
                e.llibres.splice(e.llibres.indexOf(r), 1)
            })
        }, e.editarLlibre = function(t) {
            e.editarTitol = t.titol, e.editarIsbn = t.isbn, e.llibre_editar = t
        }, e.actualizarLlibre = function() {
            void 0 != e.editarIsbn && t.update(e.llibre_editar.isbn, {
                isbn: e.editarTitol,
                titol: e.editarTitol
            }).success(function() {
                e.llibre_editar.isbn = e.editarIsbn, e.llibre_editar.titol = e.editarTitol, e.editarIsbn = null, e.editarTitol = null
            })
        }
    }
]), angular.module("appLearn").service("LlibresService", ["$http",
    function(e) {
        console.error("patata error"), this.fetch = function() {
            return e.get("/api/llibres")
        }, this.create = function(t) {
            return e.post("/api/llibres", t)
        }, this["delete"] = function(t) {
            return e["delete"]("/api/llibres/" + t)
        }, this.update = function(t, r) {
            return e.put("/api/llibres" + t, r)
        }
    }
]), angular.module("appLearn").controller("LoginController", ["$scope", "$location", "UserSvc",
    function(e, t, r) {
        e.$watchGroup(["username", "password"], function(t, r) {
            t != r && (e.error = null)
        }), e.login = function(i, o) {
            i && o ? r.login(i, o, function(t, r) {
                401 == r && (e.error = t.missatge)
            }).success(function() {
                r.getUser().then(function(r) {
                    e.$emit("login", r.data), t.path("/")
                })
            }) : e.error = "Has d'emplenar tots els camps"
        }
    }
]), angular.module("appLearn").controller("MissatgesController", ["$scope", "$location", "MissatgesService",
    function(e, t, r) {
        r.fetch().success(function(t) {
            e.missatges = t
        }), e.esborrarMissatge = function(t) {
            r["delete"](t._id).success(function() {
                var r = e.missatges.indexOf(t);
                e.missatges.splice(r, 1)
            })
        }, e.editarMissatge = function(e) {
            r.edit(e), t.path("/editarmissatge")
        }
    }
]), angular.module("appLearn").service("MissatgesService", ["$http",
    function(e) {
        this.fetch = function() {
            return e.get("/api/missatges")
        }, this.create = function(t) {
            return e.post("/api/missatges", t)
        }, this["delete"] = function(t) {
            return console.log(t), e["delete"]("/api/missatges/" + t)
        }, this.edit = function(e) {
            this.missatgeToEdit = e
        }, this.put = function(t) {
            return e.put("/api/missatges", t)
        }
    }
]), angular.module("appLearn").controller("NouMissatgeController", ["$scope", "$location", "MissatgesService",
    function(e, t, r) {
        e.afegirMissatge = function(i) {
            console.log(e.missatgeBody), e.missatgeBody && r.create({
                body: e.missatgeBody
            }).success(function() {
                t.path("/")
            })
        }
    }
]), angular.module("appLearn").controller("RegistreController", ["$scope", "$location", "UserSvc",
    function(e, t, r) {
        e.registre = function(i, o, n) {
            e.$watchGroup(["username", "password", "password2"], function(t, r) {
                t != r && (e.error = null)
            }), o && n && i ? o === n ? r.registre(i, o).success(function(e) {
                t.path("/login")
            }).error(function(t, r) {
                409 == r && (e.error = t.missatge)
            }) : e.error = "Les contrasenyes no són iguals" : e.error = "Has d'emplenar tots els camps"
        }
    }
]), angular.module("appLearn").config(["$routeProvider", "$locationProvider",
    function(e, t) {
        e.when("/", {
            controller: "MissatgesController",
            templateUrl: "missatges.html",
            autoritzat: !1
        }).when("/noumissatge", {
            controller: "NouMissatgeController",
            templateUrl: "nouMissatge.html",
            autoritzat: !0
        }).when("/editarmissatge", {
            controller: "EditarMissatgeController",
            templateUrl: "editarMissatge.html",
            autoritzat: !0
        }).when("/registre", {
            controller: "RegisterController",
            templateUrl: "register.html",
            autoritzat: !1
        }).when("/login", {
            controller: "LoginController",
            templateUrl: "login.html",
            autoritzat: !1
        }).when("/registre", {
            controller: "RegistreController",
            templateUrl: "registre.html",
            autoritzat: !1
        }).otherwise({
            redirectTo: "/"
        }), t.html5Mode({
            enabled: !0,
            requireBase: !1
        })
    }
]).run(["$rootScope", "UserSvc",
    function(e, t) {
        e.$on("$routeChangeStart", function(e, r) {
            r && !t.auth & r.autoritzat && e.preventDefault()
        })
    }
]), angular.module("appLearn").service("UserSvc", ["$http",
    function(e) {
        var t = this;
        t.auth = !1, t.getUser = function() {
            return e.get("/api/users")
        }, t.login = function(r, i, o) {
            return e.post("/api/sessions", {
                username: r,
                password: i
            }).success(function(r, i) {
                e.defaults.headers.common["x-auth"] = r, r && (t.auth = !0)
            }).error(function(e, t) {
                o(e, t)
            })
        }, this.registre = function(t, r) {
            return e.post("/api/users", {
                username: t,
                password: r
            })
        }, this.logOut = function() {
            t.auth = !1, e.defaults.headers.common["x-auth"] = ""
        }
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJlZGl0TWlzc2F0Z2UuY3RybC5qcyIsImxsaWJyZXMuY3RybC5qcyIsImxsaWJyZXMuc3ZjLmpzIiwibG9naW4uY3RybC5qcyIsIm1pc3NhdGdlcy5jdHJsLmpzIiwibWlzc2F0Z2VzLnN2Yy5qcyIsIm5vdU1pc3NhdGdlLmN0cmwuanMiLCJyZWdpc3RyZS5jdHJsLmpzIiwicm91dGVzLmpzIiwidXNlci5zcnYuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCIkbG9jYXRpb24iLCJVc2VyU3ZjIiwiJG9uIiwiZSIsInVzZXIiLCJjdXJyZW50VXNlciIsImxvZ291dCIsImxvZ091dCIsInBhdGgiLCJNaXNzYXRnZXNTZXJ2aWNlIiwibWlzc2F0Z2VCb2R5IiwibWlzc2F0Z2VUb0VkaXQiLCJib2R5IiwiZWRpdGFyTWlzc2F0Z2UiLCJwdXQiLCJfaWQiLCJzdWNjZXNzIiwiTGxpYnJlc1NlcnZpY2UiLCJmZXRjaCIsImxsaWJyZXMiLCJlc2JvcnJhcmxsaWJyZSIsImxsaWJyZSIsInBvcyIsImluZGV4T2YiLCJzcGxpY2UiLCJlZGl0YXJsbGlicmUiLCJlZGl0IiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiYWZlZ2lyTGxpYnJlIiwidW5kZWZpbmVkIiwidGl0b2wiLCJpc2JuIiwiY3JlYXRlIiwiYXV0b3JzIiwiZGF0ZSIsInVuc2hpZnQiLCJib3JyYXJMbGlicmUiLCJlZGl0YXJMbGlicmUiLCJlZGl0YXJUaXRvbCIsImVkaXRhcklzYm4iLCJsbGlicmVfZWRpdGFyIiwiYWN0dWFsaXphckxsaWJyZSIsInVwZGF0ZSIsInNlcnZpY2UiLCIkaHR0cCIsInRoaXMiLCJnZXQiLCJwb3N0IiwiJHdhdGNoR3JvdXAiLCJuZXdWYWwiLCJvbGRWYWwiLCJsb2dpbiIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJzdGF0dXMiLCJtaXNzYXRnZSIsImdldFVzZXIiLCJ0aGVuIiwiJGVtaXQiLCJkYXRhIiwibWlzc2F0Z2VzIiwiZXNib3JyYXJNaXNzYXRnZSIsImlkIiwiYWZlZ2lyTWlzc2F0Z2UiLCJwYXRhdGEiLCJyZWdpc3RyZSIsInBhc3N3b3JkMiIsImNvbmZpZyIsIiRyb3V0ZVByb3ZpZGVyIiwiJGxvY2F0aW9uUHJvdmlkZXIiLCJ3aGVuIiwidGVtcGxhdGVVcmwiLCJhdXRvcml0emF0Iiwib3RoZXJ3aXNlIiwicmVkaXJlY3RUbyIsImh0bWw1TW9kZSIsImVuYWJsZWQiLCJyZXF1aXJlQmFzZSIsInJ1biIsIiRyb290U2NvcGUiLCJldmVudCIsIm5leHQiLCJhdXRoIiwicHJldmVudERlZmF1bHQiLCJzcnYiLCJub0xvZ2luIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIl0sIm1hcHBpbmdzIjoiQUFDQUEsUUFBQUMsT0FBQSxZQUFBLFlDREFELFFBQUFDLE9BQUEsWUFBQUMsV0FBQSx5QkFBQSxTQUFBLFlBQUEsVUFBQSxTQUFBQyxFQUFBQyxFQUFBQyxHQUNBRixFQUFBRyxJQUFBLFFBQUEsU0FBQUMsRUFBQUMsR0FPQUwsRUFBQU0sWUFBQUQsSUFFQUwsRUFBQU8sT0FBQSxXQU1BTCxFQUFBTSxlQUNBUixHQUFBTSxZQUNBTCxFQUFBUSxLQUFBLFNDbEJBWixRQUFBQyxPQUFBLFlBQUFDLFdBQUEsNEJBQUEsU0FBQSxZQUFBLG1CQUFBLFNBQUFDLEVBQUFDLEVBQUFTLEdBQ0FWLEVBQUFXLGFBQUFELEVBQUFFLGVBQUFDLEtBQ0FiLEVBQUFjLGVBQUEsV0FDQWQsRUFBQVcsY0FDQUQsRUFBQUssS0FDQUMsSUFBQU4sRUFBQUUsZUFBQUksSUFDQUgsS0FBQWIsRUFBQVcsZUFDQU0sUUFBQSxXQUNBUCxFQUFBRSxlQUFBQyxLQUFBYixFQUFBVyxhQUNBWCxFQUFBVyxhQUFBLEtBQ0FWLEVBQUFRLEtBQUEsV0NWQVosUUFBQUMsT0FBQSxZQUFBQyxXQUFBLHFCQUFBLFNBQUEsWUFBQSxpQkFBQSxTQUFBQyxFQUFBQyxFQUFBaUIsR0FDQUEs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Z0MsR0FDQSxNQUFBekMsR0FBQUcsS0FBQSxpQkFDQUssU0FBQUEsRUFDQUMsU0FBQUEsSUFDQXZDLFFBQUEsU0FBQTZDLEVBQUFMLEdBTUFWLEVBQUEwQyxTQUFBQyxRQUFBQyxPQUFBLFVBQUE3QixFQUNBQSxJQUFBeUIsRUFBQUYsTUFBQSxLQUNBekQsTUFBQSxTQUFBQSxFQUFBNkIsR0FLQStCLEVBQUE1RCxFQUFBNkIsTUFHQVQsS0FBQW9CLFNBQUEsU0FBQWIsRUFBQUMsR0FLQSxNQUFBVCxHQUFBRyxLQUFBLGNBQ0FLLFNBQUFBLEVBQ0FDLFNBQUFBLEtBR0FSLEtBQUF4QyxPQUFBLFdBS0ErRSxFQUFBRixNQUFBLEVBQ0F0QyxFQUFBMEMsU0FBQUMsUUFBQUMsT0FBQSxVQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qYW5ndWxhci5tb2R1bGUoJ2FwcExlYXJuJyxbXSk7Ki9cbmFuZ3VsYXIubW9kdWxlKCdhcHBMZWFybicsWyduZ1JvdXRlJ10pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHBMZWFybicpLmNvbnRyb2xsZXIoXCJBcHBsaWNhdGlvbkNvbnRyb2xsZXJcIiwgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sIFVzZXJTdmMpIHtcbiAgICAkc2NvcGUuJG9uKCdsb2dpbicsIGZ1bmN0aW9uKGUsIHVzZXIpIHtcbiAgICAgICAgLypcbiAgICAgICAgICAgICAgICBRdWFuIHMnaGEgZmV0IGxvZ2luIHMnZW1ldCBsJ2V2ZW50IFwibG9naW5cIlxuICAgICAgICAgICAgICAgIGkgYWl4w7IgZmEgcXVlIGxhIHZhcmlhYmxlIGRlIGwnc2NvcGUgXCJjdXJyZW50VXNlclwiXG4gICAgICAgICAgICAgICAgbGkgZGllbSBxdWluIHVzdWFyaSBzJ2hhIGF1dGVudGljYW50LCBkJ2FxdWVzdGEgbWFuZXJhXG4gICAgICAgICAgICAgICAgZmVtIHF1ZSBhcGFyZWd1aW4gZGlmZXJlbnRzIG9wY2lvbnMgYWwgbWVuw7pcbiAgICAgICAgICAgICovXG4gICAgICAgICRzY29wZS5jdXJyZW50VXNlciA9IHVzZXI7XG4gICAgfSk7XG4gICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFF1YW4gZmVtIGxvZ291dCBlc2JvcnJlbSBlbCB0b2tlbiBpIGxhIHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgZGUgbCckc2NvcGUgXCJjdXJyZW50VXNlclwiLCBkJ2FxdWVzdGEgZm9ybWEgZGVzYXBhcmVpeGVuXG4gICAgICAgICAgICAgICAgZWxzIG1lbsO6cyBzZW5zaWJsZXMgYSBsYSBhdXRlbnRpY2FjacOzXG4gICAgICAgICAgICAqL1xuICAgICAgICBVc2VyU3ZjLmxvZ091dCgpO1xuICAgICAgICBkZWxldGUgJHNjb3BlLmN1cnJlbnRVc2VyO1xuICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgIH07XG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwTGVhcm4nKS5jb250cm9sbGVyKCdFZGl0YXJNaXNzYXRnZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbiwgTWlzc2F0Z2VzU2VydmljZSkge1xuICAgICRzY29wZS5taXNzYXRnZUJvZHkgPSBNaXNzYXRnZXNTZXJ2aWNlLm1pc3NhdGdlVG9FZGl0LmJvZHk7XG4gICAgJHNjb3BlLmVkaXRhck1pc3NhdGdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCRzY29wZS5taXNzYXRnZUJvZHkpIHtcbiAgICAgICAgICAgIE1pc3NhdGdlc1NlcnZpY2UucHV0KHtcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBNaXNzYXRnZXNTZXJ2aWNlLm1pc3NhdGdlVG9FZGl0Ll9pZCxcbiAgICAgICAgICAgICAgICBcImJvZHlcIjogJHNjb3BlLm1pc3NhdGdlQm9keVxuICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBNaXNzYXRnZXNTZXJ2aWNlLm1pc3NhdGdlVG9FZGl0LmJvZHkgPSAkc2NvcGUubWlzc2F0Z2VCb2R5O1xuICAgICAgICAgICAgICAgICRzY29wZS5taXNzYXRnZUJvZHkgPSBudWxsO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwTGVhcm4nKS5jb250cm9sbGVyKCdMbGlicmVzQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCBMbGlicmVzU2VydmljZSkge1xuICAgIExsaWJyZXNTZXJ2aWNlLmZldGNoKCkuc3VjY2VzcyhmdW5jdGlvbihsbGlicmVzKSB7XG4gICAgICAgICRzY29wZS5sbGlicmVzID0gbGxpYnJlcztcbiAgICB9KTtcbiAgICAkc2NvcGUuZXNib3JyYXJsbGlicmUgPSBmdW5jdGlvbihsbGlicmUpIHtcbiAgICAgICAgTGxpYnJlc1NlcnZpY2UuZGVsZXRlKGxsaWJyZS5faWQpLnN1Y2Nlc3MoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gJHNjb3BlLmxsaWJyZXMuaW5kZXhPZihsbGlicmUpO1xuICAgICAgICAgICAgJHNjb3BlLmxsaWJyZXMuc3BsaWNlKHBvcywgMSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgJHNjb3BlLmVkaXRhcmxsaWJyZSA9IGZ1bmN0aW9uKGxsaWJyZSkge1xuICAgICAgICBMbGlicmVzU2VydmljZS5lZGl0KGxsaWJyZSk7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvZWRpdGFybGxpYnJlJyk7XG4gICAgfTtcbn0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwTGVhcm4nKS5jb250cm9sbGVyKCdMbGlicmVzQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgTGxpYnJlc1NlcnZpY2UpIHtcbiAgICBMbGlicmVzU2VydmljZS5mZXRjaCgpLnN1Y2Nlc3MoZnVuY3Rpb24obGxpYnJlcykge1xuICAgICAgICAkc2NvcGUubGxpYnJlcyA9IGxsaWJyZXM7XG4gICAgfSkuZXJyb3IoZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9KTtcbiAgICAkc2NvcGUuYWZlZ2lyTGxpYnJlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCRzY29wZS50aXRvbCAhPSB1bmRlZmluZWQgJiYgJHNjb3BlLmlzYm4gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBMbGlicmVzU2VydmljZS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIGlzYm46ICRzY29wZS5pc2JuLFxuICAgICAgICAgICAgICAgIHRpdG9sOiAkc2NvcGUudGl0b2wsXG4gICAgICAgICAgICAgICAgYXV0b3JzOiAkc2NvcGUuYXV0b3JzLFxuICAgICAgICAgICAgICAgIGRhdGU6ICRzY29wZS5kYXRlXG4gICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uKGxsaWJyZSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5sbGlicmVzLnVuc2hpZnQobGxpYnJlKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNibiA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnRpdG9sID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAkc2NvcGUuYm9ycmFyTGxpYnJlID0gZnVuY3Rpb24obGxpYnJlKSB7XG4gICAgICAgIExsaWJyZXNTZXJ2aWNlLmRlbGV0ZShsbGlicmUuaXNibikuc3VjY2VzcyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5sbGlicmVzLnNwbGljZSgkc2NvcGUubGxpYnJlcy5pbmRleE9mKGxsaWJyZSksIDEpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgICRzY29wZS5lZGl0YXJMbGlicmUgPSBmdW5jdGlvbihsbGlicmUpIHtcbiAgICAgICAgJHNjb3BlLmVkaXRhclRpdG9sID0gbGxpYnJlLnRpdG9sO1xuICAgICAgICAkc2NvcGUuZWRpdGFySXNibiA9IGxsaWJyZS5pc2JuO1xuICAgICAgICAkc2NvcGUubGxpYnJlX2VkaXRhciA9IGxsaWJyZTtcbiAgICB9XG4gICAgJHNjb3BlLmFjdHVhbGl6YXJMbGlicmUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJHNjb3BlLmVkaXRhcklzYm4gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBMbGlicmVzU2VydmljZS51cGRhdGUoJHNjb3BlLmxsaWJyZV9lZGl0YXIuaXNibiwge1xuICAgICAgICAgICAgICAgIGlzYm46ICRzY29wZS5lZGl0YXJUaXRvbCxcbiAgICAgICAgICAgICAgICB0aXRvbDogJHNjb3BlLmVkaXRhclRpdG9sXG4gICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5sbGlicmVfZWRpdGFyLmlzYm4gPSAkc2NvcGUuZWRpdGFySXNibjtcbiAgICAgICAgICAgICAgICAkc2NvcGUubGxpYnJlX2VkaXRhci50aXRvbCA9ICRzY29wZS5lZGl0YXJUaXRvbDtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZWRpdGFySXNibiA9IG51bGw7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVkaXRhclRpdG9sID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHBMZWFybicpLnNlcnZpY2UoXCJMbGlicmVzU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJwYXRhdGEgZXJyb3JcIilcbiAgICB0aGlzLmZldGNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoXCIvYXBpL2xsaWJyZXNcIik7XG4gICAgfTtcbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKGxsaWJyZSkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChcIi9hcGkvbGxpYnJlc1wiLCBsbGlicmUpO1xuICAgIH07XG4gICAgdGhpcy5kZWxldGUgPSBmdW5jdGlvbihpc2JuKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUoXCIvYXBpL2xsaWJyZXMvXCIgKyBpc2JuKTtcbiAgICB9O1xuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oaXNibiwgbGxpYnJlKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wdXQoXCIvYXBpL2xsaWJyZXNcIiArIGlzYm4sIGxsaWJyZSk7XG4gICAgfTtcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHBMZWFybicpXG4gICAgLmNvbnRyb2xsZXIoXCJMb2dpbkNvbnRyb2xsZXJcIiwgZnVuY3Rpb24oJHNjb3BlLCRsb2NhdGlvbixVc2VyU3ZjKSB7XG4gICAgICAgICAkc2NvcGUuJHdhdGNoR3JvdXAoWyd1c2VybmFtZScsJ3Bhc3N3b3JkJ10sZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAqIFZpZ2lsZW0gbGVzIHZhcmlhYmxlcyBkZSBsJyRzY29wZSBcInVzZXJuYW1lXCJcbiAgICAgICAgICAgICAgICAgKiBpIFwicGFzc3dvcmRcIiBwZXIgZXNib3JyYXIgZWwgbWlzc2F0Z2UgZCdlcnJvclxuICAgICAgICAgICAgICAgICAqIHNpIGhpIGhhLlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwhPW9sZFZhbClcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yPW51bGw7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24odXNlcm5hbWUscGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGlmICghdXNlcm5hbWUgfHwgIXBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9yID0gXCJIYXMgZCdlbXBsZW5hciB0b3RzIGVscyBjYW1wc1wiO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgIFVzZXJTdmMubG9naW4odXNlcm5hbWUscGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVycm9yLHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdW5jacOzIHF1ZSBzJ2V4ZWN1dGFyw6Agc2kgaGkgaGEgdW4gZXJyb3IgZW4gZWwgbG9naW5cbiAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09IDQwMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSBlcnJvci5taXNzYXRnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJTdmMuZ2V0VXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2kgdG90IHZhIGLDqSwgYW5lbSBhIGxhIHDDoGdpbmEgcHJpbmNpcGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgZW1ldGVuIHVuIG1pc3NhdGdlIGRlIFwibG9naW5cIiBwZXIgYXZpc2FyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgbGEgbm9zdHJhIGFwcCBxdWUgbCd1c3VhcmkgaGEgZmV0IGxvZ2luXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3RhbWVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kZW1pdCgnbG9naW4nLCB1c2VyLmRhdGEpOyAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwTGVhcm4nKS5jb250cm9sbGVyKCdNaXNzYXRnZXNDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sIE1pc3NhdGdlc1NlcnZpY2UpIHtcbiAgICBNaXNzYXRnZXNTZXJ2aWNlLmZldGNoKCkuc3VjY2VzcyhmdW5jdGlvbihtaXNzYXRnZXMpIHtcbiAgICAgICAgJHNjb3BlLm1pc3NhdGdlcyA9IG1pc3NhdGdlcztcbiAgICB9KTtcbiAgICAkc2NvcGUuZXNib3JyYXJNaXNzYXRnZSA9IGZ1bmN0aW9uKG1pc3NhdGdlKSB7XG4gICAgICAgIE1pc3NhdGdlc1NlcnZpY2UuZGVsZXRlKG1pc3NhdGdlLl9pZCkuc3VjY2VzcyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSAkc2NvcGUubWlzc2F0Z2VzLmluZGV4T2YobWlzc2F0Z2UpO1xuICAgICAgICAgICAgJHNjb3BlLm1pc3NhdGdlcy5zcGxpY2UocG9zLCAxKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAkc2NvcGUuZWRpdGFyTWlzc2F0Z2UgPSBmdW5jdGlvbihtaXNzYXRnZSkge1xuICAgICAgICBNaXNzYXRnZXNTZXJ2aWNlLmVkaXQobWlzc2F0Z2UpO1xuICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2VkaXRhcm1pc3NhdGdlJyk7XG4gICAgfTtcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHBMZWFybicpLnNlcnZpY2UoXCJNaXNzYXRnZXNTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG4gICAgdGhpcy5mZXRjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KFwiL2FwaS9taXNzYXRnZXNcIik7XG4gICAgfTtcbiAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKG1pc3NhdGdlKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KFwiL2FwaS9taXNzYXRnZXNcIiwgbWlzc2F0Z2UpO1xuICAgIH07XG4gICAgdGhpcy5kZWxldGUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZCk7XG4gICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUoXCIvYXBpL21pc3NhdGdlcy9cIiArIGlkKTtcbiAgICB9O1xuICAgIHRoaXMuZWRpdCA9IGZ1bmN0aW9uKG1pc3NhdGdlKSB7XG4gICAgICAgIHRoaXMubWlzc2F0Z2VUb0VkaXQgPSBtaXNzYXRnZTtcbiAgICB9O1xuICAgIHRoaXMucHV0ID0gZnVuY3Rpb24obWlzc2F0Z2UpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnB1dChcIi9hcGkvbWlzc2F0Z2VzXCIsIG1pc3NhdGdlKTtcbiAgICB9O1xufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcExlYXJuJykuY29udHJvbGxlcignTm91TWlzc2F0Z2VDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24sIE1pc3NhdGdlc1NlcnZpY2UpIHtcbiAgICAkc2NvcGUuYWZlZ2lyTWlzc2F0Z2UgPSBmdW5jdGlvbihwYXRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLm1pc3NhdGdlQm9keSk7XG4gICAgICAgIGlmKCRzY29wZS5taXNzYXRnZUJvZHkpIHtcbiAgICAgICAgICAgIE1pc3NhdGdlc1NlcnZpY2UuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBib2R5OiAkc2NvcGUubWlzc2F0Z2VCb2R5XG4gICAgICAgICAgICB9KS5zdWNjZXNzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwTGVhcm4nKS5jb250cm9sbGVyKFwiUmVnaXN0cmVDb250cm9sbGVyXCIsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCBVc2VyU3ZjKSB7XG4gICAgJHNjb3BlLnJlZ2lzdHJlID0gZnVuY3Rpb24odXNlcm5hbWUsIHBhc3N3b3JkLCBwYXNzd29yZDIpIHtcbiAgICAgICAgJHNjb3BlLiR3YXRjaEdyb3VwKFsndXNlcm5hbWUnLCAncGFzc3dvcmQnLCAncGFzc3dvcmQyJ10sIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgICAgICBpZihuZXdWYWwgIT0gb2xkVmFsKSAkc2NvcGUuZXJyb3IgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYoIXBhc3N3b3JkIHx8ICFwYXNzd29yZDIgfHwgIXVzZXJuYW1lKSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSBcIkhhcyBkJ2VtcGxlbmFyIHRvdHMgZWxzIGNhbXBzXCI7XG4gICAgICAgIH0gZWxzZSBpZihwYXNzd29yZCA9PT0gcGFzc3dvcmQyKSB7XG4gICAgICAgICAgICBVc2VyU3ZjLnJlZ2lzdHJlKHVzZXJuYW1lLCBwYXNzd29yZCkuc3VjY2VzcyhmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xuICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24oZXJyb3IsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGlmKHN0YXR1cyA9PSA0MDkpICRzY29wZS5lcnJvciA9IGVycm9yLm1pc3NhdGdlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkc2NvcGUuZXJyb3IgPSBcIkxlcyBjb250cmFzZW55ZXMgbm8gc8OzbiBpZ3VhbHNcIjtcbiAgICAgICAgfVxuICAgIH07XG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwTGVhcm4nKS5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbihcIi9cIiwge1xuICAgICAgICBjb250cm9sbGVyOiAnTWlzc2F0Z2VzQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnbWlzc2F0Z2VzLmh0bWwnLFxuICAgICAgICBhdXRvcml0emF0OiBmYWxzZVxuICAgIH0pLndoZW4oXCIvbm91bWlzc2F0Z2VcIiwge1xuICAgICAgICBjb250cm9sbGVyOiBcIk5vdU1pc3NhdGdlQ29udHJvbGxlclwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ25vdU1pc3NhdGdlLmh0bWwnLFxuICAgICAgICBhdXRvcml0emF0OiB0cnVlXG4gICAgfSkud2hlbihcIi9lZGl0YXJtaXNzYXRnZVwiLCB7XG4gICAgICAgIGNvbnRyb2xsZXI6IFwiRWRpdGFyTWlzc2F0Z2VDb250cm9sbGVyXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnZWRpdGFyTWlzc2F0Z2UuaHRtbCcsXG4gICAgICAgIGF1dG9yaXR6YXQ6IHRydWVcbiAgICB9KS53aGVuKFwiL3JlZ2lzdHJlXCIsIHtcbiAgICAgICAgY29udHJvbGxlcjogXCJSZWdpc3RlckNvbnRyb2xsZXJcIixcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwicmVnaXN0ZXIuaHRtbFwiLFxuICAgICAgICBhdXRvcml0emF0OiBmYWxzZVxuICAgIH0pLndoZW4oXCIvbG9naW5cIiwge1xuICAgICAgICBjb250cm9sbGVyOiBcIkxvZ2luQ29udHJvbGxlclwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJsb2dpbi5odG1sXCIsXG4gICAgICAgIGF1dG9yaXR6YXQ6IGZhbHNlXG4gICAgfSkud2hlbihcIi9yZWdpc3RyZVwiLCB7XG4gICAgICAgIGNvbnRyb2xsZXI6IFwiUmVnaXN0cmVDb250cm9sbGVyXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcInJlZ2lzdHJlLmh0bWxcIixcbiAgICAgICAgYXV0b3JpdHphdDogZmFsc2VcbiAgICB9KS5vdGhlcndpc2Uoe1xuICAgICAgICByZWRpcmVjdFRvOiAnLydcbiAgICB9KTtcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICByZXF1aXJlQmFzZTogZmFsc2VcbiAgICB9KTtcbn0pLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCBVc2VyU3ZjKSB7XG4gICAgLypcbiAgICAgICAgICAgIENhZGEgdmVnYWRhIHF1ZSBjYW52aWVtIGRlIHDDoGdpbmEgc2UgZGlzcGFyYSBlbFxuICAgICAgICAgICAgZXZlbnQgJHJvdXRlQ2hhbmdlU3RhcnQsXG4gICAgICAgICAgICBTaSBsYSBww6BnaW5hIHF1ZSB2b2xlbSB2ZXVyZSB0w6kgbGEgcHJvcGlldGF0IFxuICAgICAgICAgICAgXCJhdXRvcml0emF0XCI6IGEgdHJ1ZSBpIG5vIGhvIGVzdMOgIGxsYXZvcnMgbm8gXG4gICAgICAgICAgICBmYXLDoCBlbCBjYW52aVxuICAgICAgICAqL1xuICAgICRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKGV2ZW50LCBuZXh0KSB7XG4gICAgICAgIGlmKG5leHQpXG4gICAgICAgICAgICBpZighVXNlclN2Yy5hdXRoICYgbmV4dC5hdXRvcml0emF0KSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcExlYXJuJykuc2VydmljZSgnVXNlclN2YycsIGZ1bmN0aW9uKCRodHRwKSB7XG4gICAgdmFyIHNydiA9IHRoaXM7XG4gICAgc3J2LmF1dGggPSBmYWxzZTtcbiAgICBzcnYuZ2V0VXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJyk7XG4gICAgfTtcbiAgICBzcnYubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQsIG5vTG9naW4pIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvc2Vzc2lvbnMnLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgIFNpIGwnYXV0ZW50aWNhY2nDsyDDqXMgY29ycmVjdGUgbGkgZGllbSBhIGwnYW5ndWxhciBxdWUgY2FkYSBcbiAgICAgICAgICAgICAgICAgICAgdmVnYWRhIHF1ZSBlcyBjb211bmlxdWkgYW1iIGVsIHNlcnZpZG9yIGFmZWdlaXhpIGVsIHRva2VuIFxuICAgICAgICAgICAgICAgICAgICBhbCBoZWFkZXIgJ3gtYXV0aCdcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddID0gZGF0YTtcbiAgICAgICAgICAgIGlmKGRhdGEpIHNydi5hdXRoID0gdHJ1ZTtcbiAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24oZXJyb3IsIHN0YXR1cykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgU2kgbCd1c3VhcmkgaSBjb250cmFzZW55YSBubyDDqXMgY29ycmVjdGUgZXhlY3V0YSBsYVxuICAgICAgICAgICAgICAgICAgICBmdW5jacOzbiBjYWxsYmFjayBxdWUgbGkgaGVtIHBhc3NhdCBjb20gcGFyw6BtZXRyZVxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub0xvZ2luKGVycm9yLCBzdGF0dXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMucmVnaXN0cmUgPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgLypcbiAgICAgICAgICAgICAgICBQZXIgcmVnaXN0cmFyIHVuIHVzdWFyaSBub3UsIG5vbcOpcyBoZW0gZGUgZmVyIHVuIHBvc3RcbiAgICAgICAgICAgICAgICBhIGwnYXBpIGQndXN1YXJpc1xuICAgICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLmxvZ091dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKlxuICAgICAgICAgICAgICAgIFF1YW4gbCd1c3VhcmkgZmEgbG9nb3V0IHMnZXNib3JyYSBlbCB0b2tlblxuICAgICAgICAgICAgICAgIGkgcG9zZW0gbGEgcHJvcGlldGF0IGRlbCBzZXJ2ZWkgXCJhdXRoXCIgYSBmYWxzZVxuICAgICAgICAgICAgKi9cbiAgICAgICAgc3J2LmF1dGggPSBmYWxzZTtcbiAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ3gtYXV0aCddID0gXCJcIjtcbiAgICB9O1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9