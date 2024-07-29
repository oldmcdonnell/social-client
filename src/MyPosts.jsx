import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "./context";
import { deletePost,listOwnPost } from "./api";
import EditPost from "./EditPost";
import CreatePost from "./CreatePost";
import { baseUrl } from "./api";

const MyPosts = () => {
    const { auth } = useContext(AuthContext);
    const {user, setUser} = useContext(UserContext)
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        if (auth.accessToken) {
            listOwnPost({ auth })
                .then(response => {
                    console.log('GET Posts:', response);
                    setPosts(response.data);
                    setUser(response.data.user)
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
        listOwnPost({ auth })
            .then(response => setPosts(response.data))
            .catch(error => console.log('Error reloading posts after edit:', error));
    };

    return (
        <div style={{ marginTop: 20 }}>
            <CreatePost />

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
                                src={`${baseUrl}${post.image.image}`}
                                style={{ width: '30%' }}
                                alt={post.title}
                            />
                            <p>{post.text}</p>
                            <p>Created: {post.created_at}</p>
                            <button onClick={() => handleEdit(post)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
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