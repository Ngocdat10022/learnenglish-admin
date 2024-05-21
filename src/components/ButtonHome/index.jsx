export default function Button({ loaing, disable, onClick, name, className }) {
  return (
    <button
      onClick={onClick}
      className={`text-xl text-mainColor font-bold bg-yellowColor  ${className}`}
    >
      {name}
    </button>
  );
}
