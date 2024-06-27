import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../svg/closeIcon";

interface Props {
  setIsBackdrop: Dispatch<SetStateAction<boolean>>;
  func: ()=>void
}

export default function BackdropConfirmDelete(prop: Props) {
  return (
    <div
      tabIndex={-1}
      className="backdrop-contrast-50 bg-black/30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 max-h-full"
    >
      <div className="relative p-4 md:w-1/3 w-fit min-h-screen md:max-h-full text-center text-wrap flex justify-center items-center">
        <div className="relative bg-white py-4 rounded-lg shadow ">
          <div className="p-6 md:p-5 flex flex-col gap-2">
            <h1 className="font-semibold text-2xl text-wrap">
              Please confirm if you wish to delete post
            </h1>
            <h2 className="text-wrap">
              Are you sure you want to delete the post? Once deleted, it cannot
              be recovered.
            </h2>
            <div className="flex md:flex-row flex-col justify-center  gap-2 pt-4">
              <button
                className="border border-grey100 text-black p-2 rounded-lg w-full"
                onClick={() => prop.setIsBackdrop(false)}
              >
                Cancel
              </button>
              <button onClick={prop.func} className="border text-white bg-red-600 p-2 rounded-lg w-full ">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
