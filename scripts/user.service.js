APP.service("userService", function() {
    var user;

    this.set = function(obj) {
        user = obj;
    };

    this.get = function() {
        return user;
    };
});