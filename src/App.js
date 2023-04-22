import React, { useEffect, useState } from 'react'

import PostList from './components/PostList'
import PostForm from './components/PostForm'
import PostFilter from './components/PostFolter'
import Modal from './components/UI/modal/Modal'
import Button from './components/UI/button/Button'
import Loader from './components/UI/loader/Loader'

import { usePosts } from './hooks/usePosts'
import { useFetching } from './hooks/useFetching'
import PostService from './api/PostServive'
import { getPagesArray, getPagesCount } from './utils/pages'

import './styles/App.css'
import Pagination from './components/UI/pagination/Pagination'

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = ({ id }) => {
    setPosts(posts.filter((p) => p.id !== id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  return (
    <div className='App'>
      <Button style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Создать пост
      </Button>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </Modal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {isPostsLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Loader />
        </div>
      ) : (
        <PostList remove={removePost} title='Список постов' posts={sortedAndSearchedPosts} />
      )}
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  )
}

export default App
