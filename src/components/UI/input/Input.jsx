import React from 'react'

import style from './Input.module.css'

const Input = (porps) => {
  return <input className={style.input} {...porps} />
}

export default Input
