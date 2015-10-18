class Rating {

    id: string;
    title: string;
    description: string;
    value: number;

    constructor(title: string = null, description: string = null, value: number = null) {        
        this.title = title;
        this.description = description;
        this.value = value;
    }
    
    static convertServiceArray(data: Array<any>): Rating[] {
        let result: Rating[] = [];
        for(let key in data) {
        
            let rating: Rating = <Rating>data[key];
            rating.id = key;
            result.push(rating);
        };
        
        return result;
    }
}

export = Rating;