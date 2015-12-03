define(function(require) {
	
	var AppDispatcher = ng.Class({
		constructor: function(){ 
			
			this._callbacks = {};
			this._isDispatching = false;
			this._isHandled = {};
			this._isPending = {};
			this._lastID = 1;
		},
		
		handleViewAction: function(action) {
	
			this.dispatch({
				source: 'VIEW_ACTION',
				action: action
			});
		},

		register: function(callback) {
			var id = "ID_" + this._lastID;
			this._callbacks[id] = callback;
			return id;
		},
		
		unregister: function(id) {		
			delete this._callbacks[id];
		},
		
		dispatch: function(payload) {
			if(this._isDispatching){
				throw 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.';
			}
			this._startDispatching(payload);
			try {
				for (var id in this._callbacks) {
					if (this._isPending[id]) {
						continue;
					}
					this._invokeCallback(id);
				}
			} 
			finally {
				this._stopDispatching();
			}
		},
		
		isDispatching: function() {
			return this._isDispatching;
		},
		
		_startDispatching: function(payload) {
			for (var id in this._callbacks) {
				this._isPending[id] = false;
				this._isHandled[id] = false;
			}
			
			this._isDispatching = true;
			this._pendingPayload = payload;		
		}, 
		
		_stopDispatching: function() {		
			delete this._pendingPayload;
			this._isDispatching = false;	
		},  
		
		_invokeCallback: function(id) {
			this._isPending[id] = true;
			this._callbacks[id](this._pendingPayload);
			this._isHandled[id] = true;
		}
	});
	
	return AppDispatcher;
});