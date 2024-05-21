export default function FieldInput({
  name,
  register,
  type,
  placeholder,
  className,
  lable,
  messageError,
  defaultValue,
}) {
  return (
    <div className="flex flex-col items-start w-full gap-2">
      <lable className="text-sm font-bold text-black">{lable}</lable>
      <input
        defaultValue={defaultValue}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full pl-2 ${
          messageError && "border-[#e46962]"
        } border-2 border-solid outline-none rounded-xl h-[50px]  ${className}`}
        {...register(name)}
      />
    </div>
  );
}
