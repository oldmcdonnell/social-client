import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "./context";
import { listPost, deletePost } from "./api";
import EditPost from "./EditPost";

const MyPosts = () => {
    const { auth } = useContext(AuthContext);
    const {user, setUser} = useContext(UserContext)
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
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost({ auth, postId })
                .then(() => {
                    setPosts(posts.filter(post => post.id !== postId));
                })
                .catch(error => console.log('Error deleting post:', error));
        }
    };

    const handleSaveEdit = () => {
        setEditingPost(null);
        // Reload posts after saving edit
        listPost({ auth })
            .then(response => setPosts(response.data))
            .catch(error => console.log('Error reloading posts after edit:', error));
    };

    return (
        <div style={{ marginTop: 20 }}>
            {editingPost && (
                <EditPost
                    post={editingPost}
                    auth={auth}
                    onCancel={() => setEditingPost(null)}
                    onSave={handleSaveEdit}
                />
            )}
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <h4>{post.title}</h4>
                            <h3>User post: {post.user.username}</h3>
                            <img
                                src={`http://127.0.0.1:8000${post.image.image}`}
                                style={{ width: '30%' }}
                                alt={post.title}
                            />
                            <p>{post.text}</p>
                            <p>Created: {post.created_at}</p>
                            {auth.user && post.user.username === auth.user.username && (
                                <>
                                    <button onClick={() => handleEdit(post)}>Edit</button>
                                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default MyPosts;