import React,{useState} from "react";

function Score({playerX,playerO,scores}){

 return(
    <>
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
    </>
    )
}

export default React.memo(Score)