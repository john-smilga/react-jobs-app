import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/appContext';
import FormRow from '../components/FormRow';
import Navbar from '../components/Navbar';
import Jobs from '../components/Jobs';
function Dashboard() {
  const [values, setValues] = useState({ company: '', position: '' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { isLoading, showAlert, fetchJobs, createJob } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, position } = values;
    if (company && position) {
      createJob(values);
      setValues({ company: '', position: '' });
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <>
      <Navbar />
      <Wrapper className='page'>
        <form className='job-form' onSubmit={handleSubmit}>
          {/* company */}
          <FormRow
            type='name'
            name='company'
            value={values.company}
            handleChange={handleChange}
            horizontal
            placeholder='Company'
          />

          {/* position */}
          <FormRow
            type='name'
            name='position'
            value={values.position}
            handleChange={handleChange}
            horizontal
            placeholder='Position'
          />

          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'Adding New Job...' : 'Add Job'}
          </button>
        </form>
        {showAlert && (
          <div className='alert alert-danger'>
            there was an error, please try again
          </div>
        )}
        <Jobs />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  .job-form {
    background: var(--white);
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    column-gap: 2rem;
    align-items: center;
    margin-bottom: 3rem;
    margin-top: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;
    .form-input {
      background: transparent;
      border-color: var(--grey-200);
      padding: 0.75rem;
    }

    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .btn {
      height: 100%;
      padding: 0 1.5rem;
    }
  }
  .alert {
    max-width: var(--max-width);
    margin-top: -1.5rem;
    margin-bottom: 3rem;
  }
`;

export default Dashboard;
