import styles from "../assets/css/PokemonType.module.css";

const PokemonType = ({ type, className }) => {
  return (
    <div
      className={`text-md inline-block rounded px-2 py-1 font-bold uppercase ${className} ${styles[type]}`}
    >
      {type}
    </div>
  );
};

export default PokemonType;
