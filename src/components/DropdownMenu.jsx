import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ChevronIcon from "./ChevronIcon";

const DropdownMenu = ({ title, items, onSelect }) => {
  return (
    <Menu>
      <MenuButton
        className="flex w-full items-center rounded-lg border border-neutral-600 bg-[#F5F3F5] px-3 py-1 text-left uppercase "
        id="pokemonType"
      >
        <div className="flex w-full items-center justify-between">
          <span>{title}</span>
          <span>
            <ChevronIcon variant="down" />
          </span>
        </div>
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="mt-1 w-72 rounded-lg border border-neutral-600 bg-[#F5F3F5] text-stone-700"
      >
        {items.map((item) => (
          // item is either an object with value and name fields, or just a string
          <MenuItem key={item.value || item}>
            <button
              onClick={() => onSelect(item.value || item)}
              className="block w-full px-3 py-1 text-left uppercase data-[focus]:bg-neutral-200"
            >
              {item.name || item}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default DropdownMenu;
