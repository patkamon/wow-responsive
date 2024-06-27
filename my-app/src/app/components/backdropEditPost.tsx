import { Dispatch, SetStateAction, useState } from "react";
import DropdownIcon from "../svg/dropdownIcon";
import CloseIcon from "../svg/closeIcon";
import DropdownOption from "./dropdownOption";
import { useParams, useRouter } from "next/navigation";
import { IPost } from "../interfaces/interfaces";

interface Props {
  id: number
  setIsBackdrop: Dispatch<SetStateAction<boolean>>;
  post: IPost
}

export default function BackdropEditPost(prop: Props) {
  const [isCommunity, setIsCommunity] = useState(false);
  const [selectCommunity, setSelectCommunity] = useState(prop.post.community);
  const router = useRouter();

  function onEdit(e: any) {
    e.preventDefault();

    const username = localStorage.getItem("username");
    if (username == null) {
      router.push("/login");
    }
    if (selectCommunity == ""){
      return
    }


    fetch(`http://localhost:3001/posts/${prop.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        community: selectCommunity,
        username: username,
        title: e.target[1].value,
        description: e.target[2].value,
      }),
    }).then((d) => d.json()).then((d)=> router.push(`/feeds/${d.id}`));
  }



  return (
    <div
      tabIndex={-1}
      className="backdrop-contrast-50 bg-black/30  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 min-h-screen max-h-full"
    >
      <div className="relative flex justify-center w-full p-4 md:w-1/2  max-h-full ">
        <div className="relative w-full bg-white py-4 rounded-lg shadow">
          <div
            className="absolute top-4 right-4"
            onClick={() => {
              prop.setIsBackdrop(false);
            }}
          >
            <CloseIcon />
          </div>
          <form onSubmit={(e)=>onEdit(e)} className="p-4 md:p-5 flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">Edit Post</h1>
            <button
            type='button'
              className="rounded-lg md:w-fit border-success text-success border-2 md:px-6 w-full py-2 text-center flex items-center justify-center gap-2"
              onClick={() => setIsCommunity(!isCommunity)}
            >
              {selectCommunity == "" ? "Community" : selectCommunity}
              <DropdownIcon />
              <DropdownOption
                isCommunity={isCommunity}
                selectCommunity={selectCommunity}
                setIsCommunity={setIsCommunity}
                setSelectCommunity={setSelectCommunity}
              />
            </button>
            <input
              className="pl-2 border-blue-300 border-2 py-2 rounded-lg"
              placeholder="Title"
              defaultValue={prop.post.title}
            ></input>
            <textarea
              className="pl-2 w-full border-blue-300 border-2 py-2 rounded-lg h-64"
              placeholder="What's on your mind"
              defaultValue={prop.post.description}
            ></textarea>{" "}
            <div className="flex md:flex-row flex-col justify-end gap-2">
              <button
                className="border border-green-600 text-green-600 p-2 rounded-lg w-full md:w-24"
                onClick={() => prop.setIsBackdrop(false)}
              >
                Cancel
              </button>
              <button type='submit' className="border border-green-600 text-white bg-green-600 p-2 rounded-lg w-full md:w-24 ">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
