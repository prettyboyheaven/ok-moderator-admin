import React from "react";
import ReactDOM from "react-dom";
import { GamesList } from "./components/GamesList";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";

const App = () => {
  return (
    <div>
      <Header />
      <Filters />
      <GamesList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
