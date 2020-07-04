import React from "react";

export const Trade = ({ trade, excerpt }) => (
  <article className={excerpt ? "post-excerpt" : "post"}>
    <b>Trade Price</b> : {trade.price} <br/>

    <b>Trade Quantity</b> : {trade.numberSold} <br/>
    <b>Trade Type</b> : {trade.tradeType} <br/>
    <b>Trade Time</b> : {trade.time.toDateString()} {trade.time.toTimeString()} <br/>
    
    <br />
  </article>
);
