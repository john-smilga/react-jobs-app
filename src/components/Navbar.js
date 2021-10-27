import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';

import { useGlobalContext } from '../context/appContext';

const Navbar = () => {
  const { user, logout } = useGlobalContext();
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
  );
};

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: var(--fluid-width);
  }
  img {
    display: block;
    margin: 0 auto;
    margin-top: 1rem;
  }
  .nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
  .nav-links h5 {
    margin: 0;
    margin-right: 2rem;
  }
  @media (min-width: 576px) {
    height: 6rem;

    .nav-center {
      max-width: var(--max-width);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    .nav-links {
      margin-top: 0;
    }
    img {
      margin-top: 0;
      margin-left: 0;
    }
  }
`;

export default Navbar;
