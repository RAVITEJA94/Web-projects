// Put your zillow.com API key here
var zwsid = "X1-ZWz1g1s6ll5lhn_31kch";
var onclicklatitude;
var onclicklongitude;
var latitude;
var longitude;
var laln;
var markerlist = [];
var myLatLng;
var map;
var infowindow;
var request = new XMLHttpRequest();
var address1;
var address2;

function initialize () {
   //clearInput();
    document.getElementById('address').value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("zipcode").value = "";

     initMap();
     geocoder = new google.maps.Geocoder();
     infowindow = new google.maps.InfoWindow;
     google.maps.event.addListener(map,'click',function(event){
     onclicklatitude = event.latLng.lat();
     onclicklongitude = event.latLng.lng();
     geoLaLn(geocoder, map,infowindow);
});
 document.getElementById("output").InnerHTML = "" ;

}

function displayResult () {
    if (request.readyState == 4) {
	markclear();
	var address = document.getElementById("address").value;
        var city = document.getElementById("city").value;
        var state = document.getElementById("state").value;
        var zipcode = document.getElementById("zipcode").value;
        address1 = address + "," + city + "," + state + "," +zipcode;
        var xml = request.responseXML.documentElement;
        var price = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
	longitude= xml.getElementsByTagName("address")[1].getElementsByTagName("longitude")[0].innerHTML;
	latitude= xml.getElementsByTagName("address")[1].getElementsByTagName("latitude")[0].innerHTML;
	document.getElementById("output").innerHTML += "<br/>Address:" +address1+"<br/>"+" Longtitude:" + longitude + "<br/>" + " Latitude:" + latitude + "<br/>" + " Price: $" + price + "<br/>";


   

    geocoder.geocode({'address': address1}, function(results,status){
 if(status == 'OK'){
              map.setCenter(results[0].geometry.location);
	      var mark = new google.maps.Marker({
		map:map,
		position:results[0].geometry.location,
		title:address1
	});
	markerlist.push(mark);
	}
  else{
	alert('Geocode failed due to :' +status);
      }
     });		
    }
}

function sendRequest () {
    request.onreadystatechange = displayResult;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zipcode = document.getElementById("zipcode").value;
    request.open("GET","proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+city+"+"+state+"+"+zipcode);
    request.withCredentials = "true";
    request.send(null);
}

function markclear(){
	for(var i=0;i<markerlist.length;i++){
		markerlist[i].setMap(null);
	    }
	markerlist.length=0;
}

function initMap() {
    myLatLng = {lat:32.75 , lng: -97.13};

    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLatLng
  });
}

function geoLaLn(geocoder, map, infowindow){

markclear();
laln={lat:onclicklatitude,lng:onclicklongitude};
geocoder.geocode({'location': laln}, function(re,st)

{
	if(st =='OK'){
 	   if(re[0]){
		map.setZoom(11);		
		var mar = new google.maps.Marker({
		position:laln,
		map:map });
	   markerlist.push(mar);
	   infowindow.setContent(re[0].formatted_address);
	   infowindow.open(map,mar);
	   var fulladdr = re[0].formatted_address;
	   sendReqOnClick(fulladdr);
	   }
	   else{
		window.alert(' Result not found ');
	   }
	}
	else{
	window.alert(' Geocoder failed due to :' + st);
       	}
});
}

function sendReqOnClick(addr){
	var add = addr.split("," ,3);
	var size = add[2].split(" " ,2);
	address2 = add+","+size;
	request.onreadystatechange = dis;
	request.open("GET","proxy.php?zws-id=" + zwsid + "&address=" +add[0]+ "&citystatezip=" + add[1]+ "+" + size[0]+ "+" + size[1]);
	request.withCredentials="true";
	request.send(null);
}

function dis(){
	if(request.readyState ==4){
		var xml = request.responseXML.documentElement;
		var estimate = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML; 
	document.getElementById("output").innerHTML +="<br/>Address:" +address2+"<br/>"+"latitude:"+ onclicklatitude + "<br/>longitude:"+ onclicklongitude +"<br/>Price: $"+ estimate +"<br/>";
 	}
}

function clearInput(){
document.getElementById('address').value = " ";
    document.getElementById("city").value = " ";
    document.getElementById("state").value = " ";
    document.getElementById("zipcode").value = " ";

}
