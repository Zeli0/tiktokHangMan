import React, { useState, createContext, Component } from "react";
import ReactDOM from "react-dom/client";
import { randomWord } from "./word.js";
//import Letter from "./Letter.js";
//import Blank from "./Blank.js";

import Canvas from "./components/Canvas";

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
      if (realWord[i].toLowerCase() == letter) {
        temp[i] = realWord[i];
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

/*const draw = (ctx) =>  {
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 0);
  ctx.stroke(); 
}*/

const gallows = (ctx) => {
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 350);
  ctx.moveTo(0, 350);
  ctx.lineTo(200, 350);
  ctx.moveTo(50, 0);
  ctx.lineTo(50, 10);
  ctx.stroke();
}

const head = (ctx) => {
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, 2 * Math.PI);
  ctx.stroke();
} 

const body = (ctx) => {
  ctx.moveTo(50, 90);
  ctx.lineTo(50, 250);
  ctx.stroke();
}

const armLeft = (ctx) => {
  ctx.moveTo(0, 150);
  ctx.lineTo(50, 150);
  ctx.stroke();
}

const armRight = (ctx) => {
  ctx.moveTo(50, 150);
  ctx.lineTo(100, 150);
  ctx.stroke();
}

const legLeft = (ctx) => {
  ctx.moveTo(50, 250);
  ctx.lineTo(120, 320);
  ctx.stroke();
}

const legRight = (ctx) => {
  ctx.moveTo(50, 250);
  ctx.lineTo(0, 320)
  ctx.stroke();
}

class Gather extends React.Component {
  
  static defaultProps = {
    images: [legRight, legLeft, armRight, armLeft, body, head, gallows]
  }

  
  constructor(props) {
    super(props);
    word = randomWord();
    console.log(word);
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
        <Canvas draw = {this.props.images[this.state.lives]} height={400} width={400} />
        {this.state.lives < 1 ? (
          <h3>Try again!</h3>
        ) : this.state.win ? (
          <h3>You win!</h3>
        ) : (
          <h3>You have {this.state.lives} lives left.</h3>
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
