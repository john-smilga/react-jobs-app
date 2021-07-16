import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useGlobalContext } from '../context/appContext'
import FormRow from '../components/FormRow'
import Jobs from '../components/Jobs'
function Dashboard() {
  const [values, setValues] = useState({ company: '', position: '' })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const { isLoading, showAlert, fetchJobs, createJob } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const { company, position } = values
    if (company && position) {
      createJob(values)
      setValues({ company: '', position: '' })
    }
  }
  useEffect(() => {
    fetchJobs()
  }, [])
  return (
    <Wrapper className='page'>
      {showAlert && (
        <div className='alert alert-danger'>
          there was an error, please try again
        </div>
      )}
      <form className='form job-form' onSubmit={handleSubmit}>
        <h4>New Job</h4>
        {/* company */}
        <FormRow
          type='name'
          name='company'
          value={values.company}
          handleChange={handleChange}
        />

        {/* position */}
        <FormRow
          type='name'
          name='position'
          value={values.position}
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'Adding New Job...' : 'Submit'}
        </button>
      </form>
      <Jobs />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .form h4 {
    text-align: center;
  }
  .form {
    margin-bottom: 5rem;
  }
`

export default Dashboard
