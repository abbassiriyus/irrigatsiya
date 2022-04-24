import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import chartslar from "../css/LineCharts.mudul.css";
const data = [
  {
    name: "Dushanba",
    uv: 250,
  },
  {
    name: "Seshanba",
    uv: 200,
  },
  {
    name: "Chorshanba",
    uv: 350,
  },
  {
    name: "Payshanba",
    uv: 300,
  },
  {
    name: "Juma",
    uv: 400,
  },
  {
    name: "Shanba",
    uv: 450,
  },
  {
    name: "Yakshanba",
    uv: 66,
  },
];
const LineCharts = () => {
  return (
    <div className="">
      <h2 className="text-center my-2">Qilingan ishlar statistikasi </h2>

      <LineChart
        className={chartslar.linechart}
        width={680}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#FF0000">
          <p className="text-center">soni</p>
        </Line>
      </LineChart>
      
    </div>
  );
};

export default LineCharts;
