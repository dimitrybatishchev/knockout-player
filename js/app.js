function PlayerViewModel() {
	// Data
	var self = this;
	self.folders = ['Artists', 'Albums'];
	self.chosenFolderId = ko.observable();
	self.chosenArtistData = ko.observable();
	self.chosenAlbumData = ko.observable();
	self.chosenArtistAlbums = ko.observable();
	self.chosenArtistTopSongs = ko.observable();
	self.chosenMailData = ko.observable();
    self.chosenFolderData = ko.observable(); 
    
    self.chosenAlbumsInLibrary = ko.observable();
			    
	// Behaviours    
    self.goToFolder = function(folder) { location.hash = folder };
    self.goToArtist = function(artist) { location.hash = 'search/' + artist.name };
    self.goToLibraryByAlbums = function() { location.hash = 'library/albums' };
    			
    			
    // Client-side routes    
	Sammy(function() {
		this.get('#:folder', function() {
			self.chosenFolderId(this.params.folder);
			self.chosenMailData(null);
			self.chosenAlbumsInLibrary(null);
			   	
			lastfmApi.chart.getTopArtists(self.chosenFolderData);
		});
		this.get('#library/albums', function(){
			self.chosenFolderId(this.params.folder);
			self.chosenAlbumData(null);
			self.chosenFolderData(null);
			self.chosenAlbumsInLibrary(null);
			self.chosenMailData(null);
			
			console.log(db.getLibrary());
			
			self.chosenAlbumsInLibrary(db.getLibrary());
		}); 
		this.get('#search/:artist', function() {
			var artist = this.params.artist;
			self.chosenFolderId(this.params.folder);
			self.chosenAlbumData(null);
			self.chosenFolderData(null);
			self.chosenAlbumsInLibrary(null);
				        
			lastfmApi.artist.getInfo(artist, self.chosenArtistData);
			/*	        
			lastfmApi.artist.getTopTracks(artist, 5, function(data){
				var requestsToVK = [];
				for (var trackIndex in data.toptracks.track) {
					var track = data.toptracks.track[trackIndex];
					requestsToVK.push(getSongFormVK(track.name, track.artist.name));
				}
				var topSongs = [];
				$.when.apply(null, requestsToVK).done(function(data){
					for (var i = 0; i < arguments.length; i++) {
						var songData = arguments[i][0].response[1];
						var songObject = {
					    	artist: songData.artist,
					       	song: songData.title,
					       	url: songData.url
					    }
					    topSongs.push(songObject);
					}
					self.chosenArtistTopSongs({ songs: topSongs });
				});
			});
			*/
			lastfmApi.artist.getTopAlbums(artist, self.chosenArtistAlbums);
		}); 
		
		this.get('', function() { this.app.runRoute('get', '#Artists') });
	}).run();   
			
	// Operations
	self.qw = function() {
		console.log(self.chosenAlbumData());
		db.saveAlbum(
			self.chosenAlbumData().album.artist,
			self.chosenAlbumData().album.name, 
			self.chosenAlbumData().album.releasedate,
			self.chosenAlbumData().album.image[2]['#text'],
			self.chosenAlbumData().album.tracks.track
		);
	};
			    
	self.goToAlbum = function(album) { 
		self.chosenFolderData(null); // Stop showing a folder
		self.chosenMailData(null);
		self.chosenArtistAlbums(null);
		lastfmApi.album.getInfo(album.artist.name, album.name, self.chosenAlbumData);
	}
			    
	var getSongFormVK = function(artist, song){
		return $.getJSON("https://api.vk.com/method/audio.search.json?q=" + artist + "-" + song + "&access_token=25c780a593abc7ec2dd73a24e4384973a9e30515e78474a0aa8419fd9255370c0a64024a36a52e11dbccd&callback=?");
	};
};
			
ko.applyBindings(new PlayerViewModel());