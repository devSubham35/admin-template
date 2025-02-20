/// Example of event emitter
import LeftHistoryContent from '@/components/History/LeftHistoryContent'
import RightHistoryContent from '@/components/History/RightHistoryContent'

const page = () => {
  return (
    <div className='flex justify-between w-full h-full text-gray-400'>
        <LeftHistoryContent />
        <RightHistoryContent />
    </div>
  )
}

export default page