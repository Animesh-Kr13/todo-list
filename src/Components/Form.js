import React, {useContext} from "react";
import { Context } from "../Context";
import { v4 as uuidv4 } from 'uuid';

const Form = () => {

    const {inputText, setInputText, todos, setTodos} = useContext(Context);

    const handleChange = (e) => {
        setInputText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputText === ""){
            alert("Please enter some task");
        } else {
            setTodos([
                {text: inputText, completed: false, id: uuidv4()},
                ...todos
            ])
        }
        setInputText("");
    }

    return (
        <form className="form-field">
            <input type="text" 
                   class="todo-input" 
                   placeholder="+ Add a task"
                   value={inputText}
                   onChange={handleChange}/>
            <button onClick={handleSubmit} className="todo-button" type="submit">
                <i class="fas fa-plus-square fa-2x"></i>
            </button>
        </form>
    );
};

export default Form;