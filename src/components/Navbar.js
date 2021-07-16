import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'

import { useGlobalContext } from '../context/appContext'

const Navbar = () => {
  const { user, logout } = useGlobalContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        <img src={logo} alt='jobs app' />
        {user && (
          <div className='nav-links'>
            <h5>hello, {user}</h5>
            <button className='btn' onClick={logout}>
              logout
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  background: var(--white);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: var(--fluid-width);
    max-width: var(--max-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-links h5 {
    margin: 0;
    margin-right: 2rem;
  }
`

export default Navbar
