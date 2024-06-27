"use client";
import { useEffect, useState } from "react";
import Post from "../components/post";
import BackdropCreatePost from "../components/backdropCreatePost";
import SearchSection from "../components/searchSection";
import { IPost } from "../interfaces/interfaces";
import { useRouter } from "next/navigation";

export default function OurBlog() {
  const [isBackdrop, setIsBackdrop] = useState(false);
  const [posts, setPosts] = useState([] as IPost[]);
  const router = useRouter();
  const [refresh, setRefresh] = useState(new Date());

  const [keyword, setKeyword] = useState("");
  const [selectCommunity, setSelectCommunity] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username == null) {
      router.push("/login");
    }

    fetch(
      `http://localhost:3001/posts?` +
        new URLSearchParams({
          username: "",
          keyword: keyword.length >= 2 ? keyword : "",
          community: selectCommunity || "",
          range: "0",
        }).toString()
    )
      .then((d) => d.json())
      .then((d) => setPosts(d));
  }, [refresh, keyword, selectCommunity]);

  return (
    <div className="md:col-span-3 bg-grey100">
      {/* Middle Header */}
      <SearchSection
        keyword={keyword}
        selectCommunity={selectCommunity}
        setKeyword={setKeyword}
        setSelectCommunity={setSelectCommunity}
        setIsBackdrop={setIsBackdrop}
      />
      <div className="pb-8 mx-4">
        {posts.map((d, index) => {
          return (
            <Post
              setRefresh={setRefresh}
              cls={index == 0 ? "rounded-t-xl" : ""}
              keyword={keyword.length >=2 ? keyword : ""}
              key={"post" + index}
              post={d}
              self={true}
            />
          );
        })}
      </div>
      {isBackdrop && <BackdropCreatePost setIsBackdrop={setIsBackdrop} />}
    </div>
  );
}
