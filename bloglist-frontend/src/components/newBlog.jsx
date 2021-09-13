import { useState } from "react"
// import blogServices from "../services/blogs"

const NewBlog = ({setNotification, createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (e) => {
    e.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    
}
  return (
    <>
      <form onSubmit={addNewBlog}>
        Title:
        <input 
          id='title'
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