import { ResponsiveBar } from "@nivo/bar";

export default function BarChart({ currentProduct }) {
  const graphData = Object.entries(
    currentProduct.history[currentProduct.history.length - 1].product_scraped
  ).map(([key, value]) => {
    const score = value.score;
    const scoreColor =
      score >= 50
        ? score >= 75
          ? "#2ecc71"
          : "#F1C40F"
        : score >= 25
        ? "#E67E22"
        : "#E74C3C";

    return {
      element: key,
      "Found (%)": score.toFixed(2),
      color: scoreColor,
    };
  });

  return (
    <ResponsiveBar
      data={graphData}
      keys={["Found (%)"]}
      indexBy="element"
      margin={{ top: 40, right: 40, bottom: 40, left: 50 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      //   indexScale={{ type: "band", round: true }}
      colors={(e) => {
        return e.data.color;
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Element",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Found (%)",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelWi
    />
  );
}
