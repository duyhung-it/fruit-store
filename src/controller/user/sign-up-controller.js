window.SignUpController = function ($scope, $http, $location) {
  $scope.signUp = function (event) {
    event.preventDefault();
    let firstName = $scope.user.firstName;
    let lastName = $scope.user.lastName;
    let email = $scope.user.email;
    let password = $scope.user.password;
    if (angular.isDefined(firstName)) {
      if (firstName.trim().length == 0) {
        alert("Please enter your first name");
        return;
      }
    } else {
      alert("Please enter your first name");
      return;
    }
    if (angular.isDefined(lastName)) {
      if (lastName.trim().length == 0) {
        alert("Please enter your last name");
        return;
      }
    } else {
      alert("Please enter your last name");
      return;
    }
    if (angular.isDefined(email)) {
      if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        alert("Please enter your email");
        return;
      }
    } else {
      alert("Please enter your email");
      return;
    }
    if (angular.isDefined(password)) {
      if (password.length == 0) {
        alert("Please enter your password");
        return;
      }
    } else {
      alert("Please enter your password");
      return;
    }
    $http.post(userAPI, $scope.user).then(function (response) {
      alert("Sign Up Success!");
      $location.path("/login");
    });
  };
};
