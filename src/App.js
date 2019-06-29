import React from "react";
import { Link, Switch, Route, Redirect, withRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Marquee from "react-marquee";

import "./App.css";

import doge from "./doge.gif";
import webFinish from "./webFinish.gif";

import { Container, Grid } from "semantic-ui-react";

import HomeScreen from "./screens/Home";
import BuyScreen from "./screens/Buy";
import PixelScreen from "./screens/Pixel";

function App() {
  return (
    <div className="App">
      <Container>
        <header className="App-header">
          <Grid>
            <Grid.Column width={8}>
              <marquee>
                <h1>
                  <Marquee text="Welcome to the internet's best squircle page!!!" />
                </h1>
              </marquee>
            </Grid.Column>
            <Grid.Column width={2}>
              <span>1,000,000 squircles | $5 / squircle | One month!</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <div>{0} squircles sold!</div>
              <img
                src={doge}
                style={{
                  maxWidth: "100px",
                  height: "auto"
                }}
              />
            </Grid.Column>
          </Grid>
          <div>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/buy" className="nav-link">
              Buy a squircle
            </Link>
            <Link to="/follow" className="nav-link">
              Follow me on Twitter!
            </Link>
          </div>
        </header>

        <div>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/buy" component={BuyScreen} />
            <Route path="/p" component={PixelScreen} />
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
            <div>
              A React native joke by . No puppies were harmed in this process.
            </div>
            <div>
              <img
                src={webFinish}
                style={{
                  maxWidth: "100px",
                  height: "auto"
                }}
              />
            </div>
            <div>Best viewed on IE6+.</div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
