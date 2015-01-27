APP.controller('timetableController', function($scope, bookingService) {

    /*

    date: "06/10/2014"
    name: "Matthew Webb"
    unit: "AM"
    userid: 1
    value: "V"

    */

    $scope.events = _.map(bookingService.read(), function(curr, index) {
        var date_split = curr.date.split('/');
        var d = date_split[0];
        var m = date_split[1];
        var y = date_split[2];

        var color = "red";

        return {
            title: curr.name + "(" + curr.unit + ")",
            // NOTE: SUBTRACT ONE FROM THE MONTH AS JANUARY IS CONSIDERED 00 NOT 01
            start: new Date(y, m - 1, d),
            end: new Date(y, m - 1, d),
            className: ['color-value-' + curr.value, 'calendar-cell'],
        };
    });

    $scope.alertOnResize = function() {
        console.log('resize');
    };

    $scope.alertOnDrop = function() {
        console.log('resize');
    };

    $scope.alertEventOnClick = function() {
        console.log('resize');
    };

    $scope.eventSources = [$scope.events];

    $scope.uiConfig = {
        calendar: {
            weekends: false,
            height: 800,
            editable: true,
            header: {
                left: 'month',
                center: 'title',
                right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };

});