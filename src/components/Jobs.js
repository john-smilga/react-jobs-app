import { useGlobalContext } from '../context/appContext';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiEdit, FiDelete } from 'react-icons/fi';
import moment from 'moment';
import JobColumns from './JobColumns';

const Jobs = () => {
  const { jobs, isLoading, deleteJob } = useGlobalContext();
  if (isLoading) {
    return <div className='loading'></div>;
  }

  if (jobs.length < 1) {
    return (
      <EmptyContainer>
        <h5>
          Currently, you have no <span>JOBS </span>
          to display
        </h5>
      </EmptyContainer>
    );
  }

  return (
    <>
      <JobColumns />
      <Container>
        {jobs.map((item) => {
          const { _id: id, company, position, status, createdAt } = item;
          let date = moment(createdAt);
          date = date.format('MMMM Do, YYYY');
          return (
            <article key={id} className='job'>
              <span className='company'>{company}</span>
              <span className='position'>{position.toLowerCase()}</span>
              <span className='date'>{date}</span>
              <span className='status'>{status}</span>
              <div className='action-div'>
                <Link to={`/edit/${id}`} className='edit-btn' type='button'>
                  <FiEdit />
                </Link>
                <button
                  className=' delete-btn'
                  type='button'
                  onClick={() => deleteJob(id)}
                >
                  <FiDelete />
                </button>
              </div>
            </article>
          );
        })}
      </Container>
    </>
  );
};
const EmptyContainer = styled.section`
  text-align: center;
  h5 {
    text-transform: none;
  }
  span {
    color: var(--primary-500);
  }
`;
const Container = styled.section`
  background: var(--white);
  border-bottom-left-radius: var(--borderRadius);
  border-bottom-right-radius: var(--borderRadius);

  .job {
    border-bottom: 1px solid var(--grey-200);
    display: grid;
    grid-template-columns: 1fr 1fr 200px 75px auto;
    align-items: center;
    padding: 1rem 1.5rem;
    column-gap: 1rem;
  }
  .job:last-child {
    border-bottom: none;
  }
  span {
    font-size: 0.875rem;
  }
  .company,
  .position {
    text-transform: capitalize;
  }
  .date {
    font-weight: 400;
    color: var(--grey-500);

    font-size: 0.75rem;
  }
  .status {
    color: var(--grey-500);
    border: 1px solid var(--grey-500);
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    border-color: transparent;
    border-radius: var(--borderRadius);
    margin-right: 0.75rem;
    margin-left: 1.5rem;
    cursor: pointer;
    display: inline-block;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .status,
  .edit-btn,
  .delete-btn {
    padding: 0.15rem 0.5rem;
    font-size: 0.5rem;
  }
  .action-div {
    display: flex;
    align-items: center;
  }
`;

export default Jobs;
