import React, { useEffect, useRef, useState } from 'react'

import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFolter'
import Modal from '../components/UI/modal/Modal'
import Button from '../components/UI/button/Button'
import Loader from '../components/UI/loader/Loader'
import Pagination from '../components/UI/pagination/Pagination'

import { usePosts } from '../hooks/usePosts'
import { useFetching } from '../hooks/useFetching'
import PostService from '../api/PostServive'
import { getPagesCount } from '../utils/pages'
import { useObserver } from '../hooks/useObserver'
import Select from '../components/UI/select/Select'

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  // передача функции и условия в параметрах
  useObserver(lastElement, () => setPage(page + 1), page < totalPages, isPostsLoading)

  useEffect(() => {
    fetchPosts()
  }, [page, limit])

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
      <Select
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue='Кол-во элементов на странице'
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Показать все' },
        ]}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList remove={removePost} title='Список постов' posts={sortedAndSearchedPosts} />
      <div ref={lastElement} style={{ height: '10px' }}></div>
      {isPostsLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Loader />
        </div>
      )}
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  )
}

export default Posts
