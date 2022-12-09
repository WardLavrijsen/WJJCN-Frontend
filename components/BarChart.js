import { ResponsiveBar } from "@nivo/bar";

export default function BarChart({ currentProduct }) {
  const items = {};
  currentProduct.history.map((item, index) => {
    Object.entries(item.product_scraped).forEach(([key, value]) => {
      if (items[key]) {
        items[key].total += 1;
        if (value.equal_to_scraped) {
          items[key].true += 1;
        }
      } else {
        if (value.equal_to_scraped) {
          items[key] = {
            total: 1,
            true: 1,
          };
        } else {
          items[key] = {
            total: 1,
            true: 0,
          };
        }
      }
    });
  });

  const graphData = Object.entries(items).map(([key, value]) => {
    const score = Math.round((value.true / value.total) * 100);
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
      "Found (%)": score,
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
