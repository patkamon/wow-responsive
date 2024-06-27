"use client";

import { Dispatch, SetStateAction, useState } from "react";
import BackdropAddComment from "./backdropAddComment";
import { useParams, useRouter } from "next/navigation";

interface Props {
  cls: string;
  setRefresh: Dispatch<SetStateAction<Date>>
}

export default function AddComment(prop: Props) {
  const [isAdding, setIsAdding] = useState(false);
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
      });
  }

  return (
    <div className={"w-full py-6 flex flex-col gap-4" + prop.cls}>
      {isAdding ? (
        <form onSubmit={(e)=>onComment(e)} className="md:block hidden">
          <textarea
            className="rounded-lg border border-gray-500 w-full h-44 text-wrap text-start p-3"
            placeholder="What's on your mind"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              className="border border-green-600 text-green-600 p-2 rounded-lg w-24"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button type='submit' className="border border-green-600 text-white bg-green-600 p-2 rounded-lg w-24 ">
              Post
            </button>
          </div>
        </form>
      ) : (
        <div>
          <button
            className="border border-green-600 text-green-600 p-2 rounded w-fit "
            onClick={() => setIsAdding(true)}
          >
            Add Comments
          </button>
        </div>
      )}

      {isAdding && (
        <div className="visible md:hidden">
          <BackdropAddComment setRefresh={prop.setRefresh} setIsBackdrop={setIsAdding} />
        </div>
      )}
    </div>
  );
}
