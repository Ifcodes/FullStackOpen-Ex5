import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const config = {
    headers: {Authorization : token}
  }

  const request = axios.get(baseUrl, config)
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

const update = async (id, obj) => {
  const response = await axios.put(`${baseUrl}/${id}`, obj)

  return response.data
}

const del = async (id) => {
  const config = {
    headers: {Authorization : token}
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}
const blogServices = {
  getAll,
  create,
  update,
  del,
  setToken,
}

export default blogServices