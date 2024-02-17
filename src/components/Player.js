import React,{useState} from "react";

export default function Player(props){
    const defaultPlayerName = props.playerName
    const [isEditing,setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(defaultPlayerName);

    function handleEdit(){
        // This is not best practice as the value is not updated instantly by React
        // setIsEditing(!isEditing);

        // this is the best practice as the value updation happens instantly.
        // React gives the arrow function the current value of the isEditing as parameter
        setIsEditing((editing) => !editing);
        if(isEditing){
          console.log("saved button clicked");
          props.onNameChange(props.playerSymbol,playerName);
        }
    }

    function handleChange(e){
        setPlayerName(e.target.value);
    }

    return(
        <li className={(props.isPlayerX === true) ? "active" : undefined}>
        <span>
          {isEditing ? 
              <input onChange={handleChange} value={playerName}/> 
              :
              <span className="player-name"><b>{playerName}</b></span>
          }
          <span className="player-symbol"><b>{props.playerSymbol}</b></span>
        </span> 
        <button onClick={handleEdit}><b>{isEditing ? "Save" : "Edit"}</b></button>
        </li>);
    
} 