import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

function Footer() {
  return (
    <div className="w-full h-[80px] border-t-[1px] border-t-gray-400/10 px-4 bg-[#0f0e12] flex items-center justify-around text-white">
      <MdOutlineDashboard className="w-[24px] h-[24px]"/>
      <FaRegCalendar className="w-[24px] h-[24px]"/>
      <IoPersonOutline className="w-[24px] h-[24px]"/>
    </div>
  );
}

export default Footer;
