define(function(require) {
    
    var Rating = function(title, description, value) {           
        this.title = title;
        this.description = description;
        this.value = value;
    };
    
    return Rating;
});