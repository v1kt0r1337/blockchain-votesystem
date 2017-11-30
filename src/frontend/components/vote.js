/**
 * Created by archheretic on 29.11.17.
 */
import React from "react";
import { getElectionCandidates } from "../apiConsumer/elections";
import { postVote } from "../apiConsumer/voters";

import UserCredentialsFormFields from "./userCredentialsFormFields";
const uuidv4 = require("uuid/v4");

class Vote extends React.Component {
    constructor() {
        super();
        // this.candidates = new Map();
        this.state = {
            ssn: "",
            password: "",
            candidateRadioButtons: null,
            chosenCandidate: "",
        };
    }

    render() {
        console.log("0xc76a1353b82f0579bec143b0f9a9f41866f59343");
        console.log("ssn: 1234 pwd: test ");
        return (
            <div className="register">
                <h1>Election</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Insert election contract address</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                size="49"
                                minLength="42"
                                maxLength="42"
                                placeholder="0xc76a1353b82f0579bec143b0f9a9f41866f59343"
                                onChange={this.changeElectionAddress}
                            />
                        </div>
                    </div>
                        {this.state.candidates ? (
                            <div>
                                <br/>
                                <div>
                                    <label>Select candidate</label>
                                </div>
                                <div>
                                    {this.state.candidates.map((candidate) =>
                                        <div key={uuidv4()}>
                                            <label>
                                                {candidate}
                                                <input
                                                    type="radio"
                                                    name={candidate}
                                                    checked={candidate === this.state.chosenCandidate}
                                                    onChange={this.handleRadioChange}
                                                />
                                            </label>
                                        </div>)}
                                </div>
                                <br/>
                                <div>
                                    <label>Your voter credentials</label>
                                </div>
                                <div>
                                    <UserCredentialsFormFields changeSSN={this.changeSSN} changePassword={this.changePassword} />
                                </div>
                            </div>
                                   ) : null }
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

    changeElectionAddress = (event) => {
        this.setState({electionAddress: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.chosenCandidate) {
            this.onFirstValidSubmit();
        }
        else {
            postVote(this.state.electionAddress, this.state.chosenCandidate, this.state.ssn, this.state.password);
            console.log(this.state.electionAddress);
            console.log(this.state.chosenCandidate);
        }
    };

    onFirstValidSubmit() {
        getElectionCandidates(this.state.electionAddress, (err, result) => {
            if (!err) {
                this.setState({candidates: result.candidates})
            }
            else {
                console.log(err);
            }
        });
    }

    handleRadioChange = (event) => {
        console.log(event.target);
        this.setState({chosenCandidate: event.target.name});
        console.log(event.target.name);
    };

    changeSSN = (event) => {
        this.setState({ssn: event.target.value});
    };

    changePassword = (event) => {
        this.setState({password: event.target.value});
    };
}

export default Vote;