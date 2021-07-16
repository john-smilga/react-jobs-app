import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/appContext'
import { Redirect } from 'react-router-dom'
import FormRow from '../components/FormRow'
function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    isMember: true,
  })

  const { user, register, login, isLoading, showAlert } = useGlobalContext()
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values

    if (isMember) {
      login({ email, password })
    } else {
      register({ name, email, password })
    }
  }

  return (
    <>
      {user && <Redirect to='/dashboard' />}
      <Wrapper className='page'>
        {showAlert && (
          <div className='alert alert-danger'>
            there was an error, please try again
          </div>
        )}
        <form className='form' onSubmit={onSubmit}>
          <h4>{values.isMember ? 'Login' : 'Register'}</h4>
          {/* name field */}
          {!values.isMember && (
            <FormRow
              type='name'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
          )}

          {/* single form row */}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          {/* single form row */}
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Fetching User...' : 'Submit'}
          </button>
          <p>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}

            <button type='button' onClick={toggleMember} className='member-btn'>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
`

export default Register
