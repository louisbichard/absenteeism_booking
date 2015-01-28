APP.controller('timetableController', function($scope, bookingService, userService) {

    // TODO: REMOVE THE OR
    $scope.selectedUser = $scope.selectedUser;

    // TODO: SET AS MOST FREQUENT FOR THAT USER
    $scope.add_event = {
        value: "V",
        unit: "AM"
    };

    $scope.users =
        _.chain(bookingService.read.raw())
        .uniq('name')
        .sortBy('name')
        .value();

    $scope.filter = {
        user: [],
        unit: {
            am: true,
            pm: true
        }
    };

    var filterByUser = function(filter, curr) {
        return (filter.val.indexOf(curr.name) > -1);
    };

    // # EVENTS

    // # CALENDAR CONFIGURATION
    $scope.eventSources = [
        []
    ];

    $scope.addNewEvent = function(start, end) {
        var event_details = confirm([
            'Please confirm the following is correct for this booking, then enter a title: \n',
            'User: ' + $scope.selectedUser.name,
            'Value: ' + $scope.add_event.value,
            'Unit: ' + $scope.add_event.unit,
        ].join('\n'));

        if (event_details) {
            bookingService.create({
                "userid": $scope.selectedUser.userid,
                "name": $scope.selectedUser.name,
                "date": moment(start._d).format('DD/MM/YYYY'),
                "unit": $scope.add_event.unit,
                "value": $scope.add_event.value
            });
        }
        $scope.updateWithFilter();

    };

    $scope.uiConfig = {
        calendar: {
            weekends: false,
            selectable: true,
            height: 700,

            selectHelper: true,
            select: $scope.addNewEvent,
            header: {
                left: 'month',
                center: 'title',
                right: 'today prev,next'
            }
        }
    };

    $scope.filterUser = function(user) {
        var index = _.findIndex($scope.filter.user, function(chr) {
            return user === chr;
        });

        // IF NOT ALREADY IN ARRAY
        if (index === -1) {
            $scope.filter.user.push(user);
        } else {
            $scope.filter.user.splice(index, 1);
        }
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