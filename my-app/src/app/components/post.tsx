"use client";
import { Dispatch, SetStateAction, useState } from "react";
import BackdropConfirmDelete from "./backdropConfirmDelete";
import { useRouter } from "next/navigation";
import EditIcon from "../svg/editIcon";
import DeleteIcon from "../svg/DeleteIcon";
import CommentIcon from "../svg/commentIcon";
import BackdropEditPost from "./backdropEditPost";
import { IPost } from "../interfaces/interfaces";
import Highlighter from "react-highlight-words";

interface Props {
  cls: string;
  post: IPost;
  self?: boolean;
  setRefresh?: Dispatch<SetStateAction<Date>>;
  keyword?: string;
}

export default function Post({
  cls,
  post,
  setRefresh = () => {},
  keyword = "",
  self = false,
}: Props) {
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();

  function onDelete() {
    const username = localStorage.getItem("username");
    if (username == null) {
      router.push("/login");
    }
    if (username != post.username) {
      return;
    }

    fetch(`http://localhost:3001/posts/${post.id}`, {
      cache: "no-store",
      method: "DELETE",
    })
      .then((d) => d.json())
      .then((d) => {
        setIsDelete(false);
        setRefresh(new Date());
      });
  }

  return (
    <div
      className={
        "relative w-full bg-white p-6 flex flex-col gap-4 border-b-2 " + cls
      }
    >
      <div className="flex gap-4 items-center">
        <div className="bg-blue-400 rounded-full h-10 w-10"></div>
        <h1 className="text-gray-500">{post.username}</h1>
      </div>

      {self && (
        <div className="absolute top-4 right-4 flex gap-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <EditIcon />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsDelete(true);
            }}
          >
            <DeleteIcon />
          </div>
        </div>
      )}

      {isDelete && (
        <BackdropConfirmDelete func={onDelete} setIsBackdrop={setIsDelete} />
      )}
      {isEdit && (
        <BackdropEditPost post={post} id={post.id} setIsBackdrop={setIsEdit} />
      )}

      <div className="bg-gray-100 text-black w-fit text-sm md:text-md rounded-2xl py-1 px-3">
        {post.community}
      </div>

      <div>
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={[keyword]}
          autoEscape={true}
          textToHighlight={post.title.toUpperCase()}
        ></Highlighter>
        <div className="line-clamp-2 md:text-md text-sm">
          {post.description}
        </div>
      </div>

      <div
        className="cursor-pointer flex gap-2 items-center"
        onClick={() => router.push(`/feeds/${post.id}`)}
      >
        <CommentIcon />
        {post.countComment} Comments
      </div>
    </div>
  );
}
