define(function(require) {
	
    var FireBaseServiceMessageConverter = function() { };
    
	FireBaseServiceMessageConverter.convertFromServiceArray = function(data) {
        var result = [];
                
        for(var key in data) {
        
            var item = data[key];
            item.id = key;
            result.push(item);
        };
        
        return result;
    }
    
    return FireBaseServiceMessageConverter;
});