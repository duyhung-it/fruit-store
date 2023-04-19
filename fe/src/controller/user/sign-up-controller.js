window.SignUpController = function ($scope, $http, $location) {
  $scope.alert = {};
  $scope.signUp = function (event) {
    event.preventDefault();
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let firstName = $scope.user.firstName;
    let lastName = $scope.user.lastName;
    let email = $scope.user.email;
    let password = $scope.user.password;
    if (!angular.isDefined(firstName) || String(firstName).trim().length == 0) {
      $scope.alert.firstName = "Vui lòng nhập first name!";
      $scope.showAlertFirstName = true;
      return;
    } else {
      $scope.showAlertFirstName = false;
    }
    if (!angular.isDefined(lastName) || String(lastName).trim().length == 0) {
      $scope.alert.lastName = "Vui lòng nhập last name!";
      $scope.showAlertLastName = true;
      return;
    } else {
      $scope.showAlertLastName = false;
    }
    if (!angular.isDefined(email) || String(email).trim().length == 0) {
      $scope.alert.email = "Vui lòng nhập email!";
      $scope.showAlertEmail = true;
      return;
    } else {
      if (!email.match(validRegex)) {
        $scope.alert.email = "Email sai định dạng!";
        $scope.showAlertEmail = true;
        return;
      } else {
        $scope.showAlertEmail = false;
      }
    }
    if (!angular.isDefined(password) || String(password).trim().length == 0) {
      $scope.alert.password = "Vui lòng nhập password!";
      $scope.showAlertPass = true;
      return;
    } else {
      $scope.showAlertPass = false;
    }
    $http.post(userAPI, $scope.user).then(function (response) {
      alert("Sign Up Success!");
      $location.path("/login");
    });
  };
};
