window.CategoryController = function ($rootScope, $http,$cookies) {
  $rootScope.user = {};
  $rootScope.user = $cookies.getObject('user');
  $rootScope.listCategories = [];
  $http.get(categoryAPI).then(function (response) {
    $rootScope.listCategories = response.data;
  });
};
