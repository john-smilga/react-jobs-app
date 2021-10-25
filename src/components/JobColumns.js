import React from 'react';
import styled from 'styled-components';

const JobColumns = () => {
  return (
    <Wrapper>
      <span>company</span>
      <span>position</span>
      <span>date</span>
      <span>status</span>
      <span>action</span>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--grey-200);
  color: var(--grey-500);
  border-top-left-radius: var(--borderRadius);
  border-top-right-radius: var(--borderRadius);
  display: grid;
  grid-template-columns: 1fr 1fr 200px 75px 75px;
  align-items: center;
  padding: 1rem 1.5rem;
  column-gap: 1rem;
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  font-size: 0.875rem;
  span:last-child {
    text-align: center;
    margin-left: 0.15rem;
  }
`;

export default JobColumns;
