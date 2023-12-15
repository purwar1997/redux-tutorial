const Spinner = ({ text }) => {
  return (
    <div className='flex flex-col items-center gap-8'>
      <h2 className='text-2xl'>{text}</h2>

      <div className='w-12 h-12 rounded-full bg-white border-solid border-2 border-purple-600 border-t-white animate-spin' />
    </div>
  );
};

export default Spinner;
