import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/login'
import NewBlog from './components/newBlog'
import Notification from './components/Notification'
import Togglable from './components/togglable'
// import { set } from 'mongoose'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [blogs, setBlogs] = useState(sortedBlogs)
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')

    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.userToken)
    }
  }, [])

  const getBlogs = () => {
   return blogService.getAll().then(blogs =>
      setBlogs(() =>  blogs.sort((a, b) => b.likes - a.likes) )
    ).catch((error) => {
      setNotification(error.response.data.error)
      if(error.response.data.error){
        handleLogout()
      }
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }) 
  }
  
  useEffect(getBlogs, [])

  // const sortedBlogs = all


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
        <div>
          <h5>This is a blog list app. Login to continue.</h5>
          <Togglable buttonLabel='Login'>
            <Login 
              setUser={setUser}
              setNotification={setNotification}
              getBlogs={getBlogs}
            /> 
          </Togglable>
        </div>
        : 
        <div>
          <Togglable buttonLabel='Add New Blog' ref={blogFormRef}>
            <NewBlog setNotification={setNotification} getBlogs={getBlogs} />
          </Togglable>

          {blogs.map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} getBlogs={getBlogs}/>)}
        </div>
      }
    </div>
  )
}

export default App