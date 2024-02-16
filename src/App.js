import React, { useState } from "react";
import Player from "./components/Player";

  function Square(props){
    return(<button onClick={props.onSquareClick} className="square">{props.value}</button>);
  }

  function App(){
    const draw_audio = new Audio("/audio/draw_audio.mp3");
    const success_audio = new Audio("/audio/success_audio.mp3");
    const x_audio = new Audio("/audio/x_audio.mp3");
    const o_audio = new Audio("/audio/o_audio.mp3")

    const [isplayerX,setIsPlayer] = useState(true);
    const [squares,setSquares] = useState(Array(9).fill(null));
    let status = null;
    
    function handleReset(){
      setIsPlayer(true);
      setSquares(Array(9).fill(null));
      status = null;
      document.getElementById("status").classList.remove("celebrate");
      document.getElementById("status").classList.remove("draw");
    }

    function handleClick(index){
      // check if already the sqaure is filled or if the game is over if any player wins
      // in this case we need to simply return
      if (squares[index] || findWinner(squares)){
        if(squares[index]){
          alert("Button already selected");
          return;
        }else{
          return;
        }
        
      }
      const newSquares = squares.slice();
      if(isplayerX){
        newSquares[index] = "X";
        x_audio.play();
      }
      else{
        newSquares[index] = "O";
        o_audio.play();
      }
      setSquares(newSquares);
      // setIsPlayer(!isplayerX);
      setIsPlayer((editingPlayer) => !editingPlayer);
    }

    function findWinner(squares){
      const pattern = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      for (var i = 0; i < pattern.length; i++){
        const [a,b,c] = pattern[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
          return(squares[a])
        }
      }
      return null;
    }

    if(squares.includes(null) === false){
      const winner = findWinner(squares);
      if (winner){
        document.getElementById("status").classList.add("celebrate");
        status = "Winner is "+ winner +" 🎉 ";
        success_audio.play();
      }else{
        document.getElementById("status").classList.add("draw");
        status = "Draw";
        draw_audio.play();
      }

    }else{
      const winner = findWinner(squares);
      if (winner){
        document.getElementById("status").classList.add("celebrate");
        status = "Winner is "+ winner +" 🎉 ";
        success_audio.play();
      }else{
        status = "Next player : "+ (isplayerX? "X" : "O");
      }
    }
    

  return(
    <div id="game-container">
      <h1 id="status">{status}</h1>
      <ul id="players" className="highlight-player">
        <Player playerName="Player 1" playerSymbol="X"/>
        <Player playerName="Player 2" playerSymbol="O"/>
        
      </ul>
      <div className="row">
        <Square value={squares[0]} onSquareClick={()=>{handleClick(0)}}/>
        <Square value={squares[1]} onSquareClick={()=>{handleClick(1)}}/>
        <Square value={squares[2]} onSquareClick={()=>{handleClick(2)}}/>
      </div>
      <div className="row">
        <Square value={squares[3]} onSquareClick={()=>{handleClick(3)}}/>
        <Square value={squares[4]} onSquareClick={()=>{handleClick(4)}}/>
        <Square value={squares[5]} onSquareClick={()=>{handleClick(5)}}/>
      </div>
      <div className="row">
        <Square value={squares[6]} onSquareClick={()=>{handleClick(6)}}/>
        <Square value={squares[7]} onSquareClick={()=>{handleClick(7)}}/>
        <Square value={squares[8]} onSquareClick={()=>{handleClick(8)}}/>
      </div>
      <div className="resetButton">
        <button disabled={status.includes("Next")} onClick={handleReset}>Restart</button>
      </div>
    </div>
    
    
  );
}

export default App;