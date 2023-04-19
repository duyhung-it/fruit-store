window.ChangePasswordController = function (
  $scope,
  $cookies,
  $rootScope,
  $http,
  $location,
  $routeParams
) {
  $rootScope.user = $cookies.getObject("user");
  if (angular.isUndefined($rootScope.user)) {
    $location.path("/login");
    return false;
  }
  $scope.alert = {};
  $scope.request = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  $scope.changePassword = function (event) {
    event.preventDefault();
    if ($scope.request.oldPassword.length == 0) {
      $scope.alert.oldPassword = "Vui lòng nhập mật khẩu cũ!";
      $scope.showAlertOldPassword = true;
      return;
    } else {
      $scope.showAlertOldPassword = false;
    }
    if ($scope.request.newPassword.length == 0) {
      $scope.alert.newPassword = "Vui lòng nhập mật mới!";
      $scope.showAlertNewPassword = true;
      return;
    } else {
      $scope.showAlertNewPassword = false;
    }
    if (String($scope.request.confirmPassword).length == 0) {
      $scope.alert.confirmPassword = "Vui lòng nhập xác nhận mật khẩu mới!";
      $scope.showAlertConfirmPassword = true;
      return;
    } else {
      $scope.showAlertConfirmPassword = false;
    }
    if ($scope.request.newPassword == $scope.request.confirmPassword) {
      if ($scope.request.oldPassword == $rootScope.user.password) {
        $rootScope.user.password = $scope.request.newPassword;
        $http
          .put(userAPI + "/" + $routeParams.id, $rootScope.user)
          .then(function (response) {
            alert("Thay đổi mật khẩu thành công!");
          });
      } else {
        $scope.alert.oldPassword = "Mật khẩu cũ không chính xác";
        $scope.showAlertOldPassword = true;
      }
    } else {
      $scope.alert.confirmPassword = "Xác nhận mật khẩu không chính xác!";
      $scope.showAlertConfirmPassword = true;
    }
  };
};
