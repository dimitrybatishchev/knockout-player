var db = (function(){
	
	var getLibrary = function(){
		var library = [];
		for (var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i);
			var albumsArray = JSON.parse(localStorage.getItem(key));
        	library.push({
        		artist: key, 
        		albums: albumsArray
        	});
		}
		return library;
	};
	
	var saveAlbum = function(artist, album, year, cover, songs){
		var artistInLibrary = localStorage.getItem(artist);
		if (artistInLibrary){
			var albumsList = JSON.parse(artistInLibrary);
			if (album in albumsList){
				return;
			} else {
				albumsList[album] = {
					year: year,
					cover: cover,
					songs: songs
				}
				localStorage.setItem(artist, JSON.stringify(albumsList));
			}
		} else {
			localStorage.setItem(artist, JSON.stringify([{
				album: album,
				year: year,
				cover: cover,
				songs: songs
			}]));
		}
	};
	
	return {
		getLibrary: getLibrary,
		saveAlbum: saveAlbum
	}
	
})();