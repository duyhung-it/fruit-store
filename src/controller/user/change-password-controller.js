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
  $scope.request = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  $scope.changePassword = function (event) {
    event.preventDefault();
    if ($scope.request.oldPassword.length == 0) {
      alert("Vui lòng nhập mật khẩu cũ");
      return;
    }
    if ($scope.request.newPassword.length == 0) {
      alert("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (String($scope.request.confirmPassword).length == 0) {
      alert("Vui lòng xác nhận mật khẩu mới");
      return;
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
        alert("Mật khẩu cũ không chính xác!");
      }
    } else {
      alert("Xác nhận mật khẩu mới thất bại!");
    }
  };
};
