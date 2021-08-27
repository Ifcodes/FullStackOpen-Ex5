import axios from 'axios'
const baseUrl = '/api/userLogin'

const login = async credential => {
  const response = await axios.post(baseUrl, credential)
  return response.data
}

const loginService = {
  login,
}
export default loginService