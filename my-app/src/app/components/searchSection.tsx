import { Dispatch, SetStateAction, useState } from "react";
import DropdownIcon from "../svg/dropdownIcon";
import SearchIcon from "../svg/SearchIcon";
import DropdownOption from "./dropdownOption";

interface Props {
  setIsBackdrop: Dispatch<SetStateAction<boolean>>;
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>;
  selectCommunity: string
  setSelectCommunity: Dispatch<SetStateAction<string>>
}

export default function SearchSection(prop: Props) {
  const [isCommunity, setIsCommunity] = useState(false);

  return (
    <div className="flex md:gap-4 justify-center items-center mb-6 mx-4">
      <label
        htmlFor="search"
        className="w-full md:border-green100 flex items-center md:gap-4 md:placeholder:text-black md:border-2 md:py-2 md:pl-2 pl-1 rounded-lg bg-transparent"
      >
        <SearchIcon />
        <input
          name="search"
          className="w-full md:w-full placeholder:pl-1  bg-transparent !outline-none"
          placeholder="Search"
          onChange={(e)=>prop.setKeyword(e.target.value)}
        ></input>
      </label>
      <button
        className="rounded-lg px-2 md:w-44 flex justify-center py-2 text-center text-black items-center gap-2"
        onClick={() => setIsCommunity(!isCommunity)}
      >
        {prop.selectCommunity == "" ? "Community" : prop.selectCommunity}
        <DropdownIcon />
        <DropdownOption
          isCommunity={isCommunity}
          selectCommunity={prop.selectCommunity}
          setIsCommunity={setIsCommunity}
          setSelectCommunity={prop.setSelectCommunity}
        />
      </button>

      <button
        className="rounded-lg text-white bg-success px-2 md:px-6 py-2 text-center"
        onClick={() => prop.setIsBackdrop(true)}
      >
        Create+
      </button>
    </div>
  );
}
