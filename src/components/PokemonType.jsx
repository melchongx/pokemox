import styles from '../assets/css/PokemonType.module.css';

const PokemonType = ({ type }) => {
  return (
    <div className={`px-2 py-1 rounded inline-block font-bold uppercase me-3 ${styles[type]}`}>
      {type}
    </div>
  );
}

export default PokemonType;