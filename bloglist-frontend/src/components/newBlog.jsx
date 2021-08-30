import { useState } from "react"
import blogServices from "../services/blogs"

const NewBlog = ({setNotification, getBlogs}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (e) => {
    e.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
    }

    blogServices.create(blog).then(response => {
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification(`New blog ${title} added successully by ${author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }).catch((error) => {
      setNotification(error.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 5000) 
    })

    getBlogs()
  }
  return (
    <>
      <form onSubmit={addNewBlog}>
        Title:
        <input 
          type="text"
          value={title}
          name="title"
          onChange={({target}) => setTitle(target.value)}
        /> <br />
        Author:
        <input 
          type="text"
          value={author}
          name="author"
          onChange={({target}) => setAuthor(target.value)}
        /> <br />
        Url:
        <input 
          type="url"
          value={url}
          name="url"
          onChange={({target}) => setUrl(target.value)}
        /> <br />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default NewBlog