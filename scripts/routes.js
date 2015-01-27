APP.config(function($routeProvider) {
    $routeProvider

        .when('/', {

        templateUrl: '../views/timetable.html'
            //  controller: 'userController'
    })

    .when('/timetable', {
        templateUrl: '../views/timetable.html',
        controller: 'timetableController'
    })

    .when('/user', {
        templateUrl: '../views/user.html',
        controller: 'userController'
    })

    .when('/notfound', {
        templateUrl: '../views/utilities/notfound.html'
    })

    .otherwise({
        redirectTo: '/notfound'
    });
});