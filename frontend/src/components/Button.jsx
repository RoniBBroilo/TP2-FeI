const Button = ({ text, color, disabled, type = "button", onClick }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick ? onClick : undefined}
      className={`${
        disabled
          ? "!bg-[#C1C1C1] cursor-not-allowed text-white"
          : color === "primary"
          ? "bg-[#75B781] text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-[#225a31] duration-300"
          : color === "third"
          ? "bg-white border-[2px] border-[#75B781] text-[#75B781] font-bold hover:bg-[#75B781] hover:text-white transition-all ease-in-out duration-300"
          : "bg-[#2A352F] text-white"
      } px-5 py-3 w-full h-full font-Muli rounded flex items-center text-[16px] justify-center sm:px-10`}
    >
      {text}
    </button>
  );
};

export default Button;
