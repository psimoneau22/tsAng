import Rating = require('../models/rating');

interface ServiceEntityWithID {
    id: string;
}

class FireBaseServiceMessageConverter {
	
	static convertFromServiceArray<T extends ServiceEntityWithID>(data: Array<T>): Array<T> {
        let result: Array<T> = new Array<T>();
        
        for(let key in data) {
        
            let item = data[key];
            item.id = key;
            result.push(item);
        };
        
        return result;
    }	
}

export = FireBaseServiceMessageConverter;