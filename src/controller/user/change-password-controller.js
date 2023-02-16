window.ChangePasswordController = function ($cookies, $rootScope, $http) {
  $rootScope.user = $cookies.getObject("user");
};
