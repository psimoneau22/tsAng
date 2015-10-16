export default class Rating {

    title: string;
    description: string;
    value: boolean;

    constructor(title: string, description: string, value: boolean) {
        this.title = title;
        this.description = description;
        this.value = value;
    }
}