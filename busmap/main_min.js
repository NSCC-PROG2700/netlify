!(function () {
  var e = L.map("map").setView([44.66907, -63.613196], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(e),
    L.circle([44.66909051825041, -63.61322564706731], { radius: 1e3 }).addTo(e);
  var o = new (L.Icon.extend({
      options: {
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      },
    }))({ iconUrl: "bus.png" }),
    r = L.geoJSON(null, {
      pointToLayer: function (e, r) {
        return L.marker(r, { icon: o, rotationAngle: e.properties.bearing });
      },
    }),
    t = L.geoJSON(null, {
      pointToLayer: function (e, o) {
        var r = L.divIcon({
          className: "number-icon",
          iconSize: [18, 18],
          iconAnchor: [9, 9],
          html: e.properties.trip.routeId,
          popupAnchor: [0, -9],
        });
        return L.marker(o, { icon: r });
      },
    }),
    n = (L.featureGroup().addLayer(r).addLayer(t).addTo(e), []),
    a = () => {
      const e = new URLSearchParams(window.location.search).get("route");
      let o = "";
      null !== e && (o = `?route=${e}`),
        fetch(`https://prog2700.onrender.com/hrmbuses/geojson${o}`)
          .then((e) => e.json())
          .then((e) => {
            (e.features = e.features.filter(
              (e) => 0 === n.length || n.includes(e.properties.trip.routeId)
            )),
              console.log(e),
              r.clearLayers(),
              t.clearLayers(),
              r.addData(e),
              t.addData(e),
              setTimeout(a, 12e3);
          })
          .catch((e) => {
            console.log(`Error: ${e}`), setTimeout(a, 12e3);
          });
    };
  a();
})();
