import Image from "next/image";

export default function ButtonSocial({
  className,
  name,
  image,
  onClick,
  icon,
}) {
  return (
    <div
      onClick={onClick}
      className={`w-full h-[30px] pl-[1px] rounded-3xl flex items-center justify-between ${className}`}
    >
      <div className="w-40px">{icon}</div>
      <p className="w-full text-base text-center text-white">{name}</p>
    </div>
  );
}
