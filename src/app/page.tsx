import { ChartPage } from '@/components/ChartPage'
import { Pichart } from '@/components/PieChart'
import { ChartConfig } from '@/components/ui/chart'
import ContainerWrapper from '@/layout/wrapper/ContainerWrapper'
import HeaderWrapper from '@/layout/wrapper/HeaderWrapper'
import LayoutMerger from '@/layout/wrapper/LayoutMerger'

const data = [
  {
    title: "Monthy Budget",
    value: 10000,
    color: "text-blue-500"

  },
  {
    title: "Available balance",
    value: 3200,
    color: "text-blue-500"
  },
  {
    title: "Overall Expenses",
    value: 6800,
    color: "text-blue-500"
  },
  {
    title: "Travel Expenses",
    value: 2000,
    color: "text-green-500",
    expectedValue: 2500

  },
  {
    title: "Food Expenses",
    value: 1800,
    color: "text-green-500",
    expectedValue: 2000

  },
  {
    title: "Extra Expenses",
    value: 2500,
    color: "text-red-500",
    expectedValue: 3000
  },
]

const exampleData = [{ desktop: 50, mobile: 100 }]

const exampleConfig = {
  desktop: {
    label: "Desktop",
    color: "#818cf8",
  },
  mobile: {
    label: "Mobile",
    color: "#10b981",
  },
} satisfies ChartConfig




const page = () => {
  return (
      <div className='w-full flex flex-col gap-3'>

        <HeaderWrapper>
        </HeaderWrapper>

        <ContainerWrapper>
          <div className='w-full h-full grid grid-cols-3 gap-3'>
            {
              data?.map((item, index) => (
                <div key={index} className='bg-primary rounded-xl p-5 flex flex-col items-center justify-between w-full h-full'>
                  <div className='w-full flex justify-between'>
                    <div>
                      <p className={`text-gray-500 font-medium text-md 2xl:text-lg mb-1 whitespace-nowrap ${item?.color}`}>{item?.title}</p>
                      <h1 className='font-extrabold text-[40px] text-white leading-tight mb-8'>
                        <span className='text-[20px] mr-2'>₹</span>
                        {item?.value}
                      </h1>
                    </div>
                    {/* {item?.expectedValue &&
                      <div>
                        <p className={`font-medium text-md 2xl:text-lg mb-1 text-indigo-400 whitespace-nowrap`}>Expected Expences</p>
                        <h1 className='font-bold text-[20px] text-white leading-tight'>
                          <span className='text-[20px] mr-2 text-'>₹</span>
                          {item?.expectedValue}
                        </h1>
                      </div>
                    } */}
                  </div>
                  {item?.expectedValue &&
                    <div className='w-full h-full flex justify-center items-center'>
                      {/* <ChartPage budget={item?.expectedValue - item?.value} spent={item?.expectedValue} /> */}
                      {/* <Pichart /> */}
                    </div>
                  }
                </div>
              ))
            }
          </div>
        </ContainerWrapper>
      </div>
  )
}

export default page