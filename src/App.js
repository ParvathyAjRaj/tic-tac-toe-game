import React, { useState } from "react";
import Player from "./components/Player";
import Score from "./components/Score";
import Result from "./components/Result";

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
    const [playersName,setPlayersName] = useState({
      "X" : "Player 1",
      "O" : "Player 2"
    });
    const [showScoreBoard,setShowBoard] = useState(false);
    const [showResult,setShowResult] = useState(false);
    const [scores, setScores] = useState({ X: 0, O: 0 });
    let status = null;
     
    // to reset the game
    function handleReset(){
      setIsPlayer(true);
      setShowResult(false);
      setSquares(Array(9).fill(null));
      status = null;
      document.getElementById("status").classList.remove("celebrate");
      document.getElementById("status").classList.remove("draw");
    }

    // to play audio on selecting each button and also to check if the game is over or not
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

    // to find the winner
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

    // to update the gamers' names instantly
    function handleNameChange(symbol, name){
      console.log("entered handlename change fn");

      // Note : 
      // below 2 ways instanlty update the state values of playersName
      // Case 1 :
      // setPlayersName((prevPlayersName) => {
      //   return{...prevPlayersName,[symbol] : name}});
      // Case 2:
      setPlayersName({...playersName,[symbol]:name});

      // this wont update the state of the playersName as symbol value is not used
      // setPlayersName({...playersName,symbol:name});
    }

    const winner = findWinner(squares);
// give the updated score to Score component
    React.useEffect(() => {
      if (winner !== null) {
        setScores(prevScores => ({
          ...prevScores,
          [winner]: prevScores[winner] + 1
        }));
      }else{
          setScores(prevScores => ({...prevScores}))
      }
    }, [winner]);
    
    // get the game status
    if(squares.includes(null) === false){
      
      if (winner){
        // document.getElementById("status").classList.add("celebrate");
        status = playersName[winner].toUpperCase() + " wins this round" ;
        // success_audio.play();
        
      }else{
        document.getElementById("status").classList.add("draw");
        status = "Draw";
        // draw_audio.play();
      }

    }else{
      if (winner){
        // document.getElementById("status").classList.add("celebrate");
        status = playersName[winner].toUpperCase() + " wins this round" ;
        // success_audio.play();
      }else{
        status = "Next player : "+ (isplayerX? playersName["X"].toUpperCase() : playersName["O"].toUpperCase());
      }
    }

    // to get the score
    function handleScore(){
      setShowBoard(true);
    }

   
  return(
    <div id="game-container">
      <h1 style={{display: showScoreBoard ? "none" : ""}} id="status">{status}</h1>
      <div className="scoreButton">
        <button onClick={handleScore}>ScoreBoard</button>
      </div>
      {showScoreBoard ? 
      <div>
        <h1 className="celebrate" id="status">{scores.X === scores.O ? "draw" : scores.X > scores.O ? "Winner is " + playersName["X"] +" 🎉 ": "Winner is "+playersName["O"]+" 🎉 "}</h1>
        <Score 
        playerX={playersName["X"]} 
        playerO={playersName["O"]} 
        scores = {scores}/>
        <div className="backButton">
          <button onClick={() => setShowBoard(false)}>Back</button>
        </div>
      </div>
      : 
      <div>

        <ul id="players" className="highlight-player">
          <Player playerName={playersName["X"]} playerSymbol="X" onNameChange={handleNameChange}/>
          <Player playerName={playersName["O"]} playerSymbol="O" onNameChange={handleNameChange}/>
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
      }
    </div>
  );
}

export default App;