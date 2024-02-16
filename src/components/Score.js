import React,{useState} from "react";

function Score({playerX,playerO,scores}){

 return(
    <div className="scoreTable">
        <table>
            <tr>
                <th>{playerX}</th>
                <th>{playerO}</th>
            </tr>
            <tr>
                <td>{scores.X}</td>
                <td>{scores.O}</td>
            </tr>
        </table>
    </div>
    )
}

export default React.memo(Score)