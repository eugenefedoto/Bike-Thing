

$(document).ready(function() {
  $.ajax({
    method: "GET",
    url: "/networks",
  }).done(function(res) {
    var addressPoints = res;
    for (var i = 0; i < addressPoints.length; i++) {
      var network = addressPoints[i];
      var company
      if(network.company === null){
        company = "Company name N/A"
      }else{
        company = network.company[0];
      }
      
      var location = network.location;
      var latitude = location.latitude
      var longitude = location.longitude
      var marker = L.marker(new L.LatLng(latitude, longitude), { title: company });
      marker.bindPopup(company);
      markers.addLayer(marker);
    }
  });
});