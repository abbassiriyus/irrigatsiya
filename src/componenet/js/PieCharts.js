import React, { useEffect } from "react";
import { Pie, PieChart } from "recharts";
import { uzLanguege } from "../redux/Actions/uzLanguege";
import { ruLanguege } from "../redux/Actions/ruLanguege";
import { enLanguege } from "../redux/Actions/enLanguege";
import { connect } from "react-redux";
import { fotosLavha } from "../config/tuitor";
const data = [
  {
    name: "Dushanba",
    uv: 100,
  },
  {
    name: "Seshanba",
    uv: 120,
  },
  {
    name: "Chorshanba",
    uv: 150,
  },
  {
    name: "Payshanba",
    uv: 134,
  },
  {
    name: "Juma",
    uv: 100,
  },
  {
    name: "Shanba",
    uv: 134,
  },
  {
    name: "Yakshanba",
    uv: 66,
  },
];

export const PieCharts = (props) => {
  
  return (
    <div>
      <h2 className="text-center">
        Kitoblar yuklanmasi
        {/* {uzLang
          ? "Kitoblar yuklanmasi"
          : enLang
          ? "Loading books"
          : "Загрузка книг"} */}
      </h2>
      <PieChart width={430} height={250}>
        <Pie
          data={data}
          dataKey="uv"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
        <Pie
          data={data}
          dataKey="uv"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </div>
  );
};

