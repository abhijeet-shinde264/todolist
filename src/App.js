// App.js
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css"; 
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", status: "Pending" },
    { id: 2, title: "Build Todo App", status: "In Progress" },
    { id: 3, title: "Master JavaScript", status: "Completed" },
  ]);

  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("todos");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoStatus, setNewTodoStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts from the API
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPosts(data.slice(0, 10)); // Get the first 10 posts
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "posts") {
      fetchPosts();
    }
  }, [view]); // Fetch posts when the view changes to posts

  const addTodo = () => {
    if (newTodoTitle.trim()) {
      const newTodo = {
        id: todos.length + 1,
        title: newTodoTitle,
        status: newTodoStatus,
      };
      setTodos([...todos, newTodo]);
      setNewTodoTitle("");
      setNewTodoStatus("Pending");
      setShowAddForm(false); // Hide the form after adding
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleView = () => {
    setView(view === "todos" ? "posts" : "todos");
  };

  return (
    <div className="app-container">
      <h1>{view === "todos" ? "Todo List" : "Posts"}</h1>
      <div className="button-container">
        {view === "todos" && (
          <>
            <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
              <i className="fa fa-plus" aria-hidden="true"></i> Add Todo
            </button>
            <button className="toggle-button" onClick={toggleView}>
              Show Posts
            </button>
          </>
        )}
        {view === "posts" && (
          <div className="view-buttons">
            <button className="reload-button" onClick={fetchPosts}>
              Reload Posts
            </button>
            <button className="toggle-button" onClick={toggleView}>
              Show Todos
            </button>
          </div>
        )}
      </div>
      {showAddForm && (
        <div className="add-todo-form">
          <input
            type="text"
            placeholder="Enter todo title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            className="todo-input"
          />
          <select
            value={newTodoStatus}
            onChange={(e) => setNewTodoStatus(e.target.value)}
            className="status-select"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="submit-button" onClick={addTodo}>Submit</button>
          <button className="cancel-button" onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}
      {view === "todos" ? (
        <TodoList todos={todos} removeTodo={removeTodo} />
      ) : (
        <div>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div>
              {posts.map((post) => (
                <div key={post.id} className="post">
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
