import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  reset,
  incrementByValue,
  decrementByValue,
} from './app/slices/counterSlice';

const App = () => {
  const [incrementValue, setIncrementValue] = useState('');
  const [decrementValue, setDecrementValue] = useState('');

  const count = useSelector(store => store.counter.count);
  const dispatch = useDispatch();

  const addValue = () => {
    const value = Number(incrementValue);

    isNaN(value) ? alert('Please enter a number') : dispatch(incrementByValue(value));

    setIncrementValue('');
  };

  const subtractValue = () => {
    const value = Number(decrementValue);

    isNaN(value) ? alert('Please enter a number') : dispatch(decrementByValue(value));

    setDecrementValue('');
  };

  return (
    <main className='h-screen flex flex-col items-center justify-center gap-7'>
      <h1 className='text-3xl'>Counter : {count}</h1>

      <div className='space-x-5'>
        <button
          className='border border-gray-500 px-3 py-1 rounded'
          onClick={() => dispatch(decrement())}
        >
          Decrease
        </button>

        <button
          className='border border-gray-500 px-3 py-1 rounded'
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>

        <button
          className='border border-gray-500 px-3 py-1 rounded'
          onClick={() => dispatch(increment())}
        >
          Increase
        </button>
      </div>

      <div className='space-y-4'>
        <div className='space-x-3'>
          <input
            className='w-72 border border-gray-500 px-3 py-2 rounded focus:outline-none placeholder:text-gray-500'
            type='text'
            name='valueToAdd'
            placeholder='Enter a value to add'
            value={incrementValue}
            onChange={e => setIncrementValue(e.target.value)}
          />

          <button
            className='w-24 border border-gray-500 py-2 rounded'
            onClick={addValue}
            disabled={incrementValue.trim() === ''}
          >
            Add
          </button>
        </div>

        <div className='space-x-3'>
          <input
            className='w-72 border border-gray-500 px-3 py-2 rounded focus:outline-none placeholder:text-gray-500'
            type='text'
            name='valueToSubtract'
            placeholder='Enter a value to subtract'
            value={decrementValue}
            onChange={e => setDecrementValue(e.target.value)}
          />

          <button
            className='w-24 border border-gray-500 py-2 rounded'
            onClick={subtractValue}
            disabled={decrementValue.trim() === ''}
          >
            Subtract
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
