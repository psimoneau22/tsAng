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
}

export = Rating;