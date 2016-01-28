var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    var latM = -23.3;
    var lonM = -46.37;
    
    // verifica se o navegador tem suporte a geolocalização
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){ // callback de sucesso
            // ajusta a posição do marker para a localização do usuário
            latM = position.coords.latitude;
            lonM = position.coords.longitude;
        }, 
        function(error){ // callback de erro
           console.log('Erro ao obter localização.', error);
        });
    } else {
        console.log('Navegador não suporta Geolocalização!');
    }  
    
  directionsDisplay = new google.maps.Geocoder();
  var saopaulo = new google.maps.LatLng(latM, lonM);
  var mapOptions = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: saopaulo
  }
  map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
  directionsDisplay.setMap(map);
}

var marcadores = [];
var criaMarcador = function(marcador, mapa) {
  var opcoes = {
    position: marcador.pos, title: marcador.titulo, animation: google.maps.Animation.DROP, icon:{url: 'img/icon.png', scaledSize: new google.maps.Size(50, 50)}, map: mapa
  }
  var novoMarcador = new google.maps.Marker(opcoes);
  marcadores.push(novoMarcador);
  novoMarcador.setMap(map);
  map.setCenter(novoMarcador.position)
  map.setZoom(15);
}

function adiciona(){
    var address = document.getElementById('endereco').value;
    directionsDisplay.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marcador = {
              pos: results[0].geometry.location
              , titulo: 'Derrubada denunciada'
            }
            criaMarcador(marcador, directionsDisplay);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

$(function() {      
  //Enable swiping...
  $(window).swipe( {
	//Generic swipe handler for all directions
	swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	  if(direction == "right"){
		$.sidr('open', 'sidr');
	  } else {
		$.sidr('close', 'sidr');
	  }
	},
	//Default is 75px, set to 0 for demo so any distance triggers swipe
	 threshold:75
  });
});

$(document).ready(function() {
	$('#simple-menu').sidr();
	$.sidr('open', 'sidr');
});