import { useState } from "react"
import { updatePost, getImages } from "./api";

const EditPost = ({ post, onCancel, onSave }) => {
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState(post.text || "");
    const [title, setTitle] = useState(post.title || "");
    const [image, setImage] = useState(post.image.id || "");
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (auth.accessToken) {
            getImages({ auth })
            .then(response => {
                console.log('GET IMAGES: RESPONSE: ', response)
                setImages(response.data)
            })
            .catch(error => console.log('ERROR: ', error))
        }
      }, [auth.accessToken])

      const handleImageChange = (e) => {
        setImage(e.target.value)
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        if(auth.accessToken){
            updatePost({ auth, 
                postId: post.id, 
                title, 
                text, 
                image 
            })
            .then(response => {
                console.log('POST UPDATED:', response);
            })
            .catch(error => console.log('ERROR:', error));
        }
      }

    return(
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input 
                    type="text"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Text:</label>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div>
                    <label>Select Image:</label>
                    <select value={image} 
                    onChange={handleImageChange}>
                        {images.map(img => (
                            <option 
                            key={img.id} 
                            value={img.id}>
                                {img.title}
                                </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Update Post</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
            
        </div>
    )
}

export default EditPost