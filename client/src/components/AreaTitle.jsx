import { TbCircleNumber1 } from 'react-icons/tb'

const AreaTitle = ({ myVar }) => {
  const content = (
    <>
      <div id={myVar} class='flex flex-row justify-start'>
        <div class='flex-col'>
          <TbCircleNumber1 className='stroke-blues-200' size={50} />
        </div>
        <div class='col my-2 justify-start'>
          <h1 className='text-blues-200 text-3xl text-center ml-10'> Estacionamiento </h1>
        </div>
      </div>
    </>
  )
  return content
}
export default AreaTitle
