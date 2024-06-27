import { useRouter } from "next/navigation";
import HomeIcon from "../svg/homeIcon";
import OurBlogIcon from "../svg/ourBlogIcon";
import BackIcon from "../svg/backIcon";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setIsBackdrop: Dispatch<SetStateAction<boolean>>;
}

export default function BackdropMenu(prop: Props) {
  const router = useRouter();

  return (
    <div
      tabIndex={-1}
      className="backdrop-contrast-50 bg-black/30 overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 min-h-screen max-h-full"
    >
      <div className="relative flex justify-end w-full md:w-1/2  max-h-full ">
        <div className="bg-green500 relative z-50 flex flex-col rounded-l-lg min-h-screen h-full w-3/4">
          <div className="visible md:hidden justify-start flex-col pl-6 pt-12 h-full [&>*]:pt-4">
            <div
              className="rotate-180 w-fit flex gap-3 items-center cursor-pointer"
              onClick={() => prop.setIsBackdrop(false)}
            >
              <BackIcon color="#FFFFFF" />
            </div>

            <div
              className="flex gap-3 items-center cursor-pointer text-white"
              onClick={() => {
                router.push("/");
                prop.setIsBackdrop(false);
              }}
            >
              <HomeIcon color="#FFFFFF" />
              Home
            </div>
            <div
              className="flex justify-start gap-3 items-center cursor-pointer text-white"
              onClick={() => {
                router.push("/our-blog");
                prop.setIsBackdrop(false);
              }}
            >
              <OurBlogIcon color="#FFFFFF" />
              Our blog
            </div>
                

        </div>
        <div
              onClick={() => {
                localStorage.removeItem("username");
                router.push("/login");
              }}
              className="cursor-pointer flex mb-4 justify-center mt-auto gap-8 items-center"
            >
              {" "}
              <div className="bg-blue-400 rounded-full p-5"></div>{" "}
              <h1 className="text-center text-white text-2xl">
                {localStorage.getItem("username")}
              </h1>{" "}
            </div>
    

          </div>

  


      </div>
    </div>
  );
}
