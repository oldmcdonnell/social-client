import React, { useState, useEffect, useContext} from "react";
import { getImages, createPost } from "./api"; // Ensure you have createPost in your API file
import { AuthContext } from "./context";

const CreatePost = () => {
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(""); // Handle image as an ID
    const [images, setImages] = useState([]); // State to hold user-uploaded images

    useEffect(() => {
        // Fetch user-uploaded images on component mount
        fetchImages();
    }, []);

    const fetchImages = () => {
        getImages()
            .then(response => setImages(response.data))
            .catch(error => console.log('Error fetching images', error));
    };

    const submit = () => {
        createPost({
            auth,
            title,
            text,
            attached_image: image 
        })
        .then(response => {
            console.log('Create post response', response);
            setText("");
            setTitle("");
            setImage("");
        })
        .catch(error => console.log('Create post error', error));
    };

    return (
        <div>
            <h4>
                <input
                    type="text"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    placeholder="Enter title"
                />
                <input
                    type="text"
                    onChange={e => setText(e.target.value)}
                    value={text}
                    placeholder="Enter text"
                />
                <select onChange={e => setImage(e.target.value)} 
                value={image}>
                    <option value="">Select an image</option>
                    {images.map(img => (
                        <option key={img.id} 
                        value={img.id}>
                            {img.title}
                            </option>
                    ))}
                </select>
            </h4>
            <button onClick={submit}>
                Submit
            </button>
        </div>
    );
};

export default CreatePost;