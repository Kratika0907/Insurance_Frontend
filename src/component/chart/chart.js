import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import BackendService from "../../util/backend_service";
import { PolicyStateContext } from "../../App";

async function generateChartData(region = "North", dispatch) {
  dispatch({ type: "SHOW_LOADER", payload: true });
  let chartData = await BackendService.getChartData(region);
  dispatch({ type: "SHOW_LOADER", payload: false });
  const data = {
    labels: chartData.label,
    datasets: [
      {
        label: `Policy in ${region} region`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData.dataSet,
      },
    ],
  };
  return data;
}

const PolicyChart = () => {
  const [region, setRegion] = useState("North");
  const [chartData, setChartData] = useState([]);
  const context = useContext(PolicyStateContext);
  useEffect(() => {
    (async function () {
      let data = await generateChartData(region, context.dispatch);
      setChartData(data);
    })();
  }, [region, setChartData]);
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };
  return (
    <>
      <div className="header">
        <Line data={chartData} />
        <label for="policy-search">Choose Region:</label>
        <select
          name="search-x"
          id="policy-search"
          onChange={handleRegionChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="North">North</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="South">South</option>
        </select>
      </div>
    </>
  );
};

export default PolicyChart;
