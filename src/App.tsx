import React, { useState } from "react";
import ReactDOM from "react-dom";
import { GamesList } from "./components/GamesList";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";

const filters = ["Новые", "Запущенные", "Остановленные", "Завершенные"];

const FiltersContext = React.createContext({
  filters,
  activeFilter: filters[1]
});

const App = () => {
  const [activeFilter, setActive] = useState(filters[1]);

  return (
    <div>
      <Header />
      <FiltersContext.Provider value={{ filters, activeFilter }}>
        {/*<Filters />*/}
        <GamesList />
      </FiltersContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
