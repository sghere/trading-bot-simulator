import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch stock data asynchronously
export const fetchStockData = createAsyncThunk(
  "stock/fetchStockData",
  async (symbol) => {
    const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY";
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = response.data["Time Series (Daily)"];
    return Object.keys(data).map((date) => ({
      date,
      close: parseFloat(data[date]["4. close"]),
    }));
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchStockData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default stockSlice.reducer;
