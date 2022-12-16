import { ResponsivePie } from "@nivo/pie";

export default function PieChart({ score }) {
  const scoreColor =
    score >= 50
      ? score >= 75
        ? "#2ecc71"
        : "#F1C40F"
      : score >= 25
      ? "#E67E22"
      : "#E74C3C";

  const commonProperties = {
    margin: { left: 10, right: 10, top: 20, bottom: 10 },
    data: [
      { id: "Score", label: "Score", value: score, color: scoreColor },
      { id: "", label: "", value: 100 - score, color: "#ecf0f1" },
    ],
    animate: true,
  };

  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "3vw",
          fontWeight: 600,
        }}
      >
        {score}%
      </text>
    );
  };
  return (
    <ResponsivePie
      {...commonProperties}
      innerRadius={0.8}
      arcLabel={false}
      enableArcLabels={false}
      colors={{ datum: "data.color" }}
      // activeInnerRadiusOffset={commonProperties.activeOuterRadiusOffset}
      layers={["arcs", CenteredMetric]}
      isInteractive={true}
    />
  );
}
