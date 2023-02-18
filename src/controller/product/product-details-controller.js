window.ProductDetailsController = function (
  $scope,
  $routeParams,
  $http,
  $timeout,
  $rootScope,
  $cookies
) {
  $scope.user = $cookies.getObject("user");
  let id = $routeParams.id;
  $scope.quantity = 1;
  $rootScope.quantity_to_add = 1;
  $scope.onQuantityChange = function () {
    $rootScope.quantity_to_add = $scope.quantity;
  };
  $http.get(productAPI + "/" + id).then(function (response) {
    $scope.product = response.data;
  });
  $http.get(productAPI).then(function (response) {
    $scope.listProducts = response.data;
  });

  angular.element(document).ready(function () {
    $timeout(function () {
      angular.element(document.querySelector(".owl-carousel")).owlCarousel({
        margin: 10,
        loop: true,
        autoWidth: true,
        items: 4,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 5,
          },
        },
      });
    }, 300);
  });
};
