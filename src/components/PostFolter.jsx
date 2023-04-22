import React from 'react'

import Input from './UI/input/Input'
import Select from './UI/select/Select'

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <Input
        placeholder='поиск...'
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <Select
        defaultValue='Сортировка'
        value={filter.sort}
        onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
        options={[
          { value: 'title', name: 'по названию' },
          { value: 'body', name: 'по описанию' },
        ]}
      />
    </div>
  )
}

export default PostFilter
