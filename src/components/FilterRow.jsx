const FilterRow = ({ className, children }) => {
  return (
    <div
      className={"flex columns-2 flex-wrap justify-center gap-x-6 " + className}
    >
      {children}
    </div>
  );
};

export default FilterRow;
