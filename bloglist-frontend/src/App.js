import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/login'
import NewBlog from './components/newBlog'
import Notification from './components/Notification'
// import { set } from 'mongoose'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')

    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.userToken)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogout = () =>{
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
  return (
    <div>
      <h2>blogs</h2>
       <Notification info={notification} />
      {user === null ? '' : <div>{user.name} is logged in <button onClick={handleLogout}>Logout</button></div>}
      {user === null ? 
        <Login 
          username={username}
          password={password}
          setUser={setUser}
          setUsername={setUsername}
          setPassword={setPassword}
          setNotification={setNotification}
        /> : 
        <div>
          <NewBlog setNotification={setNotification}/>
          {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
        </div>
      }
    </div>
  )
}

export default App