window.LogoutController = function($location,$cookies){
    if($cookies.getObject('user') != undefined){
        $cookies.remove('user');
        console.log($cookies.getObject('user'));
    }
    $location.path("/login");
}