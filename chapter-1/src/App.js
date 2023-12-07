import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  reset,
  incrementByValue,
  decrementByValue,
  incrementValueAsync,
  decrementValueAsync,
} from './app/slices/counterSlice';

const App = () => {
  const [incrementValue, setIncrementValue] = useState('');
  const [decrementValue, setDecrementValue] = useState('');

  // value of store.getState() is passed as an argument to selector function
  const count = useSelector(state => state.counter.value);

  // function returned by useDispatch hook is same as store.dispatch
  const dispatch = useDispatch();

  const addValue = mode => {
    const value = Number(incrementValue);

    if (isNaN(value)) {
      return alert('Please enter a number');
    }

    mode === 'async' ? dispatch(incrementValueAsync(value)) : dispatch(incrementByValue(value));
  };

  const subtractValue = mode => {
    const value = Number(decrementValue);

    if (isNaN(value)) {
      return alert('Please enter a number');
    }

    mode === 'async' ? dispatch(decrementValueAsync(value)) : dispatch(decrementByValue(value));
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
            mode='text'
            placeholder='Enter a value to add'
            value={incrementValue}
            onChange={e => setIncrementValue(e.target.value)}
          />

          <button
            className='w-24 border border-gray-500 py-2 rounded'
            disabled={incrementValue.trim() === ''}
            onClick={addValue}
          >
            Add
          </button>

          <button
            className='w-36 border border-gray-500 py-2 rounded'
            disabled={incrementValue.trim() === ''}
            onClick={() => addValue('async')}
          >
            Add Async
          </button>
        </div>

        <div className='space-x-3'>
          <input
            className='w-72 border border-gray-500 px-3 py-2 rounded focus:outline-none placeholder:text-gray-500'
            mode='text'
            placeholder='Enter a value to subtract'
            value={decrementValue}
            onChange={e => setDecrementValue(e.target.value)}
          />

          <button
            className='w-24 border border-gray-500 py-2 rounded'
            disabled={decrementValue.trim() === ''}
            onClick={subtractValue}
          >
            Subtract
          </button>

          <button
            className='w-36 border border-gray-500 py-2 rounded'
            disabled={decrementValue.trim() === ''}
            onClick={() => subtractValue('async')}
          >
            Subtract Async
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
