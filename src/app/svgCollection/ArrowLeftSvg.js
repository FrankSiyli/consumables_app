import { useRecoilState } from "recoil";
import { activeComponentState } from "../recoil/atoms/activeComponentState";

const ArrowLeftSvg = ({ setActiveComponentByArrow }) => {
  const [, setActiveComponent] = useRecoilState(activeComponentState);

  const handleButtonClick = () => {
    setActiveComponent(setActiveComponentByArrow);
  };

  return (
    <div
      className="fixed left-5 lg:left-20 top-28 backdrop-blur-3xl rounded border-2 border-white dark:border-[#1c1c1c]"
      onClick={handleButtonClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-9 h-9 cursor-pointer hover:scale-105 hover:text-appOrange transform transition-all duration-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
};

export default ArrowLeftSvg;
