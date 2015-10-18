import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher<any> {
	
	handleViewAction(action) {
		
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});		
	}
}

export = AppDispatcher;