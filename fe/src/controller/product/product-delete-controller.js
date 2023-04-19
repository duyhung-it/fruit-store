window.ProductDeleteController = function (
  $scope,
  $http,
  $routeParams,
  $location
) {
  let id = $routeParams.id;
  if (id != undefined) {
    $http.delete(productAPI + "/" + id).then(function () {
      $location.path("/admin/products");
    });
  }
};
