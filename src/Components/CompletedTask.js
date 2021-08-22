import React, {useContext} from "react";
import Todo from "./Todo";
import {Context} from "../Context";

const CompletedTask = () => {

    const {completedTask, filterArray} = useContext(Context);
    let taskData;
    let filterLength = filterArray.length;

    if(filterLength){
        const sortedData = completedTask.filter(todo => {
            if(filterArray.every(item => (todo.text).includes(item))){
                return todo;
            }
            return "";
        })

        taskData = sortedData.map(todo => (
            <Todo key={todo.id} item={todo} completed={true}/>
        ))
    } else {
        taskData = completedTask.map(todo => (
            <Todo key={todo.id} item={todo} completed={true}/>
        ))
    }

    return(
        <div className="completed-container">
            <h4 className={`completed-heading ${completedTask.length ? "" : "hidden"}`}>Completed</h4>
            <ul>
                {taskData}
            </ul>
        </div>
    );
};

export default CompletedTask;