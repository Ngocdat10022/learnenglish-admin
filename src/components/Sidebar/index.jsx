"use client";

import Image from "next/image";
import logo from "@/accsets/images/logo-learn.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MOCKUPDATA_SIDEBAR } from "@/constants/sidebar";
import { useRouter } from "next/navigation";
import { ClientPageRoot } from "next/dist/client/components/client-page";
export default function Sidebar() {
  const [activeNumber, setActiveNumber] = useState(
    typeof window !== "undefined" && localStorage.getItem("active")
  );
  const [active, setActive] = useState(activeNumber);
  useEffect(() => {
    const numberActive =
      typeof window !== "undefined" && localStorage.getItem("active");
    setActiveNumber(numberActive);
  }, [active]);
  return (
    <div className="w-[256px] h-[100%] bg-mainColor fixed top-0 left-0 bottom-0">
      <div className="p-8">
        <Image className="w-[150px]" src={logo} alt="" />
      </div>
      <nav>
        <ul>
          {MOCKUPDATA_SIDEBAR.map((item) => (
            <Link
              onClick={() => {
                window !== "undefined" &&
                  localStorage.setItem("active", item?.id);
                setActive(item?.id);
              }}
              key={item?.id}
              href={item?.path}
              className={`flex items-center gap-3 p-3 text-2xl font-bold transition-all ${
                active === item?.id
                  ? "text-black bg-white border-r-8 border-yellowColor"
                  : "text-white"
              } hover:text-black hover:bg-white`}
            >
              {item?.icon}
              {/* <IconHome className="w-[32px] hover:text-black" /> */}
              <li>{item?.name}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}
