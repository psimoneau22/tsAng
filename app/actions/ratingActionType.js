define(function (require) {
    
    var RatingActionType = Object.freeze({
        Create: 0,
        Update: 1,
        Delete: 2,
        RecievedAll: 3,
        Error: 4
    });
    
    return RatingActionType;    
});
