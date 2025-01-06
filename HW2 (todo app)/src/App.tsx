import { useState } from "react";
import "./App.css";
import ToggleButton from "./components/ToggleButton/ToggleButton.tsx";
import { useTodos } from "./hooks/useTodos.ts";
import { useDarkMode } from "./hooks/useDarkMode.ts";
import { useEditingTodo } from "./hooks/useEditingTodo.ts";
import TodoForm from "./components/TodoForm/TodoForm.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import FeaturesPopup from "./components/FeaturesPopup/FeaturesPopup.tsx";
import EditTodoPopup from "./components/EditTodoPopup/EditTodoPopup.tsx";

function App() {
  const todos = useTodos();
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [status, setStatus] = useState("all");
  const { editingTodo, stopEditing, setEditingTodo, startEditing } =
    useEditingTodo();

  return (
    <div className={`app ${isDarkMode ? `dark-mode` : ``}`}>
      <div className="background">
        <div className="circle-top"></div>
        <div className="circle-middle"></div>
        <div className="circle-right"></div>
        <div className="circle-bottom"></div>
      </div>
      <div className="overlay"> </div>

      <div className="app-container">
        <div className="header-section">
          <div className="header-content">
            <h1 className="header-title">Todo List</h1>
            <ToggleButton setDarkMode={toggleDarkMode} darkMode={isDarkMode} />
          </div>
          <TodoForm addTodo={todos.addTodo} />
        </div>
        <div className="todo-list-section">
          <div className="filter-buttons">
            {["all", "completed", "notCompleted"].map((filterStatus) => (
              <button
                key={filterStatus}
                className={status === filterStatus ? "active" : ""}
                onClick={() => setStatus(filterStatus)}
              >
                {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              </button>
            ))}
          </div>
          <TodoList
            status={status}
            startEditing={startEditing}
            deleteTodo={todos.deleteTodo}
            toggleTodoCompletion={todos.toggleTodoCompletion}
            filterTodosByStatus={todos.filterTodosByStatus}
            allTodosNo={todos.allTodosNo}
          />
          <div className="todo-list-footer">
            <span>
              <span>{todos.allTodosNo}</span> todos
            </span>
            <span>
              <span>{todos.completedTodosNo}</span> completed
            </span>
            <button onClick={todos.handleClearCompletedClick}>
              clear completed
            </button>
          </div>
        </div>
      </div>

      <EditTodoPopup
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        stopEditing={stopEditing}
        updateTodoDetails={todos.updateTodoDetails}
      />
      <FeaturesPopup />
    </div>
  );
}

export default App;
