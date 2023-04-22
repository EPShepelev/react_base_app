import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from './UI/button/Button'

const PostItem = ({ post, remove }) => {
  const navigate = useNavigate()

  return (
    <div className='post'>
      <div className='post__content'>
        <h2 className='post__title'>
          {post.id}. {post.title}
        </h2>
        <div>{post.body}</div>
      </div>
      <div className='post__btns'>
        <Button onClick={() => navigate(`/posts/${post.id}`)}>Открыть</Button>
        <Button onClick={() => remove(post)}>Удалить</Button>
      </div>
    </div>
  )
}

export default PostItem
