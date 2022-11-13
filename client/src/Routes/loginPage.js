import Header from "../components/Header";

export default function LoginPage() {
  return (
    <>
      <Header />
      <div className="lg:w-full w-full h-screen align-baseline flex justify-center items-center">
        {/*  */}
        <div className="max-w-md p-2 px-10 m-auto border border-[rgb(83,199,240)] rounded-xl text-[rgb(83,199,240)]">
          <div className="font-semibold border-b-2 border-[rgb(83,199,240)] w-fit px-5 py-2">
            Login
          </div>
          <div className="relative flex justify-center items-center">
            <img src="images/gradation.png" alt="gradation" className="w-60" />
            <img
              src="images/notfound_icon_w.png"
              alt="train"
              className="absolute w-16"
            />
          </div>
          <div className="font-semibold text-[rgb(83,199,240)] pt-1 ml-3">
            Email
          </div>
          <input
            type="email"
            className="border border-[rgb(83,199,240)] rounded-md  bg-transparent; focus:outline focus:outline-blue-500 w-80 p-2 m-2 mb-4"
          />
          <div className="font-semibold text-[rgb(83,199,240)] ml-2">
            password
          </div>
          <input
            type="password"
            className="border border-[rgb(83,199,240)] rounded-md  bg-transparent; focus:outline focus:outline-blue-500 w-80 p-2 m-2 mb-4"
          />
          <div className="text-white font-semibold m-auto w-fit  bg-gradient-to-tl from-white to-[rgb(83,199,240)] py-2 px-4 rounded-md">
            Login
          </div>
        </div>
      </div>
    </>
  );
}
