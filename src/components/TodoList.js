// components/TodoList.js
import React from "react";
import "./TodoList.css";

const TodoList = ({ todos, removeTodo }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ffcccb";
      case "In Progress":
        return "#ffff99";
      case "Completed":
        return "#90ee90";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="todo-item"
          style={{ backgroundColor: getStatusColor(todo.status) }}
        >
          <div className="todo-details">
            <span className="todo-title">{todo.title}</span>
            <span className="todo-status">{todo.status}</span>
          </div>
          <button className="remove-button" onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
