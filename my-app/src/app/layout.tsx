"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import BoardText from "./svg/aboardText";
import HomeIcon from "./svg/homeIcon";
import OurBlogIcon from "./svg/ourBlogIcon";
import { useRouter } from "next/navigation";
import HamburgerIcon from "./svg/hamburgerIcon";
import BackdropMenu from "./components/backdropMenu";
import { useState } from "react";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  appProps: any;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenu, setIsMenu] = useState(false);

  if ([`/login`].includes(pathname))
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    );


  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="w-full py-4 bg-green500 flex justify-between items-center px-8">
          <div onClick={() => router.push("/")}>
            <BoardText />
          </div>

          {localStorage.getItem("username") == null ? (
            <button
              onClick={() => router.push("/login")}
              className="invisible md:visible text-white bg-success px-8 py-2 rounded-lg"
            >
              Sign in
            </button>
          ) : (
            <div
              onClick={() => {
                localStorage.removeItem("username");
                router.push("/login");
              }}
              className="invisible md:visible cursor-pointer flex justify-center items-center gap-8"
            >
              {" "}
              <h1 className="text-center text-white text-2xl">
                {localStorage.getItem("username")}
              </h1>{" "}
              <div className="bg-blue-400 rounded-full p-5"></div>{" "}
            </div>
          )}

          <button
            className="visible md:hidden text-white cursor-pointer"
            onClick={() => setIsMenu(true)}
          >
            <HamburgerIcon />
          </button>
        </nav>

        <div className="bg-grey100 w-full h-full min-h-screen md:grid md:grid-cols-5 [&>*]:pt-8">
          {/* Left */}
          <div className="hidden md:block justify-start flex-col pl-6 [&>*]:pt-4">
            <div
              className="flex gap-3 items-center cursor-pointer"
              onClick={() => router.push("/")}
            >
              <HomeIcon />
              Home
            </div>
            <div
              className="flex justify-start gap-3 items-center cursor-pointer"
              onClick={() => router.push("/our-blog")}
            >
              <OurBlogIcon />
              Our blog
            </div>
          </div>
          {children}
        </div>

        {isMenu && <BackdropMenu setIsBackdrop={setIsMenu} />}
      </body>
    </html>
  );
}
