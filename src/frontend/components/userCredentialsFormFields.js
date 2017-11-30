/**
 * Created by archheretic on 30.11.17.
 */
import React from "react";

class UserCredentialsFormFields extends React.Component {
    constructor(props) {
        super(props);
        this.changeSSN = this.props.changeSSN.bind(this);
        this.changePassword = this.props.changePassword.bind(this);
    }
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default UserCredentialsFormFields;