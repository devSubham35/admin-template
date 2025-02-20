import React from 'react'
import DashboardLayout from './DashboardLayout'

const MainIndex = ({ children }: any) => {
    return (
        <>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </>
    )
}

export default MainIndex