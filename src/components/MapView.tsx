import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { setupPopupHandler } from "../utils/popup";
import { setupPointerHandler } from "../utils/pointer";
import { LayerSwitcher } from "./LayerSwitcher";

const LAYERS = [
  { id: "sunshine_hours_2020", label: "日照時間(2020)" },
  { id: "lifespan_2020_male", label: "平均寿命(2020/男性)" },
  { id: "lifespan_2020_female", label: "平均寿命(2020/女性)" },
  { id: "sunshine_hours_2015", label: "日照時間(2015)" },
  { id: "lifespan_2015_male", label: "平均寿命(2015/男性)" },
  { id: "lifespan_2015_female", label: "平均寿命(2015/女性)" },
  { id: "sunshine_hours_2010", label: "日照時間(2010)" },
  { id: "lifespan_2010_male", label: "平均寿命(2010/男性)" },
  { id: "lifespan_2010_female", label: "平均寿命(2010/女性)" },
  { id: "sunshine_hours_2005", label: "日照時間(2005)" },
  { id: "lifespan_2005_male", label: "平均寿命(2005/男性)" },
  { id: "lifespan_2005_female", label: "平均寿命(2005/女性)" },
  { id: "sunshine_hours_2000", label: "日照時間(2000)" },
  { id: "lifespan_2000_male", label: "平均寿命(2000/男性)" },
  { id: "lifespan_2000_female", label: "平均寿命(2000/女性)" },
];

const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState("sunshine_hours_2020");

  useEffect(() => {
    if (!mapRef.current) return;
    LAYERS.forEach((layer) => {
      try {
        if (mapRef.current!.getLayer(layer.id)) {
          mapRef.current!.setLayoutProperty(
            layer.id,
            "visibility",
            layer.id === activeLayer ? "visible" : "none"
          );
        }
      } catch (e) {}
    });
  }, [activeLayer]);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "styles/style.json",
      center: [137.071, 36.243],
      zoom: 4,
      minZoom: 4,
      hash: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      LAYERS.forEach((layer) => {
        if (map.getLayer(layer.id)) {
          map.setLayoutProperty(
            layer.id,
            "visibility",
            layer.id === activeLayer ? "visible" : "none"
          );
        }
      });
    });

    setupPopupHandler(map);
    setupPointerHandler(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <LayerSwitcher
        layers={LAYERS}
        activeLayer={activeLayer}
        onLayerChange={setActiveLayer}
      />

      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
