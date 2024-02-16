function Result({finalWinner}){
    console.log("entered result component");
    console.log(finalWinner)
    return(
        <h1>{finalWinner}</h1>
    )
}

export default Result