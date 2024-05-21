export default function ButtonCustoms({
  name,
  className,
  onClick,
  isLoading,
  disable,
  type,
}) {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      type={type}
      className={` h-[50px] ${
        isLoading && "opacity-10"
      } bg-mainColor rounded-2xl text-white font-bold ${className}`}
    >
      {name}
    </button>
  );
}
