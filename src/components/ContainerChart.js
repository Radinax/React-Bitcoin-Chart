import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const optionsInfo = {
  chart: {
    //background: '#f4f4f4',
    foreColor: "#333",
  },
  xaxis: {
    categories: [],
  },
  plotOptions: {
    bar: {
      horizontal: false, // if true it would be horizontal
    },
  },
  fill: {
    colors: ["#f44336"],
  },
  dateLabels: {
    enabled: false,
  },
  title: {
    text: "Bitcoin Price Chart",
    align: "center",
    margin: 20,
    offsetY: 20,
    style: {
      fontSize: "25px",
    },
  },
};

const seriesInfo = [
  {
    name: "Numbers",
    data: [855, 397, 272, 229, 100, 157, 333, 999, 1000],
  },
];

const ContainerChart = () => {
  const [options, setOptions] = useState(optionsInfo);
  const [series, setSeries] = useState(seriesInfo);

  useEffect(() => {
    fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => response.json())
      .then((data) => {
        setOptions({
          ...optionsInfo,
          xaxis: { categories: Object.keys(data.bpi) },
        });
        setSeries([
          {
            name: "Price",
            data: Object.values(data.bpi),
          },
        ]);
      });
  }, []);

  const styling = {
    textAlign: "center",
    fontSize: 20,
  };
  const aTag = {
    textDecoration: "none",
    color: "#006bb3",
  };

  return (
    <div>
      <>
        <Chart
          options={options}
          series={series}
          type="line"
          height="450"
          width="100%"
        />
        <div style={styling}>
          Made by{" "}
          <a style={aTag} href="https://github.com/Radinax">
            Adrian Beria
          </a>
        </div>
      </>
    </div>
  );
};

export default ContainerChart;
