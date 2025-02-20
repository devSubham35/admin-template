import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NavItem {
  name: string;
  link: string;
  onClick: () => void;
}

interface BreadCrumbProps {
  data: NavItem[];
  title?: string;
}

const BreadCrumb = ({ data, title }: BreadCrumbProps) => {

  return (
    <div className="p-4">
      <h1 className="font-extrabold mb-4 text-2xl text-gray-900">
        {title}
      </h1>


      <div className="flex items-center">
        {data.map((item, index) => (
          <div key={item.link} className="flex items-center">
            {data.length - 1 !== index ? (
              <Link
                href={item.link}
                className="text-black hover:underline"
              >
                <div onClick={item.onClick}>{item.name}</div>
              </Link>
            ) : (
              <button
                onClick={item.onClick}
                className="text-gray-400 focus:outline-none"
              >
                {item.name}
              </button>
            )}
            {data.length - 1 !== index && (
              <ChevronRight width={30} height={30} className="px-2 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreadCrumb;
