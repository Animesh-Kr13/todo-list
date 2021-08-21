import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

const ContextProvider = ({children}) => {

    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);
    const [filterArray, setFilterArray] = useState([]);

    useEffect(() => {
        getLocalTodos();
        getLocalCompletedTodos();
    }, [])

    useEffect(() => {
        saveLocalTodos();
        saveLocalCompletedTodos();
    }, [todos, completedTask])


    const removeFromTodos = (id) => {
        if(todos.some(item => item.id === id)){
            setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
        } else if (completedTask.some(item => item.id === id)) {
            setCompletedTask(prevTodos => prevTodos.filter(item => item.id !== id));
        } 
    }

    const completedTodos = (newItem) => {
        if(todos.some(item => item.id === newItem.id)){
            setCompletedTask(prevTask => [newItem, ...prevTask]);
            removeFromTodos(newItem.id);
        }
        
    }

    const deleteAllTask = () => {
        setTodos([]);
        setCompletedTask([]);
        refreshFilterArray();
    }

    const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const getLocalTodos = () => {
        if(localStorage.getItem("todos") === null){
            localStorage.setItem("todos", JSON.stringify([]));
        } else {
            let todoLocal = JSON.parse(localStorage.getItem("todos"));
            setTodos(todoLocal);
        }
    }

    const saveLocalCompletedTodos = () => {
        localStorage.setItem("completedTask", JSON.stringify(completedTask));
    }

    const getLocalCompletedTodos = () => {
        if(localStorage.getItem("completedTask") === null){
            localStorage.setItem("completedTask", JSON.stringify([]));
        } else {
            let localCompletedTodo = JSON.parse(localStorage.getItem("completedTask"));
            setCompletedTask(localCompletedTodo);
        }
    }
    
    const updateFilterArray = (newWord) => {
        if(filterArray.includes(newWord)){
            setFilterArray(prevArray => [...prevArray])
        } else {
            setFilterArray(prevArray => [...prevArray, newWord])
        }  
    }

    const refreshFilterArray = () => {
        setFilterArray([]);
    }

    return(
        <Context.Provider value={{inputText, 
                                  setInputText, 
                                  todos, 
                                  setTodos, 
                                  removeFromTodos, 
                                  completedTodos, 
                                  completedTask,
                                  deleteAllTask,
                                  filterArray,
                                  updateFilterArray,
                                  refreshFilterArray
                                  }}>
            {children}
        </Context.Provider>
    );
};

export {ContextProvider, Context};