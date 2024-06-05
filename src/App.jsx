import React from 'react';
import Images from './Images';
import UploadImage from './UploadImage';
import CreatePost from './CreatePost';
import Logout from './Logout';
import Login from './Login'; // Assuming you have a Login component

function App() {
  return (
        <div className="p-5">
          <Images />
          <UploadImage />
          <CreatePost />
          <Logout />
        </div>
  );
}

export default App;