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
    $http.put(cartAPI + "/" + $scope.cart.id, $scope.cart);
  };
  if (angular.isDefined($scope.user)) {
    $scope.listProducts = [];
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
