import React, { useState } from 'react'

import Button from './UI/button/Button'
import Input from './UI/input/Input'

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' })

  const addNewPost = (e) => {
    e.preventDefault()
    create({ ...post, id: Date.now() })
    setPost({ title: '', body: '' })
  }

  return (
    <form>
      <Input
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type='text'
        placeholder='Название поста'
      />
      <Input
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type='text'
        placeholder='Описание поста'
      />
      <Button onClick={addNewPost}>Добавить</Button>
    </form>
  )
}

export default PostForm
