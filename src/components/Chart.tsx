import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { FC } from "react";

export interface ChartProps {
  data: Array<{ date: string; close: number; sma?: number; ema?: number }>;
}

const Chart: FC<ChartProps> = ({ data }) => {
  return (
    <LineChart width={800} height={400} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" />
      <Line type="monotone" dataKey="close" stroke="#8884d8" />
      <Line type="monotone" dataKey="sma" stroke="#82ca9d" />
      <Line type="monotone" dataKey="ema" stroke="#ff7300" />
    </LineChart>
  );
};

export default Chart;
