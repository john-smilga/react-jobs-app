import { useState, useEffect } from 'react'
import { useParams, Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../context/appContext'
import FormRow from '../components/FormRow'
function Update() {
  const { id } = useParams()
  const {
    showAlert,
    isLoading,
    editItem,
    fetchSingleJob,
    singleJobError: error,
    user,
    editJob,
    editComplete,
  } = useGlobalContext()

  const [values, setValues] = useState({
    company: '',
    position: '',
    status: '',
  })

  useEffect(() => {
    fetchSingleJob(id)
  }, [id])

  useEffect(() => {
    if (editItem) {
      const { company, position, status } = editItem
      setValues({ company, position, status })
    }
  }, [editItem])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { company, position, status } = values
    if (company && position) {
      editJob(id, { company, position, status })
    }
  }
  console.log(editItem)
  if (isLoading && !editItem) {
    return <div className='loading'></div>
  }

  if (!editItem || error) {
    return (
      <ErrorContainer className='page'>
        <h5>There was an error, please double check your job ID</h5>

        <Link to='/dashboard' className='btn'>
          dasboard
        </Link>
      </ErrorContainer>
    )
  }
  return (
    <>
      {!user && <Redirect to='/' />}
      <Container className='page'>
        <header>
          <Link to='/dashboard' className='btn'>
            dasboard
          </Link>
        </header>
        {showAlert && (
          <div className='alert alert-danger'>
            there was an error, please try again
          </div>
        )}
        <form className='form' onSubmit={handleSubmit}>
          <p>{editComplete && 'Success! Edit Complete'}</p>
          <h4>Update Job</h4>
          {/* company */}
          <FormRow
            type='name'
            name='company'
            value={values.company}
            handleChange={handleChange}
          />
          <FormRow
            type='name'
            name='position'
            value={values.position}
            handleChange={handleChange}
          />
          <div className='form-row'>
            <label htmlFor='status' className='form-label'>
              Status
            </label>
            <select
              name='status'
              value={values.status}
              onChange={handleChange}
              className='status'
            >
              <option value='pending'>pending</option>
              <option value='interview'>interview</option>
              <option value='declined'>declined</option>
            </select>
          </div>
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Editing...' : 'Edit'}
          </button>
        </form>
      </Container>
    </>
  )
}
const ErrorContainer = styled.section`
  text-align: center;
  padding-top: 6rem; ;
`

const Container = styled.section`
  header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .form h4 {
    text-align: center;
  }
  .form > p {
    text-align: center;
    color: var(--green-dark);
    letter-spacing: var(--letterSpacing);
    margin-top: 0;
  }
  .status {
    background: var(--grey-100);
    border-radius: var(--borderRadius);
    border-color: transparent;
    padding: 0.25rem;
  }
`
export default Update
