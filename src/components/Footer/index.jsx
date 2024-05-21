"use client";

import Image from "next/image";
import logo from "@/accsets/images/logo-learn.png";
import {
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconYoutube,
} from "@/accsets/icons";
import Button from "../ButtonHome";
import { useRouter } from "next/navigation";
export default function Footer() {
  const router = useRouter();

  return (
    <div className="w-full bg-mainColor h-[260px] flex flex-col gap-11 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-11 pl-7">
        <Image className="w-[150px]" src={logo} alt="logo" />
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
          name="Start Learning"
          className="w-[200px] h-[50px] rounded-2xl"
        />
      </div>

      <div className="flex items-center gap-4">
        <IconFacebook />
        <IconTwitter />
        <IconInstagram />
        <IconYoutube />
      </div>
    </div>
  );
}
