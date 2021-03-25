import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

export default function ChartContainer(props) {
  return (
    <Chart
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      width="100%"
      height="400px"
      data={props.chartData}
      options={{
        title: props.dpOption,
        legend: { position: "right" }
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
}

