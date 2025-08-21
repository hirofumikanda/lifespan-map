import { Map, MapMouseEvent } from "maplibre-gl";

const ALLOW_LAYERS = [
  "lifespan_2020_male",
  "lifespan_2020_female",
  "sunshine_hours_2020",
  "lifespan_2015_male",
  "lifespan_2015_female",
  "sunshine_hours_2015",
  "lifespan_2010_male",
  "lifespan_2010_female",
  "sunshine_hours_2010",
  "lifespan_2005_male",
  "lifespan_2005_female",
  "sunshine_hours_2005",
  "lifespan_2000_male",
  "lifespan_2000_female",
  "sunshine_hours_2000",
];

export const setupPointerHandler = (map: Map) => {
  map.on("mousemove", (e: MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ALLOW_LAYERS,
    });
    if (features.length > 0) {
      map.getCanvas().style.cursor = "pointer";
    } else {
      map.getCanvas().style.cursor = "";
    }
  });
};
