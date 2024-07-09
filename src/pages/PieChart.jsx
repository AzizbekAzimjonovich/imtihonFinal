import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function PieChart() {
  const [data, setData] = useState({
    series: [
      {
        name: "Populations",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const [data2, setData2] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((countries) => {
        setCountries(countries);
      });
  }, []);

  useEffect(() => {
    if (region) {
      const filteredCountries = countries.filter(
        (country) => country.region === region
      );
      const populations = filteredCountries.map(
        (country) => country.population
      );
      const countryNames = filteredCountries.map(
        (country) => country.name.common
      );

      setData((prevData) => ({
        ...prevData,
        series: [
          {
            ...prevData.series[0],
            data: populations,
          },
        ],
        options: {
          ...prevData.options,
          xaxis: {
            categories: countryNames,
          },
        },
      }));

      setData2((prevData2) => ({
        ...prevData2,
        series: populations,
        options: {
          ...prevData2.options,
          labels: countryNames,
        },
      }));
    }
  }, [region, countries]);

  return (
    <>
      <h1 className="w-1/5 mx-auto mt-7 font-bold">Region population</h1>
      <div className="w-3/5 mx-auto mt-4 mb-4">
        <div className="flex justify-between items-center">
          <select
            className="select select-primary w-full max-w-xs"
            onChange={(e) => setRegion(e.target.value)}
            value={region} // Use the value prop to set the selected option
          >
            <option value="" disabled>
              Region
            </option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctic">Antarctic</option>
          </select>

          <div className="w-1/5">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">BAR CHART</span>
                <input
                  type="radio"
                  name="chartType"
                  className="radio checked:bg-red-500"
                  value="bar"
                  checked={chartType === "bar"}
                  onChange={(e) => setChartType(e.target.value)}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">PIE CHART</span>
                <input
                  type="radio"
                  name="chartType"
                  className="radio checked:bg-blue-500"
                  value="pie"
                  checked={chartType === "pie"}
                  onChange={(e) => setChartType(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div>
          {chartType === "bar" ? (
            <div id="chart">
              <ReactApexChart
                options={data.options}
                series={data.series}
                type="bar"
                height={750}
              />
            </div>
          ) : (
            <div id="chart">
              <ReactApexChart
                options={data2.options}
                series={data2.series}
                type="pie"
                width={750}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PieChart;
