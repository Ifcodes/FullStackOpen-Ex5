import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import Blog from './Blog'
import NewBlog from './newBlog'

test('renders blog title', () => {
  //author is included in the togglable div
  const blog = {
    title: 'New blog',
    author: 'James'
  }

  const comp = render(
    <Blog blog={blog}/>
  )

  expect(comp.container).toHaveTextContent(
    'New blog'
  )

  const div = comp.container.querySelector('.togglable')
  expect(div).toHaveStyle('display: none')
})

test('renders togglable content on click of button', () => {
  const blog = {
    title: 'New blog',
    author: 'James'
  }

  const comp = render(
    <Blog blog={blog}/>
  )
  
  const button = comp.getByText('view')
  fireEvent.click(button)

  const div = comp.container.querySelector('.togglable')
  expect(div).not.toHaveStyle('display: none')

  const closeBtn = comp.getByText('hide')
  fireEvent.click(closeBtn)

  expect(div).toHaveStyle('display: none')
})

test('event handler is called twice when like button is clicked twice', () => {
  
  const blog = {
    title: 'New blog',
    author: 'James'
  }

  const mockHandler = jest.fn()

  const comp = render(
    <Blog blog={blog} getBlogs={mockHandler}/>
  )
  
  const button = comp.getByText('Like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

//testing new blogs added

test('<NewBlog /> calls onSubmit with the right details', () => {
  const newBlog = jest.fn()


  const comp = render(
    <NewBlog createBlog={newBlog}/>
  )

  const title = comp.container.querySelector('#title')
  const form = comp.container.querySelector('form')

  fireEvent.change(title, {
    target: {value: 'New Blog'}
  })
  fireEvent.submit(form)

  expect(newBlog.mock.calls).toHaveLength(1)
  expect(newBlog.mock.calls[0][0].title).toBe('New Blog')
})