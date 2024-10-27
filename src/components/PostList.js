// components/PostList.js
import React from "react";
import "./PostList.css";

const PostList = () => {
  const posts = [
    { id: 1, title: "React is amazing!" },
    { id: 2, title: "Learning new concepts" },
    { id: 3, title: "Hooks are awesome" },
  ];

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          {post.title}
        </div>
      ))}
    </div>
  );
};

export default PostList;
