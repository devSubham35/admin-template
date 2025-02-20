import { FaUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiHistoryFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";

export interface MenuItemTypes {
    title: string;
    icon: JSX.Element;
    url: string;
  }

export const navData = [
    {
        title: "Dashboard",
        icon: <MdSpaceDashboard />,
        url: "/"
    },
    {
        title: "Activity",
        icon: <FaTasks />,
        url: "/activity"
    },
    {
        title: "Profile",
        icon: <FaUser />,
        url: "/profile"
    },
    {
        title: "History",
        icon: <RiHistoryFill />,
        url: "/history"
    },
    {
        title: "Settings",
        icon: <IoMdSettings />,
        url: "/settings"
    }
]
