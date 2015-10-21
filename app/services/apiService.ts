interface ApiService<T> {
				
	get(id: string): Promise<T>; 
	
    query(): Promise<T[]>;
	
	add(item: T): Promise<T>;
	
	update(item: T): Promise<T>;
	
	remove(item: T): Promise<T>; 
	
	subscribe(callback: (items: T[]) => void): void;
	
	unsubscribe(): void;
	
}

export default ApiService;
