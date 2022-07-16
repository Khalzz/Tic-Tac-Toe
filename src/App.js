import React, { useState } from 'react';
import './style/App.css';
import { Toaster, toast } from 'react-hot-toast';

let generalTurn = 0;
let playerTurn = 1;
let isWinned = false;
let isDraw = false;
let whoWinned = 0;

const Player1Winner = () => toast('El jugador ' + whoWinned + ' ha ganado',  {
  icon: '🥳🎉🥳',
  style: {
    borderRadius: '2em',
    padding: '16px',
    color: '#171717',
    background: '#C3073F',
  },
});

const Player2Winner = () => toast('El jugador ' + whoWinned + ' ha ganado',  {
  icon: '🥳🎉🥳',
  style: {
    borderRadius: '2em',
    padding: '16px',
    color: '#171717',
    background: '#29B6F6',
  },
});

const Draw = () => toast('Empate',  {
  icon: '😲',
  style: {
    borderRadius: '2em',
    padding: '16px',
    color: '#171717',
    background: '#F2F2F2',
  },
});

// here i will save the state of the game with:
  // 1. for player 1
  // 2. for player 2
  // null for unnplayed
let playerGrid = [null,null,null,
                  null,null,null, 
                  null,null,null];

let checkPlayer = [0,0,0,
                   0,0,0, 
                   0,0,0];

let winner = () => {
  // we create an array full of elements that are gona be looked (when we find a connection we cand eterminate if theres a winner*)
  const winningCases = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
  ]

  // this PIECE OF ART checks if theres any 3 number together on the player grid
  winningCases.forEach (function (p) {
    if (playerGrid.includes(p[0])) {
      if (playerGrid.includes(p[1])) {
        if (playerGrid.includes(p[2])) {
          if (checkPlayer[p[0]] === 1 && checkPlayer[p[1]] === 1 && checkPlayer[p[2]] === 1){
            isWinned = true;
            whoWinned = 1;
            Player1Winner();
            console.log('ha ganado el jugador 1');
          } else if (checkPlayer[p[0]] === 2 && checkPlayer[p[1]] === 2 && checkPlayer[p[2]] === 2) {
            isWinned = true;
            whoWinned = 2;
            Player2Winner();
            console.log('ha ganado el jugador 2');
          }
        }
      }
    }
  }) 

  if (isWinned === false && generalTurn >= 8)  {
    console.log("Tenemos un empate");
    isDraw = true;
    Draw();
  }
}

let changeStates = (x, setOcuppied, setPlayer) => {
  if (isWinned === false) {
    checkPlayer[x] = playerTurn;
    if (playerTurn === 1) {
      setOcuppied(true);
      setPlayer(1);
      playerTurn = 2;
    } else if (playerTurn === 2) {
      setOcuppied(true);
      setPlayer(2);
      playerTurn = 1;
    }
    playerGrid[x] = x;
    winner()
    generalTurn += 1;
  }
}

const ButtonBlock = (props) => {
  // states
  const [player, setPlayer] = useState(0);
  const [itsOccupied, setOcuppied] = useState(false);
  const [x] = useState(props.x)

  if (itsOccupied === true && player === 1) {
    return (
      <div className='Box' style={props.style} x={props.x}>
        <div className="o"><div className="inner-o"></div></div>
      </div>);  
  } else if (itsOccupied === true && player === 2) {
    return (
      <div className='Box' style={props.style} x={props.x}>
        <div className="x"><div className="first-line"></div><div className="second-line"></div></div>
      </div>
    ); 
  } else {
      return(
        <div className='Box' onClick={()=> changeStates(x, setOcuppied, setPlayer)} style={props.style} x={props.x}>
          <div className="circle"></div>
        </div>
      );
  }
}

function Restart() {
  console.log("restart");
  document.location.reload();
}

function RestartButton() {
  return <div className='RestartButton' onClick={()=> Restart()}>Restart</div>
}

const Main = () => {
  return (
  <div className='BaseContainer'>  
    <div className='MainContainer'>
      <div className='GameBox'>     
        <ButtonBlock style={{gridColumn: 1, gridRow: 1}} x={0}></ButtonBlock>
        <ButtonBlock style={{gridColumn: 2, gridRow: 1}} x={1}></ButtonBlock>
        <ButtonBlock style={{gridColumn: 3, gridRow: 1}} x={2}></ButtonBlock>
        <ButtonBlock style={{gridColumn: 1, gridRow: 2}} x={3}></ButtonBlock>
        <ButtonBlock style={{gridColumn: 2, gridRow: 2}} x={4}></ButtonBlock>
        <ButtonBlock style={{gridColumn: 3, gridRow: 2}} x={5}></ButtonBlock>
        <ButtonBlock style={{gridColumn: 1, gridRow: 3}} x={6}></ButtonBlock>
        <ButtonBlock style={{gridColumn: 2, gridRow: 3}} x={7}></ButtonBlock>
        <ButtonBlock style={{gridColumn: 3, gridRow: 3}} x={8}></ButtonBlock>
      </div>
      <RestartButton></RestartButton>
    </div>
    <Toaster position="bottom-center"/>
  </div>);
}
export default Main;