import { useNavigate } from "react-router-dom";
import { PiVideoCameraFill } from "react-icons/pi";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex p-2 pl-4 text-slate-500">
      <div className="flex-grow flex gap-2 font-bold items-center p-2 text-xl">
        <PiVideoCameraFill className="text-slate-300 text-2xl font-bold cursor-pointer" onClick={() => navigate("/")} />
        MERN-
        <span className="text-slate-300 -ml-1 text-sm self-center -mb-1">VideoApp</span>
      </div>
    </div>
  );
};
