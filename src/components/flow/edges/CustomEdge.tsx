import React from "react";
import { EdgeProps, EdgeLabelRenderer, getBezierPath, useReactFlow } from "reactflow";
import { Trash2 } from "lucide-react";

const CustomEdge: React.FC<EdgeProps> = ({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, selected,
}) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  return (
    <>
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        style={{ cursor: "pointer" }}
      />
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        fill="none"
        style={{
          stroke: selected ? "#16a34a" : "#22c55e",
          strokeWidth: selected ? 3 : 2,
          strokeDasharray: "6 4",
          animation: "dashdraw 1.5s linear infinite",
        }}
      />
      <style>{`
        @keyframes dashdraw {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
          >
            <button
              onClick={() => setEdges((eds) => eds.filter((e) => e.id !== id))}
              className="w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg border-2 border-background transition-colors"
            >
              <Trash2 size={12} className="text-white" />
            </button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default CustomEdge;
