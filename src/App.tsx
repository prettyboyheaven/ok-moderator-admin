import React from "react";
import ReactDOM from "react-dom";
import { GamesList } from "./GamesList";

const App = () => {
  return (
    <div>
      <GamesList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
