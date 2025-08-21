import { useState } from "react";

interface Layer {
  id: string;
  label: string;
}

interface LayerSwitcherProps {
  layers: Layer[];
  activeLayer: string;
  onLayerChange: (layerId: string) => void;
}

export const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  layers,
  activeLayer,
  onLayerChange,
}) => {
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);

  const handleLayerSelect = (layerId: string) => {
    onLayerChange(layerId);
    setIsLayerPanelOpen(false);
  };

  const activeLayerLabel = layers.find(layer => layer.id === activeLayer)?.label || "";

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

      {/* 現在のレイヤー表示 */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 55,
          zIndex: 2,
          background: "rgba(255,255,255,0.9)",
          border: "1px solid #d1d5db",
          borderRadius: "4px",
          padding: "6px 10px",
          fontSize: "12px",
          color: "#374151",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          maxWidth: "calc(100vw - 40px)",
          wordBreak: "break-word"
        }}
      >
        現在: {activeLayerLabel}
      </div>

      {/* レイヤ切り替えパネル */}
      {isLayerPanelOpen && (
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 85,
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
            {layers.map((layer) => (
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
                onClick={() => handleLayerSelect(layer.id)}
              >
                <input
                  type="radio"
                  name="layer"
                  value={layer.id}
                  checked={activeLayer === layer.id}
                  onChange={() => onLayerChange(layer.id)}
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
    </>
  );
};
