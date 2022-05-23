import React from 'react';

class Blank extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            realLetter: props.realLetter, 
            visible: false
        };
    }

    changeVis = () => {
        this.setState({ visible: true });
    }

    render() {
        return (
            <div class="box">_</div>
        );
    }
}
export default Blank;