import { useMemo, useState } from 'react'
import { useDebounce } from './hooks/useDebounce';

const options = [
  'Apple', 'Banana', 'Cherry', 'Date'
]

function DropDown() {
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value)

  const onChangeInput = (e) => {
    const { value } = e.target;
    setValue(value)
  }

  const onClear = () => {
    setValue('')
  }

  const filteredOptions = useMemo(() => {
    return options.filter(item => item.includes(debounceValue));
  }, [options, debounceValue]);


  const renderOptions = () => {
    return (
      filteredOptions.length ?
        filteredOptions.map((item) => {
          return (
            <div key={item}>
              <span>
                {item}
              </span>
            </div>
          )
        })
        :
        <span>No items match your search</span>)
  }

  return (
    <div className='wrapper'>
      <div className='content'>
        <section>
          <input
            type="text"
            value={value}
            onChange={onChangeInput}
            placeholder='search here ...'
          />
          <i onClick={onClear}>&times;</i>
        </section>
        <div>
          {renderOptions()}
        </div>
      </div>
    </div>
  )
}

export default DropDown