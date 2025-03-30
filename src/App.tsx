import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockData } from "./features/stockSlice.ts";
import { simpleMovingAverage, exponentialMovingAverage } from "./utils/algorithms.ts";
import Chart from "./components/Chart.tsx";
import { AppDispatch } from "./redux/store.ts";

function App() {
  const dispatch:AppDispatch = useDispatch();
  const data = useSelector((state: { stock: { data: any[] } }) => state.stock.data);
  const [symbol, setSymbol] = useState("AAPL");

  useEffect(() => {
    dispatch(fetchStockData(symbol));
  }, [dispatch, symbol]);

const chartData = React.useMemo(() => {
    if (data.length) {
      const sma = simpleMovingAverage(data, 16);
      const ema = exponentialMovingAverage(data, 16);
      return data.map((item, index: number) => ({
        ...item,
        sma: sma[index] || null,
        ema: ema[index] || null,
      }));
    }
    return [];
  }, [data]);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Algorithmic Trading Bot Simulator</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter Stock Symbol (e.g., AAPL)"
        className="p-2 mb-4 text-black rounded"
      />
      {chartData.length ? <Chart data={chartData} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
