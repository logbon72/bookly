(function() {
  var app = angular.module('bookly', []);

  app.controller('BookController', ['$scope', '$http', '$location', '$log', function($scope, $http, $location, $log){
    $scope.baseUrl = 'http://' + $location.host() + ':' + $location.port();
    $scope.bookList = [];
    $scope.userList;

    $scope.getBooks = function() {
      $http.get('/book/getAllBooks')
        .then(function(response) {
          var data = response.data;
          $scope.bookList = data.books;
          $scope.userList = data.users;
        }, function(response) {
             $log.info(response);
        });
    };

    $scope.addBook = function() {
      $http.post('/addBook', {
        title: $scope.title,
        author: $scope.author,
        rating: $scope.rating,
        comment: $scope.comment
      }).then(function(response) {
          var data = response.data;
          $scope.bookList.push(data.book);
        }, function(response) {
             $log.info(response);
        });
    };

    $scope.getBooks();
  }]);

  app.controller('AuthController', ['$scope', '$log', '$http', '$window', function($scope, $log, $http, $window) {
    $scope.login = function() {
      $http.post('/login', {
        email: $scope.email,
        password: $scope.password
      }).then(function(response) {
          var data = response.data;
          if (data.user) {
            if (data.loggedIn) alert('An account is already active');
            $window.location.href = '/user/profile';
          } else {
            alert(data.message)
          }
        }, function(response) {
             $log.info(response);
        });
    };

    $scope.register = function() {
      $http.post('/register', {
        email: $scope.email,
        password: $scope.password
      }).then(function(response) {
          var data = response.data;
          if (data.user) {
            $window.location.href = '/user/profile';
          } else {
            $log.info(response);
          }
        }, function(response) {
             alert('error');
             $log.info(response);
        });
    };
  }]);

})();
