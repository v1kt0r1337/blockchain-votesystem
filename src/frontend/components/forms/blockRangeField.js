/**
 * Created by archheretic on 01.12.17.
 */
import React from "react";

class BlockRangeField extends React.Component {
    constructor(props) {
        super(props);
        this.changeStartBlockNumber = this.props.changeStartBlockNumber.bind(this);
        this.changeEndBlockNumber = this.props.changeEndBlockNumber.bind(this);
    }

    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <div>
                    Start Block{" "}
                    <input
                        type="number"
                        step="1"
                        placeholder="2175857"
                        onChange={this.changeStartBlockNumber}
                    />
                </div>
                <div>
                    End Block{" "}
                    <input
                        type="number"
                        step="1"
                        placeholder="optional"
                        onChange={this.changeEndBlockNumber}
                    />
                </div>
            </div>
        );
    }
}

export default BlockRangeField;