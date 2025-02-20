'use client';
import AdminDataGrid from "@/components/CustomGrid/AdminDataGrid";
import React, { useState } from "react";

const GridExample = () => {
  const [toggleGrid, setToggleGrid] = useState(false);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <h1 className="text-3xl py-3 font-bold text-white">Users Table</h1>
      <div className="w-full flex-1 rounded-2xl">
        <AdminDataGrid />
      </div>
    </div>
  );
};

export default GridExample;
