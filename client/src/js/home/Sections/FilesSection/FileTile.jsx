import React from 'react';

export function FileTile(props){
    return(
        <div className="file-tile__wrapper">
            <button className="file-tile" name={props.name} onClick={props.onClick}>{props.name}</button>
            <button className="file-tile__remove-button" name={props.name} onClick={props.onRemove}></button>
        </div>
    );
}