window.VerifyUserController = function (
  $rootScope,
  $scope,
  $location,
  $http,
  $cookies
) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  $rootScope.user = {
    config: false,
  };
  $scope.showAlertError = false;
  $scope.alert = {};
  $scope.listUsers = [];
  $http.get(userAPI).then(function (response) {
    $scope.listUsers = response.data;
  });
  $scope.verify_user = function (event) {
    event.preventDefault();
    if (
      String($scope.user.email) == "" ||
      angular.isUndefined($scope.user.email)
    ) {
      $scope.alert.email = "Vui lòng nhập email!";
      $scope.showAlertEmail = true;
      return;
    } else {
      if (!String($scope.user.email).match(validRegex)) {
        $scope.alert.email = "Email không đúng định dạng!";
        $scope.showAlertEmail = true;
        return;
      } else {
        $scope.showAlertEmail = false;
      }
    }
    if (
      String($scope.user.password) == "" ||
      angular.isUndefined($scope.user.password)
    ) {
      $scope.alert.password = "Vui lòng nhập password!";
      $scope.showAlertPass = true;
      return;
    } else {
      $scope.showAlertPass = false;
    }
    $scope.listUsers.forEach((element) => {
      if (
        element.password == $scope.user.password &&
        element.email == $scope.user.email
      ) {
        if (element.role == 2) {
          $location.path("/home");
        } else {
          $location.path("/admin/categories");
        }
        $cookies.putObject("user", element);
        $rootScope.myLayout = String($location.path()).includes("/admin");
        return;
      } else {
        $scope.alert.errorMessage = "Tài khoản mật khẩu không chính xác!";
        $scope.showAlertError = true;
      }
    });
  };
};
