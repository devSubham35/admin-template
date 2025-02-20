import React from 'react'
import BreadCrumb from '@/components/BreadCrumb';

const HomePage = () => {

  const data = [
    { name: "Table", link: "/table", onClick: () => console.log("This is Table Page") },
    { name: "Profile", link: "", onClick: () => console.log("This is Dashboard Page") },
    { name: "User", link: "#user", onClick: () => console.log("This is User Page") },
  ];

  return (
    <div className="w-full h-screen p-20">
      <BreadCrumb data={data} title='Feature Page' />
    </div>
  )
}

export default HomePage