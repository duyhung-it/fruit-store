window.AddToCartController = function (
  $scope,
  $http,
  $cookies,
  $location,
  $routeParams,
  $filter
) {
  $scope.user = $cookies.getObject("user");
  if (angular.isDefined($scope.user)) {
    $scope.listProducts = [];
    $scope.product_to_add = {
      id: "",
      price: "",
      quantity: $scope.quantity_to_add,
      addedDate: $filter("date", new Date(), "dd-MM-yyyy"),
      status: "giỏ hàng",
    };
    $scope.cart = {
      id: "",
      user_id: $scope.user.id,
      grand_total: 0,
      products: [],
    };
    $scope.products = [];
    var hadCart = function (user, addToCart) {
      $http.get(cartAPI).then(function (response) {
        let carts = response.data;
        carts.forEach((element) => {
          if (element.user_id === user.id) {
            $scope.cart = element;
            addToCart();
            return;
          }
        });
        if ($scope.cart.id == "") {
          $http.post(cartAPI, $scope.cart);
        }
      });
    };
    hadCart($scope.user, function () {
      $scope.listProducts = $scope.cart.products;
      let id = $routeParams.id;

      if (id !== undefined) {
        $http.get(productAPI + "/" + id).then(function (response) {
          if (angular.isDefined(response.data)) {
            addToCart(response.data);
            $http.put(cartAPI + "/" + $scope.cart.id, $scope.cart);
            $location.path("/products/details" + "/" + id);
          }
        });
      }
    });

    let findProductById = function (products, _product) {
      return products.find(function (product) {
        return product.id == _product.id;
      });
    };
    var addToCart = function (product) {
      let found = findProductById($scope.listProducts, product);
      if (found) {
        $scope.listProducts.forEach(function (product, index) {
          if (found.id === product.id) {
            $scope.listProducts[index].quantity +=
              $scope.product_to_add.quantity;
            return;
          }
        });
      } else {
        $scope.product_to_add.id = product.id;
        $scope.product_to_add.price = product.price;
        $scope.product_to_add.image = product.image;
        $scope.product_to_add.name = product.name;
        $scope.listProducts.push($scope.product_to_add);
      }
      $scope.cart.products = $scope.listProducts;
      $scope.cart.grand_total += product.price * $scope.product_to_add.quantity;
    };
  } else {
    $location.path("/login");
  }
};
