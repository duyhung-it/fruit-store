window.CheckoutController = function (
  $scope,
  $http,
  $routeParams,
  $cookies,
  $location
) {
  let id = $routeParams.id;
  $scope.user = $cookies.getObject("user");
  $scope.carts = [];
  $scope.listProducts = [];
  $scope.createdOrder = {
    id: "",
    user_id: $scope.user.id,
    products: [],
  };
  let findById = function (arrays, id) {
    return arrays.find((element) => element.user_id == id);
  };
  let getIndex = function (arrays, element) {
    return arrays.indexOf(element);
  };
  let findProductById = function (arrays, id) {
    return arrays.find((element) => {
      return element.id == id;
    });
  };
  let hadOrder = function (user) {
    $http.get(orderAPI).then(function (response) {
      let found = findById(response.data, user.id);
      if (found == undefined) {
        $http.post(orderAPI, $scope.createdOrder);
      } else {
        $scope.createdOrder = found;
      }
    });
  };
  if (id != undefined) {
    $http.get(cartAPI + "/" + id).then(function (response) {
      $scope.listProducts = response.data.products;
      $scope.carts = response.data;
    });
  }
  hadOrder($scope.user);
  $scope.processCheckout = function () {
    if ($scope.createdOrder.products.length > 0) {
      $scope.listProducts.forEach((element, index) => {
        let found = findProductById($scope.createdOrder.products, element.id);
        if (found) {
          let index1 = getIndex($scope.createdOrder.products, found);
          $scope.createdOrder.products[index1].quantity +=
            $scope.listProducts[index].quantity;
        } else {
          $scope.createdOrder.products.push(element);
        }
      });
    } else $scope.createdOrder.products.push(...$scope.listProducts);
    $http
      .put(orderAPI + "/" + $scope.createdOrder.id, $scope.createdOrder)
      .then(function (response) {
        $scope.carts.products = [];
        $http.put(cartAPI + "/" + $scope.carts.id).then(function () {
          alert("Thanh toán thành công!");
        });
      });
  };
};
