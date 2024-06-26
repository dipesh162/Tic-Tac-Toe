import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({handleSquareClick, playerTurn, resetValue, row, col, winner}) {
  const [value, setValue] = useState(null)

  useEffect(()=>{
    if(resetValue){
      setValue(null)
    }
  },[resetValue])

  const handleClick= ()=>{
    if(winner) return
    setValue(playerTurn === 1 ? 'X' : '0')
    handleSquareClick(row,col,playerTurn === 1 ? 'X' : '0')
  }
  return (
    <div
      className="square"
      onClick={handleClick}
      style={squareStyle}>
        {value && value}
    </div>
  );
}

function Board() {
  const [playerTurn, setPlayerTurn] = useState(1)
  const [squareCount, setSquareCount] = useState(0)
  const [winner, setWinner] = useState(null)
  const [board, setBoard] = useState([
    ['','',''],
    ['','',''],
    ['','',''],
  ])

  const checkForWin = ()=>{
    // check row 
    for(let i = 0;i <3;i++){
      if(board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== ''){
        setWinner(playerTurn=== 2 ? 'X' : '0')
      }
    }

    // check column 
    for(let j = 0; j<3;j++){ 
      if(board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[2][j] === board[0][j]){
        setWinner(playerTurn=== 2 ? 'X' : '0')
      }
    }

    // check diagonal
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === board[0][0] || 
      board[2][2] === board[1][1] && board[1][1] === board[2][1] && board[2][1] === board[2][2]
    ){
      setWinner(playerTurn=== 2 ? 'X' : '0')
    }
  }

  const handleBoard = (row,col,value)=>{
    setBoard((prevBoard)=> {
      const newBoard = [...prevBoard]
      newBoard[row-1][col-1] = value
      return newBoard
    })
  }

  useEffect(()=>{
    if(squareCount>4){
      checkForWin(playerTurn)
    }
  },[squareCount])

  const handleSquareClick = (row, col, value)=>{
    handleBoard(row,col,value)
    setPlayerTurn((prev)=> prev === 1 ? 2 : 1)
    setSquareCount((prev)=> prev+1)
  }
  const [resetValue, setResetValue] = useState(null)

  const handleReset = ()=>{
    setSquareCount(0)
    setPlayerTurn(1)
    setResetValue(Math.random())
    setBoard([
      ['','',''],
      ['','',''],
      ['','',''],
    ])
    setWinner(null)
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{playerTurn === 1 ? 'X' : '0'}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner ? winner : 'None'}</span></div>
      <button style={buttonStyle} onClick={handleReset}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={1}
            col={1}
            winner={winner}
          />
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={1}
            col={2}
            winner={winner}
          />
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={1}
            col={3}
            winner={winner}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={2}
            col={1}
            winner={winner}
          />
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={2}
            col={2}
            winner={winner}
          />
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={2}
            col={3}
            winner={winner}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={3}
            col={1}
            winner={winner}
          />
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={3}
            col={2}
            winner={winner}
          />
          <Square 
            handleSquareClick={handleSquareClick}
            playerTurn={playerTurn}
            resetValue={resetValue}
            row={3}
            col={3}
            winner={winner}
          />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game />);