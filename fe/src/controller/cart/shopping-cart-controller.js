window.ShoppingCartController = function (
  $rootScope,
  $scope,
  $http,
  $cookies,
  $location
) {
  $rootScope.user = $cookies.getObject("user");
  $scope.checkout = function () {
    //if data of user changed, this function will update cart to store user's value when the button checkout are clicked.
    $scope.cart.grand_total = 0;
    $scope.cart.products.forEach((elment) => {
      let totalGrand = elment.price * elment.quantity;
      $scope.cart.grand_total += totalGrand;
    });
    $http.put(cartAPI + "/" + $scope.cart.id, $scope.cart);
  };
  $scope.removeProduct = function (index, event) {
    event.preventDefault();
    if (index !== undefined) {
      $scope.cart.grand_total -=
        $scope.cart.products[index].price *
        $scope.cart.products[index].quantity;
      $scope.cart.products.splice(index, 1);
      $http.put(cartAPI + "/" + $scope.cart.id, $scope.cart);
    }
  };
  if (angular.isDefined($scope.user)) {
    $scope.cart = {
      id: "",
      user_id: $scope.user.id,
      products: [],
    };
    $scope.hadCart = function (user) {
      $http.get(cartAPI).then(function (response) {
        response.data.forEach((element) => {
          if (element.user_id === $scope.cart.user_id) {
            $scope.cart = element;
            return;
          }
        });
        if ($scope.cart.id == "") {
          $http.post(cartAPI, $scope.cart);
        }
      });
    };
    $scope.hadCart($scope.user);
    if (angular.isDefined($scope.cart)) {
      $http.get(cartAPI).then(function (response) {
        $scope.listCarts = response.data;
      });
    }
  } else {
    $location.path("/login");
  }
};
