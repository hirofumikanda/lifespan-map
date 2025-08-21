import maplibregl, { Map, MapMouseEvent } from "maplibre-gl";
import type { MapGeoJSONFeature } from "maplibre-gl";

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

export const setupPopupHandler = (map: Map) => {
  map.on("click", (e: MapMouseEvent) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ALLOW_LAYERS,
    });

    if (features.length === 0) return;

    const popupContent = buildPopupContent(features[0]);
    new maplibregl.Popup({ closeOnClick: true })
      .setLngLat(e.lngLat)
      .setHTML(popupContent)
      .addTo(map);
  });
};

const buildPopupContent = (feature: MapGeoJSONFeature): string => {
  const props = feature.properties ?? {};
  const layerId = feature.layer.id;
  let html = `<table style=\"border-collapse:collapse;\">`;

  if (props.name !== undefined) {
    html += `
      <tr>
        <td style=\"padding:4px; border:1px solid #ccc;\"><strong>都道府県名</strong></td>
        <td style=\"padding:4px; border:1px solid #ccc;\">${escapeHTML(String(props.name))}</td>
      </tr>`;
  }
  if (props[layerId] !== undefined) {
    let label = layerId;
    if (layerId.startsWith("lifespan_")) {
      const [_, year, gender] = layerId.split("_");
      if (gender === "male") label = `平均寿命(${year}/男性)`;
      else if (gender === "female") label = `平均寿命(${year}/女性)`;
      else label = `平均寿命(${year})`;
    } else if (layerId.startsWith("sunshine_hours_")) {
      const year = layerId.split("_")[2];
      label = `${year}年日照時間`;
    }
    html += `
      <tr>
        <td style=\"padding:4px; border:1px solid #ccc;\"><strong>${escapeHTML(label)}</strong></td>
        <td style=\"padding:4px; border:1px solid #ccc;\">${escapeHTML(String(props[layerId]))}</td>
      </tr>`;
  }
  html += `</table>`;
  return html;
};

const escapeHTML = (str: string): string =>
  str.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char];
  });
