window.CategoryDeleteController = function (
  $scope,
  $http,
  $routeParams,
  $location
) {
  let id = $routeParams.id;
  if (id != undefined) {
    $http.delete(categoryAPI + "/" + id).then(function () {
      $scope.listCategories.forEach((element, index) => {
        if (element.id == id) {
          $scope.listCategories.splice(index, 1);
        }
      });
      $location.path("/admin/categories");
    });
  }
};
