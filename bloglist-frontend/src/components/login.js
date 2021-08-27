import loginService from "../services/login"
import blogServices from "../services/blogs"

const Login = ({username, setUsername, password, setPassword, setUser, setNotification}) => {
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})
      console.log(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogServices.setToken(user.userToken)

      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`Login successful`)
      setTimeout(() => {
        setNotification(null)
      },5000)
    } catch (error) {
      console.log(error)
      setNotification('Wrong username or password') 
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        Username: 
        <input 
          type="text"
          value={username}
          name="username"
          onChange={({target})=> setUsername(target.value) }
        /> <br />
        Password: 
         <input 
          type="password"
          value={password}
          name="password"
          onChange={({target})=> setPassword(target.value) }
        /> <br />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login