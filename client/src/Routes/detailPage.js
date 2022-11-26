import CommentEditor from "../components/DetailPage/CommentEditor";
import CommentList from "../components/DetailPage/Comments/CommentList";
import DetailHeader from "../components/DetailPage/DetailHeader/DetailHeader";
import DetailImageSlider from "../components/DetailPage/DetailImageSlider";
import DetailMap from "../components/DetailPage/DetailMap";
import NeighborhoodPlace from "../components/DetailPage/NeighborhoodPlace";
import Header from "../components/Header";
import Like from "../components/DetailPage/Review/Like";
import Dislike from "../components/DetailPage/Review/Dislike";
import OneLineComment from "../components/OneLineComment";
import Footer from "../components/Footer";
import KakaoShareButton from "../components/DetailPage/KakaoShareButton";
import EveryShareButton from "../components/DetailPage/EveryShareButton";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { detailData } from "../atoms/detailPageData"; // detailCommentData
import { accessToken } from "../atoms/loginTest";
import axios from "axios";

const DetailPage = () => {
  const { id } = useParams();
  const [detailInfo, setDetailInfo] = useRecoilState(detailData);
  // const [, setDetailCommentData] = useRecoilState(detailCommentData);
  const TOKEN = useRecoilValue(accessToken);

  useEffect(() => {
    if (TOKEN === "") {
      axios
        .get(`${process.env.REACT_APP_URL}/boards/${id}`)
        .then((response) => {
          setDetailInfo(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const config = {
        headers: { Authorization: TOKEN },
      };
      axios
        .get(`${process.env.REACT_APP_URL}/boards/${id}`, config)
        .then((response) => {
          setDetailInfo(response.data);
          // setDetailCommentData(response.data.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const [like, setLike] = useState(detailInfo?.upScore);
  const [dislike, setDislike] = useState(detailInfo?.downScore);
  const handleLikeClicked = () => {
    const config = {
      headers: { Authorization: TOKEN },
    };
    axios
      .post(
        `${process.env.REACT_APP_URL}/boards/${detailInfo.boardId}/up-vote`,
        {},
        config
      )
      .then(function (response) {
        setLike(response.data.scoreStatus);
      })
      .catch((error) => console.log(error));
  };
  const handleDislikeClicked = () => {
    const config = {
      headers: { Authorization: TOKEN },
    };
    axios
      .post(
        `${process.env.REACT_APP_URL}/boards/${detailInfo.boardId}/up-vote`,
        {},
        config
      )
      .then(function (response) {
        setDislike(response.data.scoreStatus);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="lg:w-[1024px]">
          <DetailHeader />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <DetailImageSlider />
            <DetailMap />
          </div>
          <div className="flex items-center justify-end">
            <AiOutlineShareAlt className="mr-1" />
            <KakaoShareButton />
            <EveryShareButton />
          </div>
          <div className="flex flex-row mt-10 justify-end">
            <button type="button" onClick={handleLikeClicked}>
              <Like props={like} />
            </button>
            <button type="button" onClick={handleDislikeClicked}>
              <Dislike props={dislike} />
            </button>
          </div>
          <OneLineComment review={detailInfo.review} />
          <CommentList />
          <CommentEditor />
        </div>
      </div>
      <NeighborhoodPlace />
      <Footer />
    </>
  );
};

export default DetailPage;
