import { ResponsiveLine } from "@nivo/line";

export default function LineChart({ currentProduct }) {
  const graphData = currentProduct.history.map((item, index) => {
    return {
      x: item.scrape_date + "-" + (index + 1),
      y: item.score,
    };
  });

  return (
    <ResponsiveLine
      data={[
        {
          id: currentProduct.product,
          data: graphData,
        },
      ]}
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Score",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={12}
      lineWidth={3}
      colors={() => "#5F72FD"}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      isInteractive={false}
    />
  );
}
