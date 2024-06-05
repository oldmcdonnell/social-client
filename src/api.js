import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"


const checkAuth = ({ auth }) =>{
  if (auth.accessToken = undefined){
    let tempToken = JSON.parse(localStorage.getItem('token'))
    auth.setAccessToken(tempToken)
  }
  else {
    console.log('auth exists')
  }

}
export const getToken = ({ auth, username, password }) => {
  axios.post(`${baseUrl}/token/`, {
    username: username,
    password: password
  }).then(response => {
    console.log('RESPONSE: ', response)
    auth.setAccessToken(response.data.access)
    console.log('Test in getToken : ', response.data.access)
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
  axios({
    method: 'post',
    url: `${baseUrl}/create-user/`, 
    data: {
      username,
      password: password,
      first_name: firstName,
      last_name: lastName
    }
  }).then(response => {
    console.log('CREATE USER: ', response)
  })
  .catch(error => {
    console.log('ERROR: ', error)
  })
}

export const getImages = ({ auth }) => {
  checkAuth({ auth })
  return axios({
    method: 'GET',
    url: `${baseUrl}/get-images/`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }
  })
}

export const createImage = ({ title, image, auth }) => {
  checkAuth({ auth })
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


export const createPost = ({ title, image, auth }) => {
  checkAuth({ auth })
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
    } 
  })
}