var lastfmApi = (function(){

	var secret = "e53a291cce63ea0950b53d836b236c4e";
	var key = "2d68e433edbc30a9c3a56ea620c5a69e";
	
	
	var artist = (function () { 
	
	    var getInfo = function(artist, callback){
	    	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + key + "&format=json", callback);
	    }; 
	    
	    var getSimilar = function(artist, limit, callback){
	    	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + artist + '&api_key=' + key + '&format=json', callback);
	    };
	    
	    var getTopTracks = function(artist, limit, callback){
	    	$.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artist + "&api_key=" + key + "&format=json&limit=" + limit, callback);
	    };
	    
	    var getTopAlbums = function(artist, callback){
	    	$.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=" + key + "&format=json", callback);
	    };
	    
	    return {
	    	getInfo: getInfo,
	    	getSimilar: getSimilar,
	    	getTopTracks: getTopTracks,
	    	getTopAlbums: getTopAlbums
	    }; 
	    
	}());	
	
	var chart = (function () { 
		
		var getTopArtists = function(callback){
			$.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" + key + "&format=json", callback);
		}
		
		return {
			getTopArtists: getTopArtists
		};
		
	}());
	
	var album = (function(){
		
		var getInfo = function(artist, album, callback){
			$.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + key + "&artist=" + artist + "&album=" + album + "&format=json", callback );
		};
		
		return {
			getInfo: getInfo
		}
		
	}());	
	
	return {
		artist: artist,
		album: album,
		chart: chart
	};
	
})();