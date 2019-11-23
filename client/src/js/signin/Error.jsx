import React from 'react';

export function Error(props){
    return (<label className="error error--small">{props.message}</label>);
}