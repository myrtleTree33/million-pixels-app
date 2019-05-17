import React from "react";
import { Link, Switch, Route, Redirect, withRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Marquee from "react-marquee";

import "./App.css";

import { Container, Grid } from "semantic-ui-react";

import HomeScreen from "./screens/Home";
import BuyScreen from "./screens/Buy";

function App() {
  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <Grid>
            <Grid.Column width={8}>
              <marquee>
                <h1>
                  <Marquee text="Welcome to the million dollar pixels page!!!" />
                </h1>
              </marquee>
            </Grid.Column>
            <Grid.Column width={4}>
              <span>1,000,000 pixels | $1 / pixel | One month!</span>
            </Grid.Column>
            <Grid.Column width={4}>{0} pixels sold!</Grid.Column>
          </Grid>
          <div>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/buy" className="nav-link">
              Buy a pixel
            </Link>
            <Link to="/follow" className="nav-link">
              Follow me on Twitter!
            </Link>
          </div>
        </header>

        <div>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/buy/:loc" component={BuyScreen} />
            {/* <Route path="/profile/:login" component={ProfileScreen} />
        <Route path="/account" component={AccountScreen} />
        <Route path="/logout" component={LogoutScreen} /> */}
          </Switch>
        </div>
      </Container>
      <footer>
        <Container>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            A React native joke by . No puppies were killed in this process.
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
