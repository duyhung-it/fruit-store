window.ProductController = function (
  $scope,
  $rootScope,
  $http,
  $timeout,
  $cookies,
  $location,
  $routeParams,
  $filter
) {
  $scope.currentPage = 1;
  $scope.limit = 12;
  $scope.nextPage = function () {
    if ($scope.currentPage < Math.floor($scope.totalPages)) {
      $scope.currentPage = Number($scope.currentPage) + 1;
      $location.path("/products/" + $scope.currentPage);
    }
  };
  $scope.prePage = function () {
    if ($scope.currentPage > 1) {
      $scope.currentPage -= 1;
      $location.path("/products/" + $scope.currentPage);
    }
  };
  $rootScope.myLayout = String($location.path()).includes("/admin");
  $scope.c_filter = {
    category: {},
  };
  $rootScope.user = $cookies.getObject("user");
  $rootScope.listProducts = [];
  $rootScope.listCategories = [];
  $http.get(productAPI).then(function (response) {
    $rootScope.listProducts = response.data;
    if ($rootScope.listPaging == undefined)
      $rootScope.listPaging = response.data;
    $scope.totalPages = 1;
    $scope.listPages = [1];
    pagination();
  });
  $http.get(categoryAPI).then(function (response) {
    $rootScope.listCategories = response.data;
  });
  $scope.filterByCategory = function (c) {
    $scope.c_filter.category.id = c.id;

    $scope.totalPages = 1;
    $scope.listPages = [1];

    $rootScope.listPaging = $filter("filter")(
      $rootScope.listProducts,
      $scope.c_filter
    );
    pagination();
    if ($scope.totalPages < $scope.currentPage) {
      $location.path("/products/1");
    }
  };
  // Pagination
  // if ($routeParams.page != undefined) {
  let pagination = function () {
    // $rootScope.listPaging = $rootScope.listProducts;
    let totalItems = $rootScope.listPaging.length;
    if ($routeParams.page != undefined) $scope.currentPage = $routeParams.page;
    $scope.totalPages = totalItems / $scope.limit + 1;
    for (let i = 1; i < $scope.totalPages - 1; i++) {
      $scope.listPages.push(i + 1);
    }
    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
  };
  // }
  angular.element(document).ready(function () {
    $timeout(function () {
      angular.element(document.querySelector(".owl-carousel")).owlCarousel({
        margin: 10,
        nav: true,
        loop: true,
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
