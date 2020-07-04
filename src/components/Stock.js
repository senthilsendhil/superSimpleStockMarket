import React from "react";

import { Trade } from "../components/Trade";

export const Stock = ({ stock, excerpt, GBCE }) => (
  
  <article className={excerpt ? "post-excerpt" : "post"}>
       
    <b>stock Symbol</b> : {stock.name}
    <br />
    <b>stockType</b> : {stock.stockType}
    <br />
    <b>lastDividend </b>: {stock.lastDividend}
    <br />
    <b>fixedDividend </b>: {stock.fixedDividend}
    <br />
    <b>parValue</b> : {stock.parValue}
    <br />
    <b>Last 15 min trans</b> : {stock.tradesintheLastFifteenMinutes}
    <br />
    <b>Stock Price </b> : {stock.tickerPrice}
    <br/>
    <b>Price Earning Ratio </b> : {stock.priceEarningRatio}
    <br/>
    <b>Dividend Yield</b> : {stock.dividendYield}
    <br/>
   
    <div style = {{display: stock.trades.length <= 0 ? 'none' : 'block' }}>
    <h2 > Trades </h2>
    <hr></hr>
    {stock.trades.map(trade => (
      <Trade key={trade.id} trade={trade} excerpt /> 
    ))}
    <hr></hr>
    </div>
    
  </article>
);
