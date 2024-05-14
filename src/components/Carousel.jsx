import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import Flicking from "@egjs/react-flicking";
import { AutoPlay, Fade } from "@egjs/flicking-plugins";
import Panel from "./Panel.jsx";
import { useEffect, useRef } from "react";

const Carousel = ({ pokemons }) => {
  const flicking = useRef(null);

  const plugins = [
    new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
    new Fade()
  ];

  useEffect(() => {
    if (flicking.current) {
      flicking.current.on('moveEnd', () => {
        const currentPanel = flicking.current.currentPanel;
        const nextPanel = currentPanel.next();
        const currentElement = nextPanel.element;

        // Remove the custom class from all panels
        flicking.current.panels.forEach(panel => {
          panel.element.classList.remove("active");
        });

        // Add the custom class to the current panel
        currentElement.classList.add("active");
      });
    }
  }, []);

  return (
    <Flicking
      ref={flicking}
      align="center"
      circular={true}
      renderOnlyVisible={true}
      plugins={plugins}
    >
      { pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <Panel pokemon={pokemon} key={pokemon.id} />
        </div>
      )) }
    </Flicking>
  );
}

export default Carousel;
