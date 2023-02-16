window.ProductAddController = function ($scope, $http, $location) {
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
    $http.post(productAPI, $scope.request).then(function (response) {
      // $scope.listCategories.push(response.data);
      alert("Added productss successfully");
      $location.path("/admin/products");
    });
  };
};
