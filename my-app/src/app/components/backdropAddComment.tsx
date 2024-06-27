import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../svg/closeIcon";
import { useParams, useRouter } from "next/navigation";

interface Props {
  setIsBackdrop: Dispatch<SetStateAction<boolean>>;
  setRefresh: Dispatch<SetStateAction<Date>>
}

export default function BackdropAddComment(prop: Props) {
  const router = useRouter();
  const params = useParams();

  function onComment(e: any) {
    e.preventDefault();
    const username = localStorage.getItem("username");
    if (username == null) {
      router.push("/login");
    }

    fetch(`http://localhost:3001/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        postId: params.id,
        username: username,
        comment: e.target[0].value,
      }),
    })
      .then((d) => d.json())
      .then((d) => {
        prop.setRefresh(new Date())
        e.target.reset()
        prop.setIsBackdrop(false);
      });
  }



  return (
    <div
      tabIndex={-1}
      className="backdrop-contrast-50 bg-black/30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 min-h-screen max-h-full"
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
          <form onSubmit={(e)=>onComment(e)} className="p-4 md:p-5 flex flex-col gap-2">
            <h1 className="font-semibold text-2xl">Add comments</h1>
            <textarea
              className="pl-2 w-full border-blue-300 border-2 py-2 rounded-lg h-64"
              placeholder="What's on your mind"
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
