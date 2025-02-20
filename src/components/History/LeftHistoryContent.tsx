'use client';
import eventEmitter from '@/services/event.emitter';
import React, { useState } from 'react';

const LeftHistoryContent = () => {

  const [payload, setPayload] = useState({
    name: '',
    email: '',
  });

  const handleOnTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
    eventEmitter.emit('history-text', { [name]: value });
  };

  return (
    <div className='w-1/2 h-full bg-gray-950 p-10'>
      <h1 className='text-xl'>Form</h1>
      <div className='w-fit mt-3 flex flex-col gap-2'>
        <div className='flex flex-col gap-1'>
          <label className='text-white' htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={payload.name}
            placeholder='Enter your name'
            onChange={handleOnTextChange}
            className='py-2 px-4 rounded-md border-[1px] bg-transparent text-white focus:outline-none'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-white' htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={payload.email}
            placeholder='Enter your email'
            onChange={handleOnTextChange}
            className='py-2 px-4 rounded-md border-[1px] bg-transparent text-white focus:outline-none'
          />
        </div>
      </div>

    </div>
  );
};

export default LeftHistoryContent;
