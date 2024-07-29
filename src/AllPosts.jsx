import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context";
import { listPost, deletePost } from "./api";
import { baseUrl } from "./api";

const AllPosts = () => {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    if (auth.accessToken) {
      listPost({ auth })
        .then(response => {
          console.log('GET Posts:', response);
          setPosts(response.data);
        })
        .catch(error => console.log('ERROR', error));
    }
  }, [auth.accessToken]);

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleDelete = (postId) => {
    deletePost({ auth, postId })
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(error => console.log('ERROR', error));
  };

  return (
    <div className="mt-5">
      {posts.length > 0 ? (
        <ul className="list-unstyled">
          {posts.map(post => (
            <li key={post.id} className="mb-4">
              <h4>{post.title}</h4>
              <h5>User post: {post.user.username}</h5>
              <img
                src={`${baseUrl}${post.image.image}`}
                style={{ width: '30%' }}
                alt={post.title}
                className="img-fluid"
              />
              <p>{post.text}</p>
              <p>Created: {new Date(post.created_at).toLocaleString()}</p>
              <button
                className="btn btn-primary me-2"
                onClick={() => handleEdit(post)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default AllPosts;
