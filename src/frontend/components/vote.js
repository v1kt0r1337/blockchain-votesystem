/**
 * Created by archheretic on 29.11.17.
 */
import React from "react";
import { getElectionCandidates, getElectionResult } from "../apiConsumer/elections";
import { postVote } from "../apiConsumer/voters";

import UserCredentialsFormFields from "./userCredentialsFormFields";
const uuidv4 = require("uuid/v4");

class Vote extends React.Component {
    constructor() {
        super();
        this.state = {
            electionAddress: "",
            voterAddress: "",
            ssn: "",
            password: "",
            candidateRadioButtons: null,
            chosenCandidate: "",
        };
        console.log("Election 1 expire: 10 day");
        console.log("0x99087bc1747da8B90e78d2B8De1305fC9f3f44fc");
        // console.log("Election 2 expire: 100 day");
        // console.log("0xe76397aadcae5a5d0d50748de9711581d947eb57");
        console.log("voter1: block 2174225");
        console.log("ssn: 123 pwd: test ");
        console.log("0x357f66af37edb7c3c0f07fe27a4f636dbd5ace32");
        console.log("voter2: block 2174241");
        console.log("ssn: 1234 pwd: test ");
        console.log("0x0961fF8D2f6552D2b7B764e99787424f1F61981b");
        console.log("voter3: block 2174247");
        console.log("ssn: 12345 pwd: test ");
        console.log("0xBaeeF001f85d209D0c7CfF667a256B0985414926");
    }

    componentWillMount() {
        getElectionResult("0x99087bc1747da8B90e78d2B8De1305fC9f3f44fc", (err, result) => {
           if (err) {
               console.log(err);
           }
           else {
               console.log(result);
           }
        });
    }

    render() {
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
                                placeholder="0xe76397aadcae5a5d0d50748de9711581d947eb57"
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
                                <div>
                                    <label>Insert your Voter contract address</label>
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            size="49"
                                            minLength="42"
                                            maxLength="42"
                                            placeholder="0x357f66af37edb7c3c0f07fe27a4f636dbd5ace32"
                                            onChange={this.changeVoterAddress}
                                        />
                                    </div>
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

    changeVoterAddress = (event) => {
        this.setState({voterAddress: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.chosenCandidate) {
            this.onFirstValidSubmit();
        }
        else {
            postVote(this.state.electionAddress, this.state.voterAddress,
                this.state.chosenCandidate, this.state.ssn, this.state.password,
                (err, result) => {
                    if (!err) {
                        console.log(result);
                        alert(result.message);
                    }
                    else {
                        console.log(err);
                    }
                });
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
        this.setState({chosenCandidate: event.target.name});
    };

    changeSSN = (event) => {
        this.setState({ssn: event.target.value});
    };

    changePassword = (event) => {
        this.setState({password: event.target.value});
    };
}

export default Vote;