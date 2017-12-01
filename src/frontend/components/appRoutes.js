/**
 * Created by archheretic on 29.10.17.
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import MainMenu from "./mainMenu";
import RegisterVoter from "./registerVoter";
import RegisterElection from "./registerElection";
import Vote from "./vote";
import ElectionResults from "./electionResults";

export const AppRoutes = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Democrazy 2.0</h1>
        </header>
        <Switch>
            <Route exact path="/" component={MainMenu} />
            <Route exact path="/registervoter" component={RegisterVoter} />
            <Route exact path="/registerelection" component={RegisterElection} />
            <Route exact path="/vote" component={Vote} />
            <Route exact path="/electionresults" component={ElectionResults} />
        </Switch>
    </div>
);

export default AppRoutes;