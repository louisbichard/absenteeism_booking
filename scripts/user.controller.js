APP.controller('userController', function($scope, bookingService, userService, $rootScope) {

    $scope.users = _.uniq(bookingService.read(), 'name');

    $scope.$watch('selectedUser', function() {
        // UPDATE SERVICE WITH THE CHANGE
        userService.set($scope.selectedUser);

        // BROADCAST THE USER CHANGE
        console.log('broadcast change');
        $rootScope.$broadcast('user-changed');

    });

});