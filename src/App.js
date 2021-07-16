import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import { Header } from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import ShopPage from "./pages/shop/shop.component";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unSubFromAuth = null;

  componentDidMount() {
    this.unSubFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({
        currentUser: user,
      });
    });
  }

  componentWillUnmount() {
    this.unSubFromAuth();
  }

  render() {
    return (
      <div>
        <Header user={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signIn" component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}
export default App;
