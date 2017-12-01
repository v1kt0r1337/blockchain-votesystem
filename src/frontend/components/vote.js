/**
 * Created by archheretic on 29.11.17.
 */
import React from "react";
import { getElectionCandidates } from "../apiConsumer/elections";
import { postVote } from "../apiConsumer/voters";

import ContractAddressField from "./forms/contractAddressField";
import UserCredentialsFields from "./forms/userCredentialsFields";
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
        console.log("Election 1 expire: 1 day");
        console.log("0xa3e77f10404085e843823f499caad175c5c2eb87");
        console.log("Election 2 expire: 100 day");
        console.log("0x9939bC241Da64044395238ede0518afE02eea08F");
        console.log("voter1: block 2175857");
        console.log("ssn: 123 pwd: test ");
        console.log("0x9370b3879997352c01b466adb13f3364a244a03f");
        console.log("voter2: block 2174241");
        console.log("ssn: 1234 pwd: test ");
        console.log("0x3014d0E4045e8219a2908b327c47de40Fa4fC3b1");
        console.log("voter3: block 2174247");
        console.log("ssn: 12345 pwd: test ");
        console.log("0x1f095c9587873F5Fa4e596D75c5217ce45B33903");
    }

    render() {
        return (
            <div>
                <h1>Election</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <ContractAddressField label="Insert election contract address" changeContractAddress={this.changeElectionAddress} />
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
                                    <UserCredentialsFields changeSSN={this.changeSSN} changePassword={this.changePassword} />
                                </div>
                                <div>
                                    <ContractAddressField label="Insert your Voter contract address" changeContractAddress={this.changeVoterAddress} />
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