import React from 'react'

import Button from './UI/button/Button'

const PostItem = React.forwardRef(({ post, remove }, ref) => {
  return (
    <div ref={ref} className='post'>
      <div className='post__content'>
        <h2 className='post__title'>
          {post.id}. {post.title}
        </h2>
        <div>{post.body}</div>
      </div>
      <div className='post__btns'>
        <Button onClick={() => remove(post)}>Удалить</Button>
      </div>
    </div>
  )
})

export default PostItem
