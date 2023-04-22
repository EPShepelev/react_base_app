import React, { useContext } from 'react'
import Input from '../components/UI/input/Input'
import Button from '../components/UI/button/Button'

import { AuthContext } from '../context'

const Login = () => {
  const { setIsAuth } = useContext(AuthContext)

  const login = (event) => {
    event.preventDefault()
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }
  return (
    <div>
      <h1>Войти</h1>
      <form onSubmit={login}>
        <Input type='text' placeholder='Введите логин' />
        <Input type='password' placeholder='Введите пароль' />
        <Button>Войти</Button>
      </form>
    </div>
  )
}

export default Login
