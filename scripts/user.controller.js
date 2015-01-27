APP.controller('userController', function($scope, bookingService) {

    $scope.users = _.uniq(bookingService.read(), 'name');

});