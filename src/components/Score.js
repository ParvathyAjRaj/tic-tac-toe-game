import React,{useState} from "react";

function Score({playerX,playerO,scores}){

 return(
    <div className="scoreTable">
        <table>
            <thead>
                <tr>
                    <th>{playerX.toUpperCase()}</th>
                    <th>{playerO.toUpperCase()}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{scores.X}</td>
                    <td>{scores.O}</td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

export default React.memo(Score)