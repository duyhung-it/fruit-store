window.ProductController = function (
  $scope,
  $rootScope,
  $http,
  $timeout,
  $cookies
) {
  $scope.c_filter = {
    category: {},
  };
  $rootScope.listProducts = [];
  $scope.listCategories = [];
  $rootScope.user = {};
  $http.get(productAPI).then(function (response) {
    $rootScope.listProducts = response.data;
  });
  $http.get(categoryAPI).then(function (response) {
    $scope.listCategories = response.data;
  });
  $scope.filterByCategory = function (c) {
    $scope.c_filter.category.id = c.id;
  };
  $rootScope.user = $cookies.getObject("user");
  angular.element(document).ready(function () {
    $timeout(function () {
      angular.element(document.querySelector(".owl-carousel")).owlCarousel({
        margin: 10,
        nav: true,
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
