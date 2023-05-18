import { Footer } from 'flowbite-react'
import { FooterCopyright } from 'flowbite-react/lib/esm/components/Footer/FooterCopyright'

const ModifiedFooter = () => {
  const content = (
    <Footer className='py-8 border-t-2 rounded-none py-5 sticky top-[100vh]'>
      <FooterCopyright href='#' by='ITESM™' year={2023} />
    </Footer>
  )
  return content
}

export default ModifiedFooter
