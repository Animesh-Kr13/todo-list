import React, { useContext } from "react";
import {Context} from "../Context"

const Todo = ({item, completed}) => {

    const {removeFromTodos, completedTodos, updateFilterArray} = useContext(Context);

    let str = item.text;
    let re = /test|shopping|submission|work|back-end|front-end|meeting/gi;

    let newStr = str.replace(re, (match) => { 
        console.log({match}); 
        return match.replace(match, `#${match}`);
    });
    
    const handleClick = () => {
        completedTodos(item);
    }

    const setFilter = (e,match) => {
        e.stopPropagation();
        updateFilterArray(match);
    }


    const reactStringReplace = require('react-string-replace');

    let replacedText = reactStringReplace(newStr, /#([\w-]+)/g, (match, i) => (
        <span key={match + i} className="hashtag-style" onClick={(e) => setFilter(e,match)}>#{match}</span>
    ));

    return(
        <div className="todo-card-container">
            <div onClick={handleClick} className="todo-card">
                <span className={`dot ${completed ? "completed-dot": ""}`}></span>
                <li>{replacedText}</li> 
            </div>
             <button onClick={() => removeFromTodos(item.id)} className="delete-button"><i className="fas fa-trash fa-2x"></i></button> 
        </div>
    );
};

export default Todo;