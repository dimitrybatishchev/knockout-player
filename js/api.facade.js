var apiFacade = (function(lastfmApi, vkApi, db){

	var getAlbumsInLibrary = function(){
		var library = {};
		for (var i = 0; i < localStorage.length; i++){
			key = localStorage.key(i);  
        	library[key] = JSON.parse(localStorage.getItem(key));
		}
		return library;
	}	
		
	return {
		getAlbumsInLibrary: getAlbumsInLibrary
	};
	
})();