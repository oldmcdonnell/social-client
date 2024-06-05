import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./context"
import { getImages } from "./api"

const Images = () => {
    const [images, setImages] = useState([])
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        if(auth.accessToken) {
            getImages({ auth })
            .then(response => {
                console.log('GET images:', response)
                console.log('acessToken is ', accessToken)
                setImages(response.data) // Assuming response.data contains the array of images
            })
            .catch(error => console.log('ERROR', error))
        }
    }, [auth.accessToken])

    return(
        <div style={{ marginTop: 20 }}>
            {images.length > 0 ? (
                <ul>
                    {images.map(image => (
                        <li key={image.id}>
                            <h4>{image.title}</h4>
                            <img 
                                src={`http://127.0.0.1:8000${image.image}`} 
                                style={{ width: '30%' }} 
                                alt={image.title} 
                            />
                            <p>{image.title}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No images available</p>
            )}
        </div>
    )
}

export default Images
