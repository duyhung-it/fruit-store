myApp.directive("my-data-layout", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.checkPath = String($location.path()).includes("/admin");
    console.log($location.path());
    return {
      scope: {
        myLayout: "@",
      },
    };
  },
]);
