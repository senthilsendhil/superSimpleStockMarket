import React from "react";
import { useSelector } from "react-redux";

import { stocksSelector } from "../slices/stocks";

import { Stock } from "../components/Stock";

import { Link } from "react-router-dom";

const StocksPage = () => {
  console.log(useSelector(stocksSelector));
  const { stocks, loading, hasErrors } = useSelector(stocksSelector);

  const renderStocks = () => {
    if (loading) return <p>Loading posts...</p>;
    if (hasErrors) return <p>Unable to display posts.</p>;

    return stocks.map(stock => <Stock key={stock.id} stock={stock} excerpt />);
  };

  return (
    <section>
      <h1>Stocks</h1>
      {renderStocks()}
      <Link to={`/trade`} className="button">
        Prepare Trade
      </Link>
    </section>
  );
};

export default StocksPage;
