'use client';
import React, { useState } from 'react';
import useEventEmitter from '@/hooks/utils/useEventEmitter';

const RightHistoryContent = () => {
  const [payload, setPayload] = useState({
    name: '',
    email: '',
  });

  useEventEmitter('history-text', (data: { name: string; email: string }) => {
    setPayload((prev) => ({
      ...prev,
      ...data,
    }));
  });

  console.log(payload, "++66")

  return (
    <div className='w-1/2 h-full bg-gray-900 p-10 text-white'>
      <h1 className='text-xl'>Result</h1>
      <div className='w-fit mt-3 flex flex-col gap-2'>
        {payload.name && (
          <h2 className="text-lg font-medium">Hello, {payload.name}!</h2>
        )}
        {payload.email && (
          <p className="text-sm text-gray-300">
            We have your email recorded as <span className="font-semibold">{payload.email}</span>.
          </p>
        )}
      </div>
    </div>
  );
};

export default RightHistoryContent;
