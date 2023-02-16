window.VerifyUserController = function (
  $rootScope,
  $scope,
  $location,
  $http,
  $cookies
) {
  $rootScope.user = {
    config: false,
  };
  $scope.listUsers = [];
  $http.get(userAPI).then(function (response) {
    $scope.listUsers = response.data;
  });
  $scope.verify_user = function (event) {
    event.preventDefault();
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
        $scope.failed = true;
      }
    });
  };
};
