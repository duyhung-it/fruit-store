window.ProductDetailsController = function (
  $scope,
  $routeParams,
  $cookies,
  $http
) {
  $scope.user = $cookies.getObject("user");
  let id = $routeParams.id;
  $http.get(productAPI + "/" + id).then(function (response) {
    $scope.product = response.data;
  });
};
