APP.service("bookingService", function(databaseService) {

    // CRUD SERVICE TO MOCK OUT THE DATABASE
    // CREATE

    // READ
    this.read = function() {
        return databaseService.database;
    };

    // UPDATE
    // DELETE
    // 
});