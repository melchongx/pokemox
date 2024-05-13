const Button = ({ children, className, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
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
