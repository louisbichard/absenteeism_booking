APP.controller('timetableController', function($scope, bookingService) {

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
        user: []
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
    $scope.events = bookingService.read.formatted();
    $scope.eventSources = [$scope.events];

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
        $scope.filters = {};
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
        $scope.myCalendar.fullCalendar({
            events: temp_events
        });

        $scope.myCalendar.fullCalendar('refetchEvents');

    };

});