window.ProductsBoughtController = function ($scope, $http, $routeParams) {
  let id = $routeParams.id;
  $scope.listProducts = [];
  $scope.cart = {};
  let findById = function (arrays, id) {
    return arrays.find((element) => element.user_id === id);
  };
  $scope.delete = function (index) {
    if (id != undefined) {
      $scope.listProducts.splice(index, 1);
      $scope.cart.products = $scope.listProducts;
      $http.put(orderAPI + "/" + $scope.cart.id, $scope.cart);
    }
  };
  if (id != undefined) {
    $http.get(orderAPI).then(function (response) {
      let found = findById(response.data, id);
      if (found) {
        $scope.cart = found;
        $scope.listProducts = found.products;
      }
    });
  }
};
