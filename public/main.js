mapboxgl.accessToken =
  "pk.eyJ1IjoiZGV2Y2hleWFubmFncmFoYW0iLCJhIjoiY204c3hqMTAwMDR4ZzJqb2NtdG1yZjN2MyJ9.lxowAhD4XJN9-bIz0JGOyg";

const main = () => {
  console.log("main running")
  const coorForm = document.getElementById("coor-form");
  coorForm.addEventListener("submit", e => {
    e.preventDefault();
    console.log("form submitted");
    try {

      const lng = Number(coorForm.elements["longitude"].value);
      const lat = Number(coorForm.elements["lattitude"].value);
      fetch("http://localhost:3000/territories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lng: lng,
            lat: lat
          })
        })
        .then(res => res.json())
        .then(data => {
          displayData(data);
          loadMap(data.coordinates, data.territory.boundary);

        }).catch(e => {
          console.log("Fetching Error:", e);
        });
    } catch (e) {
      alert("invalid coordinates")
    }
  });
}

const displayData = data => {
  const terrNum = document.getElementById("terr-num");
  const terrCat = document.getElementById("terr-cat");
  const terrId = document.getElementById("terr-id");

  terrNum.innerText = data.territory.number;
  terrCat.innerText = data.territory.category;
  terrId.innerText = data.territory.territoryid;

}

const loadMap = (inCoordinates, boundaries) => {
  console.log("loading map");
  // starting zoom

  const map = new mapboxgl.Map({
    container: "map", // container ID
    center: inCoordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 15,
  });
  map.on("load", () => {
    // Add a data source containing GeoJSON data.
    map.addSource("terrBoundary", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          // These coordinates outline terrBoundary.
          coordinates: [boundaries],
        },
      },
    });

    // Add a new layer to visualize the polygon.
    map.addLayer({
      id: "terrBoundary",
      type: "fill",
      source: "terrBoundary", // reference the data source
      layout: {},
      paint: {
        "fill-color": "#0080ff", // blue color fill
        "fill-opacity": 0.5,
      },
    });

    // Add a black outline around the polygon.
    map.addLayer({
      id: "outline",
      type: "line",
      source: "terrBoundary",
      layout: {},
      paint: {
        "line-color": "#000",
        "line-width": 3,
      },
    });
  });
};

window.onload = () => main();