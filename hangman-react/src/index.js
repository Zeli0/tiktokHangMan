import React from 'react';
import ReactDOM from 'react-dom/client';
//import Letter from "./Letter.js";
//import Blank from "./Blank.js";

var abcde = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

var splitWord;
var word;

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
      console.log("Asdf");
      if (word.includes(this.state.abc)) {
        for (let i = 0; i < splitWord.length; i++) {
          if(this.state.abc == splitWord[i]) {
            let temp = useRef(i);
            temp.setState({ displayLetter: temp.state.realLetter });;
          }
        }
      }
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

class Blank extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
          realLetter: props.realLetter,
          displayLetter: "_" 
      };
  }

  render() {
      return (
          <div class="box">{this.state.displayLetter}</div>
      );
  }
}

function Alphabet() {
  var count = -1;
  return abcde.map((item) => {
    count++;
    return <Letter abc={item} key={count} />
  })
}

function GenerateWord() {
  word = "abcdcba";
  var count = -1;
  splitWord = word.split("");
  return splitWord.map((item) => {
    count++;
    return <Blank realLetter={item} ref={count} />
  })
}

function Gather() {
  return (
    <div>
      <div class="flex align-start justify-start">
        <GenerateWord />
      </div>
      <div>
        <Alphabet />
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('amogus'));
root.render(<Gather />);

