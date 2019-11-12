import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Games } from "./pages/Games";
import { Edit } from "./pages/Edit";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/edit/:id">
          <Edit />
        </Route>
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
