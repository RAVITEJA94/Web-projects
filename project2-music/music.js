// Put your Last.fm API key here
var api_key = "7c7b12053d4981f860fc481a1e013c6e";

function initialize()
{
}

function sendRequest () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
	    var artname = json.artist.name;
	    var arturl = json.artist.url;
	    var pub = json.artist.bio.published;
	    var image = json.artist.image[2]["#text"];
	    var content = json.artist.bio.content;  
	            
            document.getElementById("output").innerHTML = "<img src=" +image + "/>" + "<br/>" + "<h1>" + artname + "</h1>" + "<br/>" + "<h4>" + "URL:" + "<a href =" + arturl +">" + arturl + "</a></h4>" + "<br/>" + "<h4>" + "Biography:" + "</h4>" + content + "<br>" + "<h5>" + "Published date:" + "</h5>" + pub;
	albumList();
	artistList();
        }
    };
    xhr.send(null);
}

function albumList () {
    var xhr = new XMLHttpRequest();
    var method = "artist.gettopalbums";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
	    document.getElementById("topalbums").innerHTML = "<h2> <u> TOP ALBUMS </u> </h2> ";
	    for( var i=0; i<16; i++) 	
	    { 
	    var albumname = json.topalbums.album[i].name;
	    var albumpic = json.topalbums.album[i].image[1]["#text"];          
            document.getElementById("album").innerHTML += i+1 + ") " + albumname + "<br>"  +  "<img src=" +albumpic + "/>" + "<br>" ;
	}
        }
    };
    xhr.send(null);
}

function artistList () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getsimilar";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
	    document.getElementById("similar").innerHTML = "<h4> <u> SIMILAR ARTISTS </u> </h4> ";    
	    for( var i=0; i<25; i++) 	
	    { 
	    var artistname = json.similarartists.artist[i].name;      
            document.getElementById("sartists").innerHTML += i+1 + ") " + artistname + "<br>" ;
	}
        }
    };
    xhr.send(null);
}
