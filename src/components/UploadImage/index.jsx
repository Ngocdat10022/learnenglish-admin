import Image from "next/image";
import { useState } from "react";

export default function UploadImage({ image, onClick }) {
  return (
    <label className="rounded-md relative w-[260px] cursor-pointer overflow-hidden h-[260px] bg-yellowColor">
      <div className="absolute inset-0 hidden opacity-50 bg-mainColor"></div>
      <input type="file" className="hidden" name="file" onChange={onClick} />

      <Image
        width={1000}
        height={1000}
        src={`${
          image
            ? image
            : "https://static.memrise.com/accounts/img/placeholders/empty-avatar-3.png"
        }`}
        alt="image"
        className="object-cover w-full h-full"
      />
    </label>
  );
}
