import React, {useContext} from "react";
import Todo from "./Todo"
import {Context} from "../Context"
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {

    const {todos, filterArray, refreshFilterArray} = useContext(Context);
    let todoData;
    const filterLength = filterArray.length;

    const filterData = filterArray.map(item => (
        <span key={uuidv4()} className="filtering-list">#{item}</span>
    ))

    if(filterLength){
        const sortedData = todos.filter(todo => {
            if(filterArray.every(item => (todo.text).includes(item))){
                return todo;
            }
            return "";
        })

        todoData = sortedData.map(todo => (
            <Todo key={todo.id} item={todo} completed={false} />
        ))
    } else {
        todoData = todos.map(todo => (
            <Todo key={todo.id} item={todo} completed={false} />
        ))
    }

    return(
        <div className="todo-container">
            <div className={`filter-container ${filterLength ? "" : "hidden"}`}>
                <p className="filter-text">{filterData}</p>
                <button onClick={() => refreshFilterArray()} className="reset-filter-button"><i className="fas fa-redo"></i> Reset filter</button>
            </div>
            <ul className="todo-list">
                {todoData}
            </ul>
        </div>
    );
};

export default TodoList;