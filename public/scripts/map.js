var tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
  }),
  latlng = L.latLng(38.50, -98.35);

var map = L.map("map", { center: latlng, zoom: 1, layers: [tiles] });

var markers = L.markerClusterGroup();



map.addLayer(markers);
