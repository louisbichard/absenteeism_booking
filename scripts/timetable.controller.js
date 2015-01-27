APP.controller('timetableController', function($scope, bookingService, userService) {

    $scope.current_logged_in_user = userService.get();

    $scope.users =
        _.chain(bookingService.read.raw())
        .uniq('name')
        .sortBy('name')
        .value();

    $scope.filterUserNumber = 1;
    $scope.getNumber = function(num) {
        return new Array(num);
    };
    $scope.filter = {
        user: [],
        unit: {
            am: true,
            pm: true
        }
    };

    $scope.updateUserNumberFilter = function(subtract) {
        $scope.filterUserNumber++;
    };

    $scope.removeUserFilterField = function(idx) {
        $scope.filter.user.splice(idx, 1);
        $scope.filterUserNumber--;
        $scope.updateWithFilter();
    };

    var filterByUser = function(filter, curr) {
        return !!_.find(filter.val, {
            name: curr[filter.prop]
        });
    };

    // # EVENTS

    // # CALENDAR CONFIGURATION
    $scope.eventSources = [
        []
    ];

    $scope.uiConfig = {
        calendar: {
            weekends: false,
            height: 700,
            editable: true,
            header: {
                left: 'month',
                center: 'title',
                right: 'today prev,next'
            }
        }
    };

    $scope.clearFilters = function() {
        console.log('test');
        $scope.filterUserNumber = 1;
        $scope.filter.user = [];
        $scope.updateWithFilter();
    };

    $scope.newUserSelected = function() {
        $scope.filterUserNumber++;
        $scope.updateWithFilter();
    };

    $scope.updateWithFilter = function() {
        var temp_events = _.chain(bookingService.read.formatted())
            .filter(_.partial(filterByUser, {
                val: $scope.filter.user,
                prop: 'name'
            }))
            .value();

        $scope.events = temp_events;

        $scope.myCalendar.fullCalendar('destroy');
        var config = {
            events: temp_events
        };
        $scope.myCalendar.fullCalendar(_.extend(config, $scope.uiConfig.calendar));

        $scope.myCalendar.fullCalendar('refetchEvents');

    };

});