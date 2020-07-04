import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  trades: [],
  GBCE: 0.0
};

const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    getTrades: state => {
      state.loading = true;
    },
    getTradesSuccess: (state, { payload, GBCE }) => {
      state.trades = payload;
      state.GBCE = GBCE;
      state.loading = false;
      state.hasErrors = false;
    },
    getTradesFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

export const {
  getTrades,
  getTradesSuccess,
  getTradesFailure
} = tradesSlice.actions;
export const tradesSelector = state => state.trades;
export default tradesSlice.reducer;

function getGBCEAllShareIndex(stocks) {
  var eligibleStocks = stocks.filter(
    stock => stock.tradesintheLastFifteenMinutes > 0
  );

  const stocksTraded = eligibleStocks.length;
  var productofStockPrices = eligibleStocks.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      return accumulator * currentValue.tickerPrice;
    },
    1.0
  );

  return Math.pow(productofStockPrices, 1.0 / stocksTraded);
}

function setStockPrice(stock) {
  var numerator = 0.0;
  var denominator = 0.0;

  const eligibalTrades = stock.trades.filter(
    trade => new Date() - trade.time < 15 * 60 * 1000
  );
  const price = eligibalTrades.reduce(
    (accumulator, trade, currentIndex, array) => {
      return {
        numerator: numerator + trade.price * trade.numberSold,
        denominator: denominator + trade.numberSold
      };
    },
    { numerator: 0.0, denominator: 0.0 }
  );

  if (eligibalTrades.length === 0) {
    stock.tickerPrice = 0.0;
  } else {
    stock.tickerPrice = price.numerator / price.denominator;
  }
  stock.tradesintheLastFifteenMinutes = eligibalTrades.length;
}

function setPriceEarningRatio(stock) {
  if (stock.tradesintheLastFifteenMinutes > 0 && stock.lastDividend > 0) {
    stock.priceEarningRatio = stock.tickerPrice / stock.lastDividend;
  } else {
    stock.priceEarningRatio = 0.0;
  }
}

function setDividendYield(stock) {
  var dividendYield = 0.0;

  if (stock.tradesintheLastFifteenMinutes > 0 && stock.stockType === "COMMON") {
    dividendYield = stock.lastDividend / stock.tickerPrice;
  } else if (
    stock.tradesintheLastFifteenMinutes > 0 &&
    stock.stockType === "PREFERRED"
  ) {
    dividendYield = (stock.fixedDividend * stock.parValue) / stock.tickerPrice;
  }

  stock.dividendYield = dividendYield;
}

export function prepareTrades() {
  return async dispatch => {
    dispatch(getTrades());
    const stocks = [
      {
        name: "TEA",
        stockType: "COMMON",
        lastDividend: 0,
        fixedDividend: 0.0,
        parValue: 100,
        trades: []
      },
      {
        name: "POP",
        stockType: "COMMON",
        lastDividend: 8,
        fixedDividend: 0.0,
        parValue: 100,
        trades: []
      },
      {
        name: "ALE",
        stockType: "COMMON",
        lastDividend: 23,
        fixedDividend: 0.0,
        parValue: 60,
        trades: []
      },
      {
        name: "GIN6",
        stockType: "PREFERRED",
        lastDividend: 8,
        fixedDividend: 0.2,
        parValue: 100,
        trades: []
      },
      {
        name: "JOE",
        stockType: "COMMON",
        lastDividend: 13,
        fixedDividend: 0.0,
        parValue: 250,
        trades: []
      }
    ];

    for (let i = 0; i < 10; i++) {
      var stockIndex = Math.floor(Math.random() * 5);

      var stock = stocks[stockIndex];

      var tradeType = Math.round(Math.random());
      var numberSold = Math.floor(Math.random() * 11);
      var price = Math.floor(Math.random() * 51);
      var timeDifference = Math.floor(Math.random() * 1000 * 60 * 30);

      if (tradeType === 0) {
        stock.trades.push({
          numberSold: numberSold,
          price: price,
          tradeType: "BUY",
          time: new Date(new Date().getTime() - timeDifference)
        });
      } else {
        stock.trades.push({
          numberSold: numberSold,
          price: price,
          tradeType: "SELL",
          time: new Date(new Date().getTime() - timeDifference)
        });
      }
    }

    for (let i = 0; i < 5; i++) {
      var fullStock = stocks[i];
      setStockPrice(fullStock);

      setPriceEarningRatio(fullStock);
      setDividendYield(fullStock);
    }
    const gbceIndex = getGBCEAllShareIndex(stocks);
    console.log("main gbcc" + gbceIndex);
    try {
      dispatch(getTradesSuccess(stocks, gbceIndex));
    } catch (error) {
      dispatch(getTradesFailure());
    }
  };
}
