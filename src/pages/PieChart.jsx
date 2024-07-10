import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import ReactApexChart from "react-apexcharts";
import { BarChart } from "../components";

const PieChart = () => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { data: todo } = useCollection("todos", ["uid", "==", user?.uid]);
  const categoryCounts = {};

  useEffect(() => {
    if (todo) {
      todo.forEach((item) => {
        const category = item.category;
        if (categoryCounts[category]) {
          categoryCounts[category]++;
        } else {
          categoryCounts[category] = 1;
        }
      });

      const categorie = Object.keys(categoryCounts);
      const counts = Object.values(categoryCounts);
      setCategories(categorie);
      setSeries(counts);
    }
  }, [todo]);

  const options = {
    chart: {
      width: 480,
      type: "pie",
    },
    labels: categories,
    responsive: [
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: 480,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="mb-10">
      <h2 className="text-center text-xl font-bold mb-5">Category Chart</h2>
      <div id="chart" className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={480}
        />
      </div>
      <BarChart />
    </div>
  );
};

export default PieChart;
