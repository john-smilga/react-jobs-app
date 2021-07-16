import { useGlobalContext } from '../context/appContext'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'
const Jobs = () => {
  const { jobs, isLoading, deleteJob } = useGlobalContext()
  if (isLoading) {
    return <div className='loading'></div>
  }
  if (jobs.length < 1) {
    return (
      <EmptyContainer>
        <h5>You have no jobs to display</h5>
      </EmptyContainer>
    )
  }

  return (
    <Container>
      {jobs.map((item) => {
        const { _id: id, company, position, status, createdAt } = item
        let date = moment(createdAt)
        date = date.format('MMMM Do YYYY')
        return (
          <article key={id} className='job'>
            <p className='job-date'>{date}</p>
            <h5>{position.toLowerCase()}</h5>
            <p className='job-company'>{company}</p>
            <div className='job-links'>
              <Link to={`/edit/${id}`} className='job-link'>
                edit
              </Link>
              <button
                className='job-link job-delete'
                type='button'
                onClick={() => deleteJob(id)}
              >
                delete
              </button>
              <p className='job-status'>{status}</p>
            </div>
          </article>
        )
      })}
    </Container>
  )
}
const EmptyContainer = styled.section`
  text-align: center;
  h5 {
    text-transform: none;
  }
`
const Container = styled.section`
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 5rem;
  .job {
    background: var(--white);
    border-radius: var(--borderRadius);
    padding: 2rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
  }
  .job:hover {
    box-shadow: var(--shadow-4);
    transform: scale(1.005);
  }

  .job h5 {
    margin-bottom: 0;
    text-transform: capitalize;
    letter-spacing: 0;
  }
  .job-date {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    background: red;
    font-size: var(--smallText);
    padding: 0.15rem 0.5rem;
    border-top-right-radius: var(--borderRadius);
    border-bottom-left-radius: var(--borderRadius);
    background: var(--primary-100);
    color: var(--primary-500);
  }
  .job-company {
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
    background: var(--grey-200);
    color: var(--grey-500);
    border-radius: var(--borderRadius);
    padding: 0.25rem 0.5rem;
    display: inline-block;
    line-height: 1;
    text-transform: lowercase;
    letter-spacing: 2px;
    align-self: flex-start;
  }
  .job-links {
    display: flex;
    align-items: center;
    margin-top: auto;
    font-size: 0.85rem;
  }
  .job-status {
    margin-left: auto;
    margin-bottom: 0;
    margin-top: 0;
    font-size: 0.85rem;
  }
  .job-link {
    background: transparent;
    border: transparent;
    text-transform: capitalize;
    color: var(--green-dark);
    cursor: pointer;
    transition: var(--transition);
    border-radius: var(--borderRadius);
    line-height: 1;
  }
  .job-link:hover {
    color: var(--primary-500);
  }
  .job-delete {
    margin-left: 1rem;
    color: var(--red-dark);
  }
  .job-status {
    color: var(--primary-500);
    text-transform: uppercase;
  }
  .job-status-declined {
    color: var(--red-dark);
  }
  .job-status-interview {
    color: var(--green-dark);
  }
`

export default Jobs
