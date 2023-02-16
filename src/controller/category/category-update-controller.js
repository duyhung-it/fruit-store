window.CategoryUpdateController = function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  $scope.buttonTitle = "Update Category";
  let id = $routeParams.id;
  $http.get(categoryAPI + "/" + id).then(function (response) {
    $scope.request = {
      id: response.data.id,
      name: response.data.name,
    };
  });
  $scope.addOrUpdate = function (event) {
    event.preventDefault();
    if (id != undefined) {
      if ($scope.request.name == "") return;
      $http.put(categoryAPI + "/" + id, $scope.request).then(function () {
        //   $scope.listCategories.push(response.data);
        alert("Updated category successfully");
        $location.path("/admin/categories");
      });
    }
  };
};
