import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useFetching } from '../hooks/useFetching'
import PostService from '../api/PostServive'
import Loader from '../components/UI/loader/Loader'

const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  })
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(params.id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById()
    fetchComments()
  }, [])
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>
            {post.id}. {post.title}
          </h2>
          <div>{post.body}</div>
          <h3>Комментарии:</h3>
          {isCommentsLoading ? <Loader /> : <div></div>}
          {comments.map((comment) => (
            <div key={comment.id} style={{ marginTop: '10px' }}>
              <h4>{comment.email}</h4>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostIdPage
