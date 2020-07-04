import { combineReducers } from "redux";

import stocksReducer from "./stocks";
import tradesReducer from "./trades";

const rootReducer = combineReducers({
  stocks: stocksReducer,
  trades: tradesReducer
});

export default rootReducer;
