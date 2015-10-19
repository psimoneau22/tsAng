interface MessageConverter {
	convertFromServiceArray<T>(data: Array<T>): Array<T>;        	
}

export default MessageConverter;