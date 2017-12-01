/**
 * Created by archheretic on 30.11.17.
 */
import React from "react";

class UserCredentialsFields extends React.Component {
    constructor(props) {
        super(props);
        this.changeSSN = this.props.changeSSN.bind(this);
        this.changePassword = this.props.changePassword.bind(this);
    }
    render() {
        return (
            <div>
                <div>
                    <label>SSN </label>
                    <input
                        type="number"
                        step="1"
                        className="form-control"
                        id="ssn"
                        placeholder="Social security number"
                        onChange={this.changeSSN}
                    />
                </div>
                <div>
                    <label>Password </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={this.changePassword}
                    />
                </div>
            </div>
        );
    }
}

export default UserCredentialsFields;