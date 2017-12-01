/**
 * Created by archheretic on 29.10.17.
 */
import React from "react";
import { postVoter} from "../apiConsumer/voters";
import UserCredentialsFields from "./forms/userCredentialsFields";

class RegisterVoter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="register">
                <h1>Register new Voter</h1>
                <form onSubmit={this.handleSubmit}>
                    <UserCredentialsFields changeSSN={this.changeSSN} changePassword={this.changePassword} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

    changeSSN = (event) => {
        this.setState({ssn: event.target.value});
    };

    changePassword = (event) => {
        this.setState({password: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        postVoter(this.state.ssn, this.state.password, (err, result) => {
            if (!err) {
                alert("Your contract is being deployed in transaction at: " + result.message);
            }
            else {
                console.log(err);
            }
        });
    };
}

export default RegisterVoter;