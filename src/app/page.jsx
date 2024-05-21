"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/users");
  }, []);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24"></main>
  );
}
