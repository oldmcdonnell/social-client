import axios from 'axios'

export const baseUrl = import.meta.env.VITE_BASE_URL;



export const getToken = ({ auth, username, password }) => {
  axios.post(`${baseUrl}/token/`, {
    username: username,
    password: password
  }).then(response => {
    console.log('RESPONSE: ', response)
    auth.setAccessToken(response.data.access)
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
  })
}

export const fetchUser = ({ auth }) => {
  axios({
    method: 'get',
    url: `${baseUrl}/profile/`, 
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  }).then(response => {
    console.log('PROFILE: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
    auth.setAccessToken(undefined)
  })
}

export const createUser = ({ username, password, firstName, lastName }) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/create-user/`, 
    data: {
      username,
      password: password,
      first_name: firstName,
      last_name: lastName
    }
  }).then(response => {
    console.log('CREATE USER: ', response);
    return { success: true, data: response.data };
  })
  .catch(error => {
    console.log('ERROR: ', error);
    return { success: false, error };
  });
};

export const getImages = ({ auth }) => {
  console.log('GET IMAGES: AUTH: ', auth.accessToken)
  return axios({
    method: 'GET',
    url: `${baseUrl}/get-images/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}


export const dropdownImages = ({ auth }) => {
  console.log('GET IMAGES: AUTH: ', auth.accessToken)
  return axios({
    method: 'GET',
    url: `${baseUrl}/get-images/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}

export const createImage = ({ title, image, auth }) => {
  console.log('CREATE IMAGE: AUTH: ', auth.accessToken)
  // checkAuth({ auth })
  return axios({
    method: 'POST',
    url: `${baseUrl}/create-image/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      image, 
      title,
    } 
  })
}


export const createPost = ({ title, image, auth, text }) => {
  // checkAuth({ auth })
  console.log("Checking auth and other stuff", auth)
  return axios({
    method: 'POST',
    url: `${baseUrl}/posts/create/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      image, 
      title,
      text,
    } 
  })
}

// export const listPost = ({title, text, image, user, created_at, auth}) => {
//   return axios({
//     method: 'GET',
//     url: `${baseUrl}/posts/create/`,
//     headers: {
//       Authorization: `Bearer ${auth.accessToken}`,
//       'Content-Type': 'multipart/form-data'
//     },
//     data: {
//       image, 
//       title,
//       text,
//       user,
//       created_at
//     } 
//   })
// }


export const listPost = ({ auth }) => {
  console.log('GET IMAGES: AUTH: ', auth.accessToken)
  return axios({
    method: 'GET',
    url: `${baseUrl}/get-posts/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}

export const listOwnPost = ({ auth }) => {
  console.log('GET IMAGES: AUTH: ', auth.accessToken)
  return axios({
    method: 'GET',
    url: `${baseUrl}/get-own-posts/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}

export const deletePost = ({ auth }) => {
  console.log('GET IMAGES: AUTH: ', auth.accessToken)
  return axios({
    method: 'DELETE',
    url: `${baseUrl}/posts/delete/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  }).then(response => {
    console.log('Deleted Post: ', response)
  })
  .catch(error => {
    console.log('ERROR deleting post: ', error)
  })
}

export const updatePost = ({ auth, postId, title, text, image }) => {
  return axios({
    method: 'PUT',
    url: `${baseUrl}/posts/update/${postId}/`, // Ensure postId is passed correctly here
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
    data: {
      image, 
      title,
      text,
    } 
  })
  .then(response => {
    console.log('Post Edit: ', response);
  })
  .catch(error => {
    console.log('ERROR with Edit: ', error);
  });
}