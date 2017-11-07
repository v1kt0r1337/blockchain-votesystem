/**
 * Created by archheretic on 29.10.17.
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./mainPage";

export const AppRoutes = () => (
    <div>
        <Switch>
            <Route exact path="/" component={MainPage} />
        </Switch>
    </div>
);

export default AppRoutes;