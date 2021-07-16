import { Link } from 'react-router-dom'
import styled from 'styled-components'
import main from '../assets/main.svg'
import { useGlobalContext } from '../context/appContext'
import { Redirect } from 'react-router-dom'
function Home() {
  const { user } = useGlobalContext()

  return (
    <>
      {user && <Redirect to='/dashboard' />}
      <Wrapper className='page'>
        <div className='info'>
          <h1>
            jobs<span>App</span>
          </h1>
          <p>
            I'm baby viral enamel pin chartreuse cliche retro af selfies kinfolk
            photo booth plaid jianbing actually squid 3 wolf moon lumbersexual.
            Hell of humblebrag gluten-free lo-fi man braid leggings.
          </p>
          <p>
            Cloud bread kale chips wayfarers deep v chicharrones leggings
            fingerstache actually blog cliche four dollar toast. Sriracha ugh
            kickstarter, next level la croix butcher lomo.
          </p>

          <Link to='/register' className='btn'>
            Login
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  h1 span {
    color: var(--primary-500);
    font-weight: 700;
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 6rem;
    .main-img {
      display: block;
    }
  }
`

export default Home
