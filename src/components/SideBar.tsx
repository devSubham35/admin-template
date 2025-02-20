'use client'
import { MenuItemTypes, navData } from '@/Navdata';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BiMenu, BiLogOutCircle } from 'react-icons/bi';
import { MdOutlineMenuOpen } from 'react-icons/md';

const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current route
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
        <div className={`${isExpanded ? "w-[70px]" : "w-[250px]"} duration-500 transition-all
            overflow-hidden flex-shrink-0 h-full shadow-lg border-r-[2px]
              border-gray-100/10 bg-[#171821] p-3 flex flex-col justify-between`}>

            <div className='w-full flex flex-col justify-center items-center duration-500 transition-all'>
                <div className={`mb-4 flex items-center ${isExpanded ? "" : "justify-between w-full"}`}>
                    <h1 className={`text-xl overflow-hidden duration-500 transition-all text-indigo-500 font-bold ${isExpanded ? "w-0 translate-x-full" : "w-fit"}`}>Logo</h1>
                    <div 
                        onClick={() => setIsExpanded(prev => !prev)} 
                        className="w-8 h-8 rounded-md bg-[#21222d] flex justify-center items-center text-indigo-400 text-[20px] cursor-pointer duration-500 transition-all"
                    >
                        {isExpanded ? <BiMenu /> : <MdOutlineMenuOpen />}
                    </div>
                </div>

                <div className='w-full flex flex-col'>
                    {navData.map((item: MenuItemTypes, index: number) => {
                        const isSelected = pathname === item.url; // Check if the current route matches
                        return (
                            <div 
                                key={index} 
                                onClick={() => router.push(item.url)}
                                className={`w-full ${isSelected ? "text-indigo-400 bg-indigo-600/20" : "text-slate-500/70"} 
                                    flex items-center gap-3 rounded-xl py-3 cursor-pointer text-[22px] duration-500 transition-all ${isExpanded ? "" : "px-2.5"}`}
                            >
                                <div className='ml-[11px]'>{item.icon}</div>
                                <h1 className={`font-semibold text-[16px] duration-500 transition-all ${isExpanded ? "translate-x-full" : "translatex-0"}`}>
                                    {item.title}
                                </h1>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div 
                className={`w-full bg-red-600/50 text-white flex items-center gap-3 rounded-xl py-3 cursor-pointer 
               text-[22px] duration-500 transition-all ${isExpanded ? "" : "px-2.5"}`}
            >
                <div className='ml-[11px]'>
                    <BiLogOutCircle />
                </div>
                <h1 className={`font-semibold text-[16px] duration-500 transition-all ${isExpanded ? "translate-x-full" : "translatex-0"}`}>
                    Logout
                </h1>
            </div>
        </div>
    );
}

export default SideBar;
