window.CategoryAddController = function ($scope, $http, $location) {
  $scope.buttonTitle = "Add Category";

  $scope.addOrUpdate = function (event) {
    event.preventDefault();
    if ($scope.request.name == "") return;
    $http.post(categoryAPI, $scope.request).then(function (response) {
      // $scope.listCategories.push(response.data);
      alert("Added category successfully");
      $location.path("/admin/categories");
    });
  };
};
