"use client";
import Sidebar from "@/components/Sidebar";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const token =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      router.push("/dashboard/category");
    }
  }, [token]);
  return (
    <div className="h-[100vh] flex w-[100%] ]">
      {/* <Sidebar />
      <div
        style={{
          marginLeft: "256px",
          padding: "40px 40px",
        }}
        className="ml-[256px] h-full w-full "
      >
        <Header />
        <div className="w-full mt-6">
          <div></div>
        </div>
      </div> */}
    </div>
  );
}
