var FeignXhr = (function(window){
	
	
	function FeignXhrClient(){
		var args  = Args([
	      { defaults: Args.OBJECT | Args. Optional, _default: {
			  method: null,
			  url: null,
			  async: true,
			  user: null,
			  password: null
		  }}
	    ], arguments);
		this.defaults = args.defaults;
	}
	
	
	
	FeignXhrClient.prototype.request =  function(request){
	  var options = this._createXhrOptions(request.baseUrl, request.options, request.parameters);
	  var _this = this;
	  var promise = new Promise(function(resolve, reject){
	    	var xhr = new window.XMLHttpRequest();
			xhr.open(options.method, options.url, options.async, options.user, options.password);
			
			
			xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(xhr.readyState == 4) {
					if (xhr.status >= 400)
						return reject({status:xhr.status, body: xhr.responseText});
					else
						return resolve({raw: xhr, body: xhr.responseText});
			    }
			};
			
			
			var parameters = request.parameters;
			if (options.method === 'GET' || parameters === null){
				parameters = undefined;
			}
			xhr.send(parameters);
		
		
	  });
	  return promise;
	};
	
	
	FeignXhrClient.prototype._createXhrOptions = function(baseUrl, requestOptions, parameters){
	  var options  = Args([
	      { method: Args.STRING | Args.Optional, _default: 'GET' },
	      { uri: Args.STRING | Args.Required}
	    ], [requestOptions]);
	
	    
	    var xhrOptions = _.defaults({
	      url: baseUrl + options.uri,
	      method: options.method
	    }, this.defaults);
		
	    
		if (xhrOptions.method === 'GET' && parameters){
			var url = new URL(xhrOptions.url);
			var paramQryString = _.chain(parameters).pairs()._map(function(pair){
				return pair.join('=');
			}).value().join("&");
			var delim = (!!url.search) ?  '&' : '?';
			url.search = url.search + delim + paramQryString;
			xhrOptions.url = url.toString();
		}
		
		
	  	return xhrOptions;
	};

	
	
	
	return FeignXhrClient;
	
})(window);