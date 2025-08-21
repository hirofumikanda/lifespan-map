import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { setupPopupHandler } from "../utils/popup";
import { setupPointerHandler } from "../utils/pointer";

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
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);

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
      {/* レイヤ切り替えボタン */}
      <button
        onClick={() => setIsLayerPanelOpen(!isLayerPanelOpen)}
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          zIndex: 3,
          background: "rgba(219,234,254,0.97)",
          border: "1.5px solid #60a5fa",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}
      >
        レイヤ切替
        <span style={{ 
          transition: "transform 0.2s ease",
          transform: isLayerPanelOpen ? "rotate(180deg)" : "rotate(0deg)"
        }}>
          ▼
        </span>
      </button>

      {/* レイヤ切り替えパネル */}
      {isLayerPanelOpen && (
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 60,
            zIndex: 2,
            background: "rgba(219,234,254,0.97)",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            border: "1.5px solid #60a5fa",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "50vh",
            overflowY: "auto"
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>レイヤ選択</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}
          >
            {LAYERS.map((layer) => (
              <label
                key={layer.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  backgroundColor: activeLayer === layer.id ? "rgba(59,130,246,0.2)" : "transparent",
                  border: activeLayer === layer.id ? "2px solid #3b82f6" : "2px solid transparent",
                  fontSize: "16px",
                  minHeight: "44px",
                  transition: "all 0.2s ease"
                }}
                onClick={() => {
                  setActiveLayer(layer.id);
                  setIsLayerPanelOpen(false);
                }}
              >
                <input
                  type="radio"
                  name="layer"
                  value={layer.id}
                  checked={activeLayer === layer.id}
                  onChange={() => setActiveLayer(layer.id)}
                  style={{ 
                    marginRight: 12,
                    width: "18px",
                    height: "18px",
                    cursor: "pointer"
                  }}
                />
                <span style={{ 
                  lineHeight: "1.4",
                  wordBreak: "break-word"
                }}>
                  {layer.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
