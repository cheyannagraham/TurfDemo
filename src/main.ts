import * as turf from "@turf/turf";

import { territoryData } from "../territorydata";

export const findCoordinateInTerritories = (lng: number, lat: number) => {
  let point = turf.point([lng, lat]);

  for (let terr of territoryData) {
    if (terr.category == "congregation map") continue;
    if (terr.boundary.length >= 4) {
      let poly = turf.polygon([terr.boundary]);
      if (turf.booleanPointInPolygon(point, poly)) {
        // console.log("\nTerritory Found!");
        // console.log("Coordinates: ", lng, lat);
        // console.log("Number: ", terr.number);
        // console.log("Category: ", terr.category);
        // console.log("ID: ", terr.territoryid, "\n");

        return { coordinates: { lat: lat, lng: lng }, territory: terr };
      }
    }
  }
  return "Not Found";
};

// findCoordinateInTerritories(-122.03329467773443, 37.92028808593747); // 1 497252
// findCoordinateInTerritories(-122.03569030761739, 37.918300628662074); // 2 576376
// findCoordinateInTerritories(-122.06379443407096, 37.90018570462888); // 31 244336
// findCoordinateInTerritories(-121.99765014648366, 37.8505973815918); // 156 366941

// // Pickering Place
// findCoordinateInTerritories(-122.0337433797624, 37.91846466410879); // unknown

// Test and validate etc

// Run code from node with npx tsx <>.ts
// Actually create js file npx tsc <>.ts
