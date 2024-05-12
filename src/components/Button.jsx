const Button = ({ children, className }) => {
  return (
    <button
      type="button"
      className={
        "rounded-lg border border-neutral-600 bg-[#D8AE7E] px-3 py-1 " +
        className
      }
    >
      {children}
    </button>
  );
};

export default Button;
