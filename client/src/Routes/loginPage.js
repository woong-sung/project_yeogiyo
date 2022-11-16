import Header from "../components/Header";

// 테스트용 아이디/비밀번호입니다.
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setLogin }) {
  // 로그인 테스트 로직입니다.
  const testId = { id: "", password: "" };
  const navigate = useNavigate();
  const handleLogin = () => {
    if (testId.id === "test" && testId.password === "1234") {
      console.log("로그인성공!!");
      setLogin(true);
      navigate("/");
    } else {
      console.log("로그인되었습니다.");
    }
  };

  return (
    <>
      <Header />
      <div className="lg:w-full w-full h-screen align-baseline flex justify-center items-center">
        {/*  */}
        <div className="max-w-md p-2 px-10 m-auto border border-[rgba(83,198,240,0.4)] rounded-xl text-[rgb(83,199,240)]">
          <div className="font-semibold border-b-2 border-[rgb(83,199,240)] w-fit px-5 py-2">
            Login
          </div>
          <div className="relative flex justify-center items-center">
            <img src="/images/gradation.png" alt="gradation" className="w-60" />
            <img
              src="/images/notfound_icon_w.png"
              alt="train"
              className="absolute w-16"
            />
          </div>
          <div className="font-normal text-[rgb(83,199,240)] pt-1 ml-3">
            Email
          </div>
          <input
            type="email"
            className="border border-[rgb(83,199,240)] rounded-md  bg-transparent; focus:outline focus:outline-blue-500 w-80 p-2 m-1 mb-4"
            onChange={(e) => (testId.id = e.target.value)}
          />
          <div className="font-normal text-[rgb(83,199,240)] ml-2">
            password
          </div>
          <input
            type="password"
            className="border border-[rgb(83,199,240)] rounded-md  bg-transparent; focus:outline focus:outline-blue-500 w-80 p-2 m-1 mb-4"
            onChange={(e) => (testId.password = e.target.value)}
          />
          {/* <div
            className="text-white font-semibold m-auto w-fit  bg-gradient-to-tl from-white to-[rgb(83,199,240)] py-2 mb-2 px-6 rounded-md"
          >
            Login
          </div> */}

          {/* 로그인 테스트용 버튼입니다. */}
          <button
            className="text-white font-semibold m-auto w-fit  bg-gradient-to-tl from-white to-[rgb(83,199,240)] py-2 mb-2 px-6 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
