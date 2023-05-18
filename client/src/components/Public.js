
import ModifiedFooter from './ModifiedFooter'
import NavBar from './NavBar'

const Public = () => {
  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-ful h-screen flex flex-col items-center'>
          <div className='container flex flex-wrap justify-items-stretch' />
          <ModifiedFooter />
        </div>
      </div>
    </>
  )
  return content
}
export default Public
