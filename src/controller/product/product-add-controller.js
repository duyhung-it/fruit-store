window.ProductAddController = function ($scope, $http, $location, $cookies) {
  $scope.myLayout = String($location.path()).includes("/admin");
  $scope.user = $cookies.getObject("user");
  $scope.request = {};
  $scope.buttonTitle = "Add Product";
  $http.get(categoryAPI).then(function (response) {
    $scope.listCategories = response.data;
  });
  $scope.fileName = function (element) {
    $scope.$apply(function ($scope) {
      $scope.request.image = element.files[0].name;
    });
  };
  $scope.addOrUpdate = function (event) {
    event.preventDefault();
    $scope.request.createdDate = new Date().getTime();
    $http.post(productAPI, $scope.request).then(function () {
      alert("Added productss successfully");
      $location.path("/admin/products");
    });
  };
};
