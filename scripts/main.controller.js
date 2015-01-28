APP.controller('mainController', function($scope, bookingService) {

    // TODO: REMOVE THE OR
    $scope.selectedUser = $scope.selectedUser;

    // TODO: SET AS MOST FREQUENT FOR THAT USER
    $scope.selectallusers = true;
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
        user: _.reduce($scope.users, function(prev, curr) {
            prev[curr.name] = true;
            return prev;
        }, {}),
        unit: {
            "AM": true,
            "PM": true
        }
    };

    // # EVENTS

    // # CALENDAR CONFIGURATION
    $scope.eventSources = [
        bookingService.read.formatted()
    ];

    $scope.selectAllUsers = function() {
        $scope.filter.user = _.chain($scope.filter.user)
            .map(function(user, name) {
                var temp = {};
                temp[name] = $scope.selectallusers;
                return temp;
            })
            .reduce(function(prev, curr) {
                return _.extend(prev, curr);
            }, {})
            .value();
        $scope.redrawCalendar();
    };

    $scope.addNewEvent = function(start, end) {
        var event_details = confirm([
            'Please confirm the following is correct for this booking: \n',
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
        $scope.redrawCalendar();

    };

    $scope.uiConfig = {
        calendar: {
            weekends: false,
            selectable: true,
            height: 600,
            eventLimit: true,
            eventClick: function(calEvent, jsEvent, view) {
                console.log('event click');
            },
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
        $scope.redrawCalendar();

    };

    var filterByUser = function(filter, curr) {
        return !!filter.val[curr.name];
    };

    var filterByUnit = function(filter, curr) {
        return !!filter.val[curr.unit];
    };

    $scope.redrawCalendar = function() {
        var temp_events = _.chain(bookingService.read.formatted())
            .filter(_.partial(filterByUser, {
                val: $scope.filter.user,
                prop: 'name'
            }))
            .filter(_.partial(filterByUnit, {
                val: $scope.filter.unit,
                prop: 'unit'
            }))
            .value();

        $scope.events = temp_events;
        $scope.total_events = temp_events.length;

        $scope.myCalendar.fullCalendar('destroy');
        var config = {
            events: temp_events
        };
        $scope.myCalendar.fullCalendar(_.extend(config, $scope.uiConfig.calendar));

        $scope.myCalendar.fullCalendar('refetchEvents');

    };

    $scope.$watch('filter', function() {
        console.log('test');

        $scope.redrawCalendar();

    }, true);

});