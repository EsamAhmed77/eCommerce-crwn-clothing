import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import { Header } from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import ShopPage from "./pages/shop/shop.component";
import { auth, createUserProfileDoc } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  //we use this function to close the sub with google auth ( like a temporary logout )
  unSubFromAuth = null;

  componentDidMount() {
    this.unSubFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // if (userAuth) {
      //   const userRef = await createUserProfileDoc(userAuth);

      //   userRef.onSnapshot((snapShot) => {
      //     this.setState(
      //       {
      //         currentUser: {
      //           id: snapShot.id,
      //           ...snapShot.data(),
      //         },
      //       },
      //       () => console.log(this.state)
      //     );
      //   });
      // } else {
      //   this.setState({
      //     currentUser: userAuth,
      //   });
      // }

      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        //onSnapshot when the snapshot arrives
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              //we can only access the info via snapshot.data()
              ...snapshot.data(),
            },
          });

          console.log(this.setState);
        });
      } else this.setState({ currentUser: userAuth });
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
