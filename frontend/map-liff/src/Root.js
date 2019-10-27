import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import StoreMap from "./pages/StoreMap";
import StoreMenu from "./pages/StoreMenu";

const liff = window.liff;

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.initialize = this.initialize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("load", this.initialize);
  }

  initialize() {
    liff.init(
      {
        liffId: process.env.REACT_APP_LIFF_ID
      },
      data => {
        console.log("signed in");
      },
      err => {
        console.log("LIFF initialization failed", err);
      }
    );
  }

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact path="/menus" component={StoreMenu} />
          <Route exact path="/" component={StoreMap} />
        </Switch>
      </Router>
    );
  }
}
