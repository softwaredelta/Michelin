// import Wrapper from './Wrapper'

import ModifiedFooter from "./ModifiedFooter"
import NavBar from "./NavBar"

const Public = () => {
  return (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-ful h-screen flex flex-col items-center'>
          <div className='container flex flex-wrap justify-items-stretch'>
          </div>
          <ModifiedFooter />
        </div>
      </div>
    </>
  )
}
export default Public
