window.ProductsBoughtController = function ($scope, $http, $routeParams) {
  let id = $routeParams.id;
  $scope.listProducts = [];
  let findById = function (arrays, id) {
    return arrays.find((element) => element.user_id === id);
  };
  if (id != undefined) {
    $http.get(orderAPI).then(function (response) {
      let found = findById(response.data, id);
      if (found) {
        $scope.listProducts = found.products;
      }
    });
  }
};
