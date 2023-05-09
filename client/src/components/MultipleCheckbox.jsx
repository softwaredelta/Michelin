import { Checkbox } from 'flowbite-react'

const MultipleCheckbox = ({ idElement, myValue, myOnChange, myName }) => {
  return (
    <div className='flex flex-row mb-1'>
      <div className='flex flex-col mx-2'>
        <Checkbox
          key={idElement}
          id={idElement}
          className='scale-110 accent-blues-150 dark:!text-white'
          uncheckedvalue={0}
          value={myValue}
          defaultChecked={myValue}
          onChange={myOnChange}
        />
      </div>
      <div className='flex flex-col text-sm align-text-top dark:!text-white'>
        {myName}
      </div>
    </div>
  )
}

export default MultipleCheckbox
