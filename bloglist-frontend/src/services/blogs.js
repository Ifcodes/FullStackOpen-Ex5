import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (obj) => {
  console.log(token)
  const config = {
    headers: {Authorization : token}
  }
  
  const response = await axios.post(baseUrl, obj, config)
  return response.data
}
const blogServices = {
  getAll,
  create,
  setToken,
}

export default blogServices