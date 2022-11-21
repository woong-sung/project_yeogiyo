import { VscKey } from "react-icons/vsc";
import { TiPencil } from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { Link } from "react-router-dom";

const ListModal = ({ offModal }) => {
  return (
    <div className="p-1 w-40 h-24 mt-8 bg-white text-[rgb(83,199,240)] text-sm rounded-2xl border-2 flex flex-col align-middle absolute">
      <div className="flex justify-end rounded-full">
        <AiOutlineCloseCircle
          onClick={offModal}
          className="items-end cursor-pointer p-0 m-0"
          size="18"
          color="#bab9b2"
        />
      </div>
      <ul className="pr-5 pl-5 gap-2">
        {/* <Link to="/mypage/editmyinfo"> */}
        <li className="mb-2 flex flex-row justify-between">
          기본 목록
          <TiPencil size="18" />
        </li>
        {/* </Link> */}
        {/* <Link to="/mypage/editpassword"> */}
        <li className="flex flex-row justify-between">
          부산역 여행
          <VscKey size="18" />
        </li>
        {/* </Link> */}
      </ul>
    </div>
  );
};

export default ListModal;
