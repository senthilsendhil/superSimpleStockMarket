import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav>
    <section>
      <Link to="/">Dashboard</Link>
      <Link to="/stocks">Stocks</Link>
      <Link to="/trade">Trades</Link>
    </section>
  </nav>
);
