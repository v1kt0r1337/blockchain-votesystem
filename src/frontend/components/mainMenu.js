import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class MainMenu extends Component {
    constructor() {
        super();
        this.state = {};
        this.buttons = [
            {
                label: "Register new voter",
                value: "registervoter"
            },
            {
                label: "Register new election",
                value: "registerelection"
            },
            {
                label: "Vote in election",
                value: "vote"
            },
            {
                label: "See election results",
                value: "electionresults"
            },
        ];
    }

    render() {
        if (this.state.newPath) {
            return <Redirect push to={this.state.newPath}/>;
        }

        return (
            <div >
                {this.buttons.map((e, i) => {
                    return (
                        <div key={i}>
                            <br/>
                            <button
                                value={e.value}
                                onClick={this.onClick}>
                                {e.label}
                            </button>
                        </div>
                    )
                })}
            </div>
        );
    }

    onClick = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({newPath: event.target.value});
    };
}

export default MainMenu;
