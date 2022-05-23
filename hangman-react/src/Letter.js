import React from 'react';

class Letter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            abc: props.abc,
            disabled: false
        };
    }

    handleClick = (event) => {
        if (this.state.disabled) {
            return;
        }
        this.setState({disabled: true});
        return this.state.abc;
        // Send     
    }

    render() {
        return (
            <button onClick={this.handleClick} disabled={this.state.disabled}>
                {this.state.abc}
            </button>
        );
    }
}
export default Letter;