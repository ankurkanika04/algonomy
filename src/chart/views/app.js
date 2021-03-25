import React, { useState, useEffect } from "react";
import ChartContainer from "./chartContainer";
import mockAxios from '../../../mockServer/mockAxios'

//Process records to get chart consumable data based on selected dropdown option
const getProcessedData = (data, dpOption) => {
  let rows = [];
  const nonNullData = data && data.records && data.records.filter(row => row !== null)
  for (let row of data.records) {
    rows.push([row["date"], row[dpOption]]);
  }
  let newData = [["date", dpOption], ...rows];
  return newData;
}

//Cache to store data after first fetch 
const CACHE = {};

export default function App(props) {
  const [loadStatus, setLoadStatus] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [dpOption, setDPOption] = useState("sales");

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      //Check first in cache if raw data is loaded and set data for selected dropdown
      if (CACHE['rawData'] !== undefined) {
        let requiredData = getProcessedData(CACHE['rawData'],dpOption);
        setChartData(requiredData);
      }else {
      //Else make a fresh call for raw data to mock api and set data for selected dropdown
        mockAxios.get().then(data => {
          CACHE['rawData'] = data.mockData;
          setLoadStatus(true);
          let requiredData = getProcessedData(CACHE['rawData'],dpOption);
          setChartData(requiredData); 
        });
      }
    }
 
    return () => mounted = false;
  }, [dpOption])


  return (
    <div>
      <select value={dpOption} onChange={(e) => setDPOption(e.target.value)}>
        <option key="os" value="sales">
          overall sales
        </option>
        <option key="oo" value="orders">
          overall orders
        </option>
        <option key="pv" value="pageViews">
          page views
        </option> 
        <option key="pctr" value="clickThruRate">
          page rec clickthru rate
        </option> 
      </select>
      { loadStatus && <ChartContainer chartData={chartData} dpOption={dpOption} /> }
    </div>
  );
}
