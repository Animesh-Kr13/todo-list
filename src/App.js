import React, { useContext } from 'react';

import Form from "./Components/Form";
import TodoList from './Components/TodoList';
import CompletedTask from "./Components/CompletedTask";
import {Context} from "./Context"

function App() {

  const {deleteAllTask} = useContext(Context);
  return (
    <div className="container">
      <div className="heading">
         <h3 className="heading-item1">To do list</h3>
         <button onClick={() => deleteAllTask()} className="reset-button"><i className="fas fa-redo style-reset"></i> Reset all tasks</button>
      </div>
       <Form />
       <TodoList />
       <CompletedTask />
    </div>
  );
}

export default App;
