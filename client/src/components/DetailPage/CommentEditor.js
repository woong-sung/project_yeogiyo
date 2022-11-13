import { useState } from "react";

const CommentEditor = () => {
  const [char, setChar] = useState(0);

  const handleTextChange = (e) => {
    setChar(e.target.value.length);
  };

  return (
    <>
      <form>
        <div className="mt-14 border-2 border-gray-300 focus-within:border-[rgb(83,199,240)] p-2 h-40 group">
          <div className="flex flex-row space-x-2">
            <div className="w-6 h-6">
              <img
                src="images/profile.png"
                alt="프로필"
                className="object-fit block"
              />
            </div>
            <div>
              <span className="text-sm">유저닉네임</span>
            </div>
          </div>
          <textarea
            type="textarea"
            placeholder="댓글을 작성해보세요."
            cols="72"
            rows="4"
            maxLength="100"
            className="text-sm first-letter:text-xs w-full outline-none mt-1 break-normal resize-none"
            onChange={handleTextChange}
          />
          <div className="text-gray-300 group-focus-within:text-[rgb(83,199,240)] text-xs relative">
            {`${char} / 100`}
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button type="submit" className="btn">
            등록
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentEditor;
