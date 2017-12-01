/**
 * Created by archheretic on 01.12.17.
 */
import React from "react";

class ContractAddressField extends React.Component {
    constructor(props) {
        super(props);
        this.changeElectionAddress = this.props.changeContractAddress.bind(this);
    }
    render() {
        return(
            <div>
                <label>{this.props.label}</label>
                <div>
                    <input
                        type="text"
                        size="49"
                        minLength="42"
                        maxLength="42"
                        placeholder="0xe76397aadcae5a5d0d50748de9711581d947eb57"
                        onChange={this.changeElectionAddress}
                    />
                </div>
            </div>
        );
    }
}

export default ContractAddressField;