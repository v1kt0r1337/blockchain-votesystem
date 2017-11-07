/**
 * Created by archheretic on 29.10.17.
 */

import React from "react";
import Voter from "../apiConsumer/voters";


class RegisterVoter extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeSSN = this.changeSSN.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    render() {

        return (
            <div className="register">
                <h1>Register new Voter</h1>
                <form role="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">SSN</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ssn"
                            placeholder="Social security number"
                            onChange={this.changeSSN}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={this.changePassword}
                        />
                    </div>
                    <input type="submit" value="Submit" />

                </form>
            </div>
        );
    }

    changeSSN (event) {
        this.setState({ssn: event.target.value});
    }

    changePassword (event) {
        this.setState({password: event.target.value});
    }

    handleSubmit (event) {
        event.preventDefault();
        Voter.postVoter(this.state.ssn, this.state.password, (err, result) => {
            if (!err) {
                alert("Your contract is being deployed in transaction at: " + result.message);
            }
            else {
                console.log(err);
            }
        });
    }
}

export default RegisterVoter;