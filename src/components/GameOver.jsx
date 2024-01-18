function GameOver({winner, onRematch}){
    return(
<div id="game-over">
    <h2>GAME OVER!!!!</h2>
    {winner && <p>{winner}...WON!!!!!</p>}
    {!winner && <p>its a......DRAW!!!</p>}
    <p>
        <button onClick={onRematch}>REMATCH</button>
    </p>
</div>
    );
}

export default GameOver