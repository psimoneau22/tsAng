interface ApiService<T> {
				
	get(id: string): Promise<T>; 
	
    query(): Promise<T[]>;
	
	add(rating: T): Promise<T>;
	
	update(rating: T): Promise<T>;
	
	remove(rating: T): Promise<T>; 
}

export default ApiService;
