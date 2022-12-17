import React from "react";
import { Chart, ChartWrapperOptions } from "react-google-charts";

interface IBarChartProps {
  titles: string[];
  data: any[][];
  width: string;
  height: string;
  options?: ChartWrapperOptions["options"];
}

export default function BarChart({ titles, data, ...props }: IBarChartProps) {
  return <Chart chartType="BarChart" data={[titles, ...data]} {...props} />;
}
