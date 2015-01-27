/**
 * CRUD SERVICE
 */
APP.service("bookingService", function(databaseService) {
    var formatDatabase = function(curr, index) {
        var date_split = curr.date.split('/');
        var d = date_split[0];
        var m = date_split[1];
        var y = date_split[2];

        var color = "red";

        return {
            name: curr.name,
            title: curr.name + "(" + curr.unit + ")",
            // NOTE: SUBTRACT ONE FROM THE MONTH AS JANUARY IS CONSIDERED 00 NOT 01
            start: new Date(y, m - 1, d),
            end: new Date(y, m - 1, d),
            className: ['color-value-' + curr.value, 'calendar-cell'],
        };
    };

    // READ
    this.read = {
        raw: function() {
            return databaseService.database;
        },
        formatted: function() {
            return _.map(databaseService.database, formatDatabase);
        }
    };

});