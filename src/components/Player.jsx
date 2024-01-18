import { useState } from "react";

function Player({name : initialName,symbol,isActive}) {
    const[playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        setIsEditing(editting => !editting);
    }

    function handleSaveClick(){
       setIsEditing(false);
    }

    function handleChange(event){
        console.log(event);
       setPlayerName(event.target.value);
    }

    let editablePlayerName;
    let btnCaption;
    if(isEditing == false){
        editablePlayerName = <span className="player-name">{playerName}</span>;
        btnCaption = "Edit";
    }else{
        editablePlayerName = <input type="text" className="player-name" placeholder="Please Enter a Name" required defaultValue={playerName} onChange={handleChange}></input>
        btnCaption = "Save";
    }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={isEditing ? handleSaveClick : handleEditClick}>{btnCaption}</button>
    </li>
  );
}

export default Player;
