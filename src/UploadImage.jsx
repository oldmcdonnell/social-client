import { useContext, useState } from "react";
import { AuthContext, ImageContext } from "./context";
import { createImage, getImages } from "./api";

const UploadImage = () => {
    const { auth } = useContext(AuthContext);
    const { images, setImages } = useContext(ImageContext)
    const [image, setImage] = useState(undefined);
    const [title, setTitle] = useState('');

    const submit = () => {
        console.log('Auth in upload ', auth)
        createImage({
            auth,
            title,
            image
        })
            .then(response => {
                console.log('Upload image response', response);
                getImages({ auth })
                .then(res => setImages(res.data))
            })

            .catch(error => console.log('create image error', error));
    };

    return (
        <div>
            <h1>Upload Image</h1>
            <div>Image Title</div>
            <input
                onChange={e => setTitle(e.target.value)}
                value={title}
            />
            <div>
                <input
                    className="button"
                    accept="image/*"
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                />
            </div>
            <div>
                <button onClick={submit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default UploadImage;