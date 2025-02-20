import SideBar from "@/components/SideBar"

const DashboardLayout = ({ children }: any) => {

    return (
        <div className='w-full h-screen overflow-hidden bg-[#171821] flex'>

            <SideBar />

            <div className='w-full h-full p-3'>
                <div className='rounded-xl w-full h-full'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout