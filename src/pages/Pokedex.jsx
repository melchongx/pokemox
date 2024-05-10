const Pokedex = () => {
  return (
    <div className="flex flex-col">
      <h1 className="m-auto text-3xl font-bold italic">POKEDEX</h1>
      <div className="m-auto my-2 flex w-full">
        <div className="w-1/3">
          <h3 className="px-5 text-end font-semibold text-stone-700">
            POKEMON TYPE
          </h3>
        </div>
        <div className="w-2/3">
          <select className="w-2/3 rounded-sm"></select>
        </div>
      </div>
      <div className="m-auto my-2 flex w-full">
        <div className="w-1/3">
          <h3 className="px-5 text-end font-semibold text-stone-700">
            ABILITY
          </h3>
        </div>
        <div className="w-2/3">
          <select className="w-2/3 rounded-sm"></select>
        </div>
      </div>
      <div className="m-auto my-2 flex w-full">
        <div className="w-1/3">
          <h3 className="px-5 text-end font-semibold text-stone-700">
            NUMBER RANGE
          </h3>
        </div>
        <div className="w-2/3">
          <select className="w-1/5 rounded-sm"></select> - &nbsp;
          <select className="w-1/5 rounded-sm"></select>
        </div>
      </div>
      <div className="m-auto my-2 flex w-full">
        <div className="w-1/3">
          <h3 className="px-5 text-end font-semibold text-stone-700">
            SORT BY
          </h3>
        </div>
        <div className="w-2/3">
          <select className="w-2/3 rounded-sm"></select>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
