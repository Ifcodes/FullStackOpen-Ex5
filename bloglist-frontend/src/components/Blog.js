import React, { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({blog, setBlogs, getBlogs}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const visibility = {display: visible ? '' : 'none'}

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const setMargin = {
    marginLeft: 5
  }

  const addLikes = (id) => {

    let increament ={
      likes: likes + 1
    } 

    blogServices.update(id, increament).then(res => {
      setLikes(res.likes)
      console.log(res)
    })

    getBlogs()

  }

  const deleteBlog = (id) => {

    if(window.confirm("Are you sure?")){
      
      blogServices.del(id).then(res => {
        console.log('deleted successfully')
      })
    }
    
    getBlogs()
  }

  return (
    <>
      <div style={blogStyle}>
        {blog.title} 

        <button onClick={() => setVisible(!visible)} style={setMargin}>
          {visible ? 'hide' : 'view'}
        </button>
        <div style={visibility} className='togglable'>
          Blog Link: {blog.url} <br />
          Likes: {likes} <button onClick={() => addLikes(blog.id)} className='likeBtn'>Like</button> <br />
          Posted by {blog.author} <br />
        </div>
        <button onClick={() => deleteBlog(blog.id)}>Delete</button>
      </div>  
    </>
  )
}

export default Blog