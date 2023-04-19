window.ProductUpdateController = function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  $scope.myLayout = String($location.path()).includes("/admin");
  $scope.buttonTitle = "Update Product";
  let id = $routeParams.id;
  $http.get(productAPI + "/" + id).then(function (response) {
    let data = response.data;
    console.log(data.category);
    $scope.request = {
      id: data.id,
      name: data.name,
      category: data.category,
      price: data.price,
      quantity: data.quantity,
      description: data.description,
      image: data.image,
    };
  });
  $scope.fileName = function (element) {
    $scope.$apply(function ($scope) {
      $scope.request.image = element.files[0].name;
      let formData = new FormData();
      formData.append("file", element.files[0]);
      $http
        .post("http://localhost:8080/upload", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(
          function (response) {
            let isUploaded = response.data;
            alert(isUploaded);
          },
          function () {
            alert("Upload failed");
          }
        );
    });
  };
  $scope.addOrUpdate = function (event) {
    event.preventDefault();
    if (id != undefined) {
      if ($scope.request.name == "") return;
      $http.put(productAPI + "/" + id, $scope.request).then(function () {
        //   $scope.listCategories.push(response.data);
        alert("Updated category successfully");
        $location.path("/admin/products");
      });
    }
  };
};
