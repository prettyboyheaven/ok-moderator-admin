import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Games } from "./pages/Games";
import { Edit } from "./pages/Edit";
import { Rules } from "./pages/Rules";
import { Traps } from "./pages/Traps";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/edit/:id" component={Edit} />
        <Route path="/rules/:id">
          <Rules />
        </Route>
        <Route path="/traps/:id" component={Traps} />
        <Route path="/">
          <Games />
        </Route>
      </Switch>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
