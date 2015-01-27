APP.controller('mainController', function($scope, bookingService, userService) {

    $scope.$on('user-changed', function(event, args) {
        $scope.user = userService.get();
        console.log('recieve change');
    });

});