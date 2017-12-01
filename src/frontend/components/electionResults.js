/**
 * Created by archheretic on 01.12.17.
 */
import React from "react";
import ContractAddressField from "./forms/contractAddressField";
import { getElectionResults } from "../apiConsumer/elections";

class ElectionResults extends React.Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        console.log("0xa3e77f10404085e843823f499caad175c5c2eb87");
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Election Result</h1>
                    <ContractAddressField label="Insert election contract address" changeContractAddress={this.changeContractAddress} />
                    <input type="submit" value="Submit" />
                </form>
                {this.state.electionResult ? (
                        <div>
                            <h2>Result</h2>
                            <div>
                                {this.state.electionResult.map((e, i) =>
                                    <div key={i}>
                                        <label>
                                            {e.candidate} {e.votes}
                                        </label>
                                    </div>)}
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }

    changeContractAddress = (event) => {
        this.setState({contractAddress: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.contractAddress) {
            getElectionResults(this.state.contractAddress, (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    this.setState({electionResult: result.electionResult})
                    console.log(result);
                }
            });
        }
    };
}

export default ElectionResults;