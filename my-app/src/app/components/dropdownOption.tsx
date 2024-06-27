import { Dispatch, SetStateAction } from "react";
import CheckmarkIcon from "../svg/checkmarkIcon";

const option = ["History", "Food", "Pets", "Health", "Fashion", "Exercise", "Others"];

interface Props {
    isCommunity: boolean
    setIsCommunity: Dispatch<SetStateAction<boolean>>;
    selectCommunity: string
    setSelectCommunity: Dispatch<SetStateAction<string>>
  }
export default function DropdownOption(prop: Props) {
  return (
    <>
      {prop.isCommunity && (
        <div
          id="multi-dropdown"
          className="z-10 bg-white fixed translate-y-20 divide-y divide-gray-100 rounded-lg shadow md:w-44 w-4/5 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="multiLevelDropdownButton"
          >
            {option.map((o) => {
              return (
                <li key={"key" + o}>
                  <a
                    href="#"
                    className={`flex justify-between items-center px-4 py-2 ${
                        prop.selectCommunity == o && "bg-green100"
                    } hover:bg-green100 dark:hover:bg-gray-600 dark:hover:text-white`}
                    onClick={() => prop.setSelectCommunity(o)}
                  >
                    {o}
                    {prop.selectCommunity == o && <CheckmarkIcon />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
