import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context";
import { listPost, deletePost } from "./api";

const AllPosts = () => {
    const { auth } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null)

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
    }

    const handleDelete = (postId) => {
        deletePost({ auth, postId })
        .then(() =>{
            setPosts(post.filter(post => post.It !== postId))
        })
    } 

    return (
        <div style={{ marginTop: 20 }}>
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