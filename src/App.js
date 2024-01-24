import React, { useState } from "react";

  function Square(props){
    return(<button onClick={props.onSquareClick} className="square">{props.value}</button>);
  }

  function App(){
    const [isplayer,setIsPlayer] = useState(true);
    const [squares,setSquares] = useState(Array(9).fill(null));

    function handleClick(index){
      if (squares[index] || findWinner(squares)){
        return;
      }
      const newSquares = squares.slice();
      if(isplayer){
        newSquares[index] = "X";
      }
      else{
        newSquares[index] = "O";
      }
      setSquares(newSquares);
      setIsPlayer(!isplayer);
      
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

    let status;
    if(squares.includes(null) === false){
      const winner = findWinner(squares);
      if (winner){
        document.getElementById("status").classList.add("celebrate");
        status = "Winner is "+ winner +" 🎉 ";
      }else{
        document.getElementById("status").classList.add("draw");
        status = "Draw";
      }
    }else{
      const winner = findWinner(squares);
      if (winner){
        document.getElementById("status").classList.add("celebrate");
        status = "Winner is "+ winner +" 🎉 ";
      }else{
        status = "Next player : "+ (isplayer? "X" : "O");
      }
    }
    

  return(
    <div>
      <h1 className="title">Tic Tac Toe</h1>
      <h1 id="status">{status}</h1>
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
    </div>
    
    
  );
}

export default App;