import React, {useState, createContext} from 'react';
import ReactDOM from 'react-dom/client';
//import Letter from "./Letter.js";
//import Blank from "./Blank.js";

var abcde = ["a", "b", "c", "d", "e", "f", "g", "h",
"i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
"t", "u", "v", "w", "x", "y", "z"];

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
    console.log("Asdf");
    props.parentCallBack(abc);
    // Send     
  }

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
    console.log("sothony sadtano");
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
    } else {
      props.murder();
    }
  }

  props.parentCallBack(changeVis);
  return displayWord.map((item) => {
    return <div class="box">{item}</div>
  });
}


function Alphabet(props) {
  var count = -1;
  const handleCallback = (childData) => {
    props.parentCallBack(childData);
  }
  return abcde.map((item) => {
    count++;
    return <Letter abc={item} key={count} parentCallBack={handleCallback}/>
  })
}

/*function Gather() {
  word = "abcdcba";
  const [changeVis, setChangeVis] = useState(undefined);
  const [lives, setLives] = useState(10);

  const handleCallback = (childData) => {
    changeVis(childData);
  }

  const edit = (childData) => {
    setChangeVis(childData);
  }
  const updateLife = () => {
    setLives(lives - 1);
  }

  return (
    <div>
      <h3>You have {lives} lives left.</h3>
      <div class="flex align-start justify-start">
        <Blanks  realWord={word} parentCallBack={edit} murder={updateLife}/>
      </div>
      <div>
        <Alphabet parentCallBack={handleCallback} />
      </div>
    </div>
    )
} */


class Gather extends React.Component {
  constructor(props) {
    super(props);
    word = "abcdcba";
    this.state = {
      changeVis : undefined,
      lives : 10
    }
  }

  handleCallback = (childData) => {
    this.state.changeVis(childData);
  }

  edit = (childData) => {
    this.state.changeVis = childData;
  }

  updateLife = () => {
    let temp = this.state.lives;
    console.log(temp);
    this.setState({lives : temp - 1});
  }

  render() {
    return (
    <div>
      <h1>You have {this.state.lives} lives left.</h1>
      <div class="flex align-start justify-start">
        <Blanks  realWord={word} parentCallBack={this.edit} murder={this.updateLife}/>
      </div>
      <div>
        <Alphabet parentCallBack={this.handleCallback} />
      </div>
    </div>
    )
  }
}
const root = ReactDOM.createRoot(document.getElementById('amogus'));
root.render(<Gather />);

