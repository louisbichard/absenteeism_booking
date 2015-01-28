/**
 * CRUD SERVICE
 */
APP.service("bookingService", function(databaseService) {

    var formatDatabase = function(curr, index) {
        var date_split = curr.date.split('/');
        var d = date_split[0];
        var m = date_split[1];
        var y = date_split[2];

        return {
            name: curr.name,
            title: curr.name,
            // NOTE: SUBTRACT ONE FROM THE MONTH AS JANUARY IS CONSIDERED 00 NOT 01
            start: y + "-" + m + "-" + d,
            end: y + "-" + (m - 1) + "-" + d,
            editable: true,
            value: curr.value,
            unit: curr.unit,
            className: [
                'color-value-' + curr.value,
                'calendar-cell',
                'calendar-unit-' + curr.unit
            ],
        };
    };

    var establishClashes = function(curr, idx, original) {

        has_clash = false;

        var a = new moment(original[original[idx - 1] ? idx - 1 : 0].start);

        var b = new moment(original[idx].start);

        var c = new moment(original[original[idx + 1] ? idx + 1 : idx].start);

        var diff_before = Math.abs(a.diff(b, 'days'));
        var diff_after = Math.abs(b.diff(c, 'days'));

        var last_element = (original.length - 1 === idx);
        var first_element = (idx === 0);

        if (first_element && diff_after <= 4) {
            curr.className.push('event-clash');
        } else if (last_element && diff_before <= 4) {
            curr.className.push('event-clash');
        } else if ((!last_element && !first_element) && (diff_before <= 4 || diff_after <= 4)) {
            curr.className.push('event-clash');
        }

        return curr;
    };

    // READ
    this.read = {
        raw: function() {
            return databaseService.database;
        },
        formatted: function() {
            return _.chain(databaseService.database)
                .map(formatDatabase)
                .sortBy(function(curr) {
                    return new Date(curr.start);
                })
                .map(establishClashes)
                .value();
        }
    };

    this.create = function(event) {
        console.log('EXAMPLE SERVER UPDATE REQUEST', event);

        // TODO: SANITISISE AND MAKE SURE IT DOESN'T ALREADY EXIST
        databaseService.database.push(event);
    };

});