import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import SellingPoint from './SellingPoint'
import { useGetSPQuery } from './sellingPointApiSlice'

const SellingPointList = () => {
  const {
    data: sp,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSPQuery()

  let content
  if (isLoading) content = <p>Loading...</p>
  if (isError) {
    content = <p>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = sp
    const listContent = ids?.length
      ? ids.map(idSP => <SellingPoint key={idSP} spId={idSP} />)
      : null
    content = (
      <div>
        <NavBar />
        <div className='pt-20 w-ful h-screen flex flex-col items-center'>

          <div className='container flex flex-wrap justify-items-stretch'>
            {listContent}
          </div>
          <ModifiedFooter />
        </div>
      </div>
    )
  }
  return content
}

export default SellingPointList
