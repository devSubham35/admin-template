import React from 'react'

const LayoutMerger = ({ children }: any) => {
  return (
    <div className='w-full h-full flex flex-col justify-between gap-3 border-4 overflow-y-scroll'>
        {children}
    </div>
  )
}

export default LayoutMerger