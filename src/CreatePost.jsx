import React, { useState, useEffect, useContext} from "react";
import { getImages, createPost } from "./api"; 
import { AuthContext } from "./context";

const CreatePost = () => {
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [images, setImages] = useState([]); 

    useEffect(() => {
        if (auth.accessToken) {
          getImages({ auth })
            .then(response => {
                console.log('checking accesstoken  ', accessToken)
                console.log('GET IMAGES: RESPONSE: ', response)
                setImages(response.data)
            })
            .catch(error => console.log('ERROR: ', error))
        }
      }, [auth.accessToken])

    const submit = () => {
        createPost({
            auth,
            title,
            text,
            image
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