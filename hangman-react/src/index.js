import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
//import Letter from "./Letter.js";
//import Blank from "./Blank.js";

var abcde = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

var word;
const userContext = createContext();

function Letter(props) {
  const [disabled, setDisabled] = useState(false);
  const [abc, setABC] = useState(props.abc);

  const handleClick = () => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    props.parentCallBack(abc);
    // Send
  };

  return (
    <button onClick={handleClick} disabled={disabled}>
      {abc}
    </button>
  );
}

function Blanks(props) {
  const [realWord, setRealWord] = useState(props.realWord.split(""));
  const [displayWord, setDisplayWord] = useState(realWord.map((char) => "_"));

  const changeVis = (letter) => {
    let isCorrect = false;
    let temp = displayWord.map((item) => item);
    for (let i = 0; i < realWord.length; i++) {
      if (realWord[i] == letter) {
        temp[i] = letter;
        isCorrect = true;
      }
    }
    if (isCorrect) {
      setDisplayWord(temp);
      let identical = true;
      for (let i = 0; i < realWord.length; i++) {
        if (realWord[i] != temp[i]) {
          identical = false;
        }
      }
      if (identical) {
        props.winner();
      }
    } else {
      props.murder();
    }
  };

  props.parentCallBack(changeVis);
  return displayWord.map((item) => {
    return <div class="box">{item}</div>;
  });
}

function Alphabet(props) {
  var count = -1;
  const handleCallback = (childData) => {
    props.parentCallBack(childData);
  };
  return abcde.map((item) => {
    count++;
    return <Letter abc={item} key={count} parentCallBack={handleCallback} />;
  });
}

class Gather extends React.Component {
  constructor(props) {
    super(props);
    word = "abcdcba";
    this.state = {
      changeVis: undefined,
      lives: 6,
      win: false,
    };
  }

  handleCallback = (childData) => {
    this.state.changeVis(childData);
  };

  edit = (childData) => {
    this.state.changeVis = childData;
  };

  updateLife = () => {
    let temp = this.state.lives;
    this.setState({ lives: temp - 1 });
  };

  youWin = () => {
    this.setState({ win: true });
  };

  render() {
    return (
      <div>
        {this.state.lives < 1 ? (
          <h1>gg</h1>
        ) : this.state.win ? (
          <h1>You win!</h1>
        ) : (
          <h1>You have {this.state.lives} lives left.</h1>
        )}
        <div class="flex align-start justify-start">
          <Blanks
            realWord={word}
            parentCallBack={this.edit}
            murder={this.updateLife}
            winner={this.youWin}
          />
        </div>
        <div>
          <Alphabet parentCallBack={this.handleCallback} />
        </div>
      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById("amogus"));
root.render(<Gather />);
