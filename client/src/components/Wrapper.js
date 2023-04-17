import ModifiedFooter from './ModifiedFooter'
import NavBar from './NavBar'
import SPCard from './SPCard'

const Wrapper = () => {
  return (
    <div>
      <NavBar />
      <div className='pt-20 w-ful h-screen flex flex-col items-center'>

        <div className='container flex flex-wrap justify-items-stretch'>
          <SPCard
            name='Juriquilla'
            zone='Querétaro'
            address='Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum'
            phone='000 000 0000'
          />
          <SPCard
            name='Juriquilla'
            zone='Querétaro'
            address='Lorem ipsum'
            phone='000 000 0000'
          />
          <SPCard
            name='Juriquilla'
            zone='Querétaro'
            address='Lorem ipsum'
            phone='000 000 0000'
          />
          <SPCard
            name='Juriquilla'
            zone='Querétaro'
            address='Lorem ipsum'
            phone='000 000 0000'
          />
          <SPCard
            name='Juriquilla'
            zone='Querétaro'
            address='Lorem ipsum'
            phone='000 000 0000'
          />
          <SPCard
            name='Juriquilla'
            zone='Querétaro'
            address='Lorem ipsum'
            phone='000 000 0000'
          />
        </div>
        <ModifiedFooter />
      </div>
    </div>
  )
}

export default Wrapper
