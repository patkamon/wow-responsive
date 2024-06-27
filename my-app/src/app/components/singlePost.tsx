import { Dispatch, SetStateAction } from "react";
import IComment, { IPost } from "../interfaces/interfaces";
import AddComment from "./addComment";
import Comment from "./comment";
import ReactTimeAgo from "react-time-ago";
import CommentIcon from "../svg/commentIcon";
interface Props {
  cls: string;
  post: IPost;
  comments: IComment[];
  setRefresh: Dispatch<SetStateAction<Date>>;
}

export default function SinglePost(prop: Props) {
  return (
    <div
      className={
        "w-full md:p-6 flex flex-col gap-4 border-b-2 md:pr-24 " + prop.cls
      }
    >
      <div className="flex gap-4 items-center">
        <div className="bg-blue-400 rounded-full h-12 w-12"></div>
        <h1>{prop.post.username}</h1>
        <h1 className="text-gray-500">
          <ReactTimeAgo date={prop.post.created_at || "0"} locale="en-US" />
        </h1>
      </div>

      <div className="bg-gray-100 text-black w-fit rounded-2xl py-1 px-3 text-sm md:text-md">
        {prop.post.community}
      </div>

      <div>
        <div className="font-bold text-4xl pb-4">
          {(prop.post.title || "").toUpperCase()}
        </div>
        <div className="text-sm md:text-md">{prop.post.description}</div>
      </div>

      <div className="cursor-pointer flex gap-2 items-center">
        {" "}
        <CommentIcon /> {prop.post.countComment} Comments
      </div>

      <AddComment setRefresh={prop.setRefresh} cls="" />
      <div>
        {prop.comments.map((d, index) => {
          return <Comment key={"comment" + index} cls={""} comment={d} />;
        })}
      </div>
    </div>
  );
}
