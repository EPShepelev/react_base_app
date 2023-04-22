import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Button from '../button/Button'
import { AuthContext } from '../../../context'

const Navbar = () => {
  const { setIsAuth } = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    <div className='navbar'>
      <div className='navbarLinks'>
        <Link to='/about'>О сайте</Link>
        <Link to='/posts'>Посты</Link>
      </div>
      <Button onClick={logout}>Выйти</Button>
    </div>
  )
}

export default Navbar
