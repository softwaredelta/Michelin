import { Footer } from 'flowbite-react'
import { FooterCopyright } from 'flowbite-react/lib/esm/components/Footer/FooterCopyright'

const ModifiedFooter = () => {
  const content = (
    <Footer className='py-8 mt-3 border-t-2 lg:px-5 dark:!bg-stone-950 dark:!border-stone-800 rounded-none sticky top-[100vh]'>
      <FooterCopyright href='#' by='ITESM™' year={2023} />
    </Footer>
  )
  return content
}

export default ModifiedFooter
