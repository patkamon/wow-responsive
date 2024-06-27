"use client";
import { useEffect, useState } from "react";
import Post from "./components/post";
import BackdropCreatePost from "./components/backdropCreatePost";
import SearchSection from "./components/searchSection";

export default function Feeds() {
  const [isBackdrop, setIsBackdrop] = useState(false);
  const [posts, setPosts] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [selectCommunity, setSelectCommunity] = useState("");

  useEffect(() => {
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
  }, [keyword, selectCommunity]);

  return (
    <div className="md:col-span-3 bg-grey100 flex flex-col">
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
              keyword={keyword.length >= 2 ? keyword : ""}
              post={d}
              cls={index == 0 ? "rounded-t-xl" : ""}
              key={"post" + index}
            />
          );
        })}
        {isBackdrop && <BackdropCreatePost setIsBackdrop={setIsBackdrop} />}
      </div>
    </div>
  );
}
