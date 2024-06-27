"use client";
import SinglePost from "@/app/components/singlePost";
import BackIcon from "@/app/svg/backIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import IComment, { IPost } from "@/app/interfaces/interfaces";


export default function FullPost() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState({} as IPost)
  const [comments, setComments] = useState([] as IComment[])
  const [refresh, setRefresh] = useState(new Date())

  useEffect(() => {
    console.log("hey")
    fetch(`http://localhost:3001/posts/${params.id}`)
      .then((d) => d.json())
      .then((d) => setPost(d));

      fetch(`http://localhost:3001/comments/${params.id}`,{cache: "no-cache"})
      .then((d) => d.json())
      .then((d) => setComments(d));
  }, [params.id, refresh]);

  return (
    <div className="col-span-4 bg-white md:px-20 px-4">
      {/* Middle Header */}
      <div className="flex gap-4 items-center mb-6">
        <div
          className="bg-green100 p-3 md:p-4 rounded-full cursor-pointer"
          onClick={() => router.back()}
        >
          <BackIcon />
        </div>
      </div>
      <div className="">
        <SinglePost setRefresh={setRefresh} post={post} comments={comments} cls="" />
      </div>
    </div>
  );
}
