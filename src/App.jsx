import Images from "./Images"
import UploadImage from "./UploadImage"
import CreatePost from "./CreatePost.jsx"
import Logout from "./Logout.jsx"

function App() {

  return (
    <div className="p-5">
      
    <UploadImage />
    <Images />
    <CreatePost />
    <Logout />
    </div>
  )
}

export default App
