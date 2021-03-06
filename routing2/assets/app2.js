angular.module("appLearn", []),
angular.module("appLearn").controller("MissatgesController", ["$scope", "MissatgesService",
    function(e, s) {
        s.fetch().success(function(s) {
            e.missatges = s
        }).error(function(e) {
            console.log(e)
        }), e.afegirMissatge = function() {
            e.missatgeBody && s.create({
                username: "xavigimenez",
                body: e.missatgeBody
            }).success(function(s) {
                e.missatges.unshift(s), e.missatgeBody = null
            })
        }
    }
]), angular.module("appLearn").service("MissatgesService", ["$http",
    function(e) {
        console.error("patata"), this.fetch = function() {
            return e.get("/api/missatges")
        }, this.create = function() {
            return e.post("/api/post")
        }
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsIm1pc3NhdGdlcy5jdHJsLmpzIiwibWlzc2F0Z2VzLnN2Yy5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29udHJvbGxlciIsIiRzY29wZSIsIk1pc3NhdGdlc1NlcnZpY2UiLCJmZXRjaCIsInN1Y2Nlc3MiLCJtaXNzYXRnZXMiLCJlcnJvciIsImUiLCJjb25zb2xlIiwibG9nIiwiYWZlZ2lyTWlzc2F0Z2UiLCJtaXNzYXRnZUJvZHkiLCJjcmVhdGUiLCJ1c2VybmFtZSIsImJvZHkiLCJtaXNzYXRnZSIsInVuc2hpZnQiLCJzZXJ2aWNlIiwiJGh0dHAiLCJ0aGlzIiwiZ2V0IiwicG9zdCJdLCJtYXBwaW5ncyI6IkFBQUFBLFFBQUFDLE9BQUEsZUNBQUQsUUFBQUMsT0FBQSxZQUNBQyxXQUFBLHVCQUFBLFNBQUEsbUJBQUEsU0FBQUMsRUFBQUMsR0FDQUEsRUFBQUMsUUFDQUMsUUFBQSxTQUFBQyxHQUNBSixFQUFBSSxVQUFBQSxJQUVBQyxNQUFBLFNBQUFDLEdBQ0FDLFFBQUFDLElBQUFGLEtBR0FOLEVBQUFTLGVBQUEsV0FDQVQsRUFBQVUsY0FDQVQsRUFBQVUsUUFDQUMsU0FBQSxjQUNBQyxLQUFBYixFQUFBVSxlQUNBUCxRQUFBLFNBQUFXLEdBQ0FkLEVBQUFJLFVBQUFXLFFBQUFELEdBQ0FkLEVBQUFVLGFBQUEsV0NqQkFiLFFBQUFDLE9BQUEsWUFDQWtCLFFBQUEsb0JBQUEsUUFBQSxTQUFBQyxHQUNBVixRQUFBRixNQUFBLFVBQ0FhLEtBQUFoQixNQUFBLFdBQ0EsTUFBQWUsR0FBQUUsSUFBQSxtQkFFQUQsS0FBQVAsT0FBQSxXQUNBLE1BQUFNLEdBQUFHLEtBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcExlYXJuJyxbXSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcExlYXJuJylcbiAgICAuY29udHJvbGxlcignTWlzc2F0Z2VzQ29udHJvbGxlcicsZnVuY3Rpb24oJHNjb3BlLE1pc3NhdGdlc1NlcnZpY2UpIHtcbiAgICAgICAgTWlzc2F0Z2VzU2VydmljZS5mZXRjaCgpXG4gICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKG1pc3NhdGdlcyl7XG4gICAgICAgICAgICAkc2NvcGUubWlzc2F0Z2VzID0gbWlzc2F0Z2VzO1xuICAgICAgICB9KVxuICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjb3BlLmFmZWdpck1pc3NhdGdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLm1pc3NhdGdlQm9keSl7XG4gICAgICAgICAgICAgICAgTWlzc2F0Z2VzU2VydmljZS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogXCJ4YXZpZ2ltZW5lelwiLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiAkc2NvcGUubWlzc2F0Z2VCb2R5XG4gICAgICAgICAgICAgICAgfSkuc3VjY2VzcyhmdW5jdGlvbihtaXNzYXRnZSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWlzc2F0Z2VzLnVuc2hpZnQobWlzc2F0Z2UpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWlzc2F0Z2VCb2R5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwTGVhcm4nKVxuICAgIC5zZXJ2aWNlKFwiTWlzc2F0Z2VzU2VydmljZVwiLCBmdW5jdGlvbigkaHR0cCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwicGF0YXRhXCIpXG4gICAgICAgIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoXCIvYXBpL21pc3NhdGdlc1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbihtaXNzYXRnZSkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoXCIvYXBpL3Bvc3RcIik7XG4gICAgICAgIH07XG4gICAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=