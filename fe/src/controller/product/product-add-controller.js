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
      let formData = new FormData();
      formData.append("file", element.files[0]);
      $http
        .post("http://localhost:8080/upload", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(function (response) {});
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
