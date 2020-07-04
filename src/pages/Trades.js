import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { tradesSelector, prepareTrades } from "../slices/trades";

import { Stock } from "../components/Stock";

const TradesPage = () => {
  const { trades, GBCE,loading, hasErrors } = useSelector(tradesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(prepareTrades());
  }, [dispatch]);
  const renderTrades = () => {
    if (loading) return <p>Loading trades...</p>;
    if (hasErrors) return <p>Unable to display trades.</p>;

    return trades.map(stock => (
      <Stock key={stock.symbol} stock={stock} GBCE={GBCE} excerpt />
    ));
  };

  return (
    <section>
      <h1>Trade Details</h1>
      
      {renderTrades()}
    </section>
  );
};

export default TradesPage;
