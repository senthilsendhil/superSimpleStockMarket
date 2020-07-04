import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  stocks: [
    {
      name: "TEA",
      stockType: "COMMON",
      lastDividend: 0,
      fixedDividend: 0.0,
      parValue: 100,
      trades: [],
      tradesintheLastFifteenMinutes: 0
    },
    {
      name: "POP",
      stockType: "COMMON",
      lastDividend: 8,
      fixedDividend: 0.0,
      parValue: 100,
      trades: [],
      tradesintheLastFifteenMinutes: 0
    },
    {
      name: "ALE",
      stockType: "COMMON",
      lastDividend: 23,
      fixedDividend: 0.0,
      parValue: 60,
      trades: [],
      tradesintheLastFifteenMinutes: 0
    },
    {
      name: "GIN",
      stockType: "PREFERRED",
      lastDividend: 8,
      fixedDividend: 0.2,
      parValue: 100,
      trades: [],
      tradesintheLastFifteenMinutes: 0
    },
    {
      name: "JOE",
      stockType: "COMMON",
      lastDividend: 13,
      fixedDividend: 0.0,
      parValue: 250,
      trades: [],
      tradesintheLastFifteenMinutes: 0
    }
  ]
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    getPosts: state => {
      state.loading = true;
    },
    getPostsSuccess: (state, { payload }) => {
      state.stocks = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getPostsFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

//export const { getPosts, getPostsSuccess, getPostsFailure } = postsSlice.actions
export const stocksSelector = state => state.stocks;
export default stocksSlice.reducer;
