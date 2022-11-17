import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import LoginPage from "./Routes/loginPage";
import LogoutPage from "./Routes/logoutPage";
import InitialPage from "./Routes/initialPage";
import SignupPage from "./Routes/signUpPage";
import HomePage from "./Routes/homePage";
import Loading from "./components/Loading";
import ImageUpload from "./components/ImageUpload";
import MainPage from "./Routes/mainPage";
import MyProfilePage from "./Routes/myPages/myProfilePage";
import EditMyInfoPage from "./Routes/myPages/editMyInfoPage";
import EditPasswordPage from "./Routes/myPages/editPasswordPage";
import MyCommentPage from "./Routes/myCommentPage";
import EditPage from "./Routes/editPage";
import PostPage from "./Routes/postPage";
import MyLikePostPage from "./Routes/myLikePostPage";
import MyPostPage from "./Routes/myPostPage";
import PostTestMap from "./components/PostPage/postTestMap";

// 로그인 테스트용입니다.
import { useRecoilState } from "recoil";
import { loginOk } from "./atoms/loginTest";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // 로그인 테스트용입니다.
  const [, setLogin] = useRecoilState(loginOk);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/login" element={<LoginPage/>} /> */}
            {/* 로그인 테스트용입니다. */}
            <Route path="/login" element={<LoginPage setLogin={setLogin} />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/initial" element={<InitialPage />} />
            <Route path="/main/:id" element={<MainPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/image" element={<ImageUpload />} />
            <Route path="/mypage" element={<MyProfilePage />} />
            <Route path="/mypage/editmyinfo" element={<EditMyInfoPage />} />
            <Route path="/mypage/editpassword" element={<EditPasswordPage />} />
            <Route path="/mypage/mypost" element={<MyPostPage />} />
            <Route path="/mypage/likepost" element={<MyLikePostPage />} />
            <Route path="/mypage/mycomment" element={<MyCommentPage />} />
            {/* 테스트 맵 */}
            <Route path="/test" element={<PostTestMap />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
