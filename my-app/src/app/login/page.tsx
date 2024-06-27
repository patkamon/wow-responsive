'use client'
import { useRouter } from "next/navigation";
import BoardText from "../svg/aboardText";
import BoardLogo from "../svg/boardLogo";

export default function Login() {
  const router = useRouter();

  return (
    <div
      className="bg-green500 w-full h-screen flex flex-col-reverse gap-24 justify-between items-center
    md:flex-row"
    >
      <div className="flex justify-center md:items-center h-1/2 md:w-1/2 w-full">
        <form className="flex flex-col md:w-1/2 w-full p-4 gap-4"
        onSubmit={(e)=>{
          e.preventDefault()
          localStorage.setItem('username',(e.target as any)[0].value);
          router.push("/")
        }
        }
        >
            <h1 className="text-white mb-4 text-2xl font-semibold">Sign in</h1>
            <input
              placeholder="Username"
              className="py-2 rounded-lg pl-3"
              required
            ></input>
            <button type='submit' className="w-full bg-success text-white py-2 rounded-lg">
              Sign in
            </button>
        </form>
      </div>

      <div
        className="bg-green300  h-1/2 w-full flex flex-col justify-center gap-8 items-center rounded-b-3xl
      md:h-screen md:w-1/2 md:rounded-l-3xl
      "
      >
        <BoardLogo />

        <BoardText />
      </div>
    </div>
  );
}
