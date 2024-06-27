import ReactTimeAgo from "react-time-ago";
import IComment from "../interfaces/interfaces";
import Avatar from "../svg/avatar";

interface Props {
  cls: string;
  comment: IComment;
}

export default function Comment(prop: Props) {
  return (
    <div className={"w-full py-6 flex flex-col gap-4" + prop.cls}>
      <div className="flex gap-4 items-center">
        <div className="bg-gray-200 rounded-full h-10 w-10 flex justify-center items-center">
          <Avatar />
        </div>
        <h1>{prop.comment.username}</h1>
        <h1 className="text-gray-500">           <ReactTimeAgo date={prop.comment.created_at || "0"} locale="en-US"/>
        </h1>
      </div>

      <div className="ml-14">
        <div className="text-sm md:text-md">{prop.comment.comment}</div>
      </div>
    </div>
  );
}
