import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { TypingAnimation } from "./typer/TypingAnimation";
import { MdPhoneCallback } from "react-icons/md";
import { Avatar } from "./Avatar/Avatar";

export const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <div className="">
      {call.isReceivedCall && !callAccepted && (
        <div className="flex items-center justify-center mt-4 p-4 gap-4">
          <h1 className="text-2xl flex gap-2 tracking-tighter text-slate-700 font-light">
            <Avatar name={call.name} />
            {call.name} is calling
            <TypingAnimation text="..." delay={100} />{" "}
          </h1>
          <button
            type="button"
            className="bg-gradient-to-r font-mono tracking-tight from-teal-900 to-teal-600 hover:from-sky-900 hover:to-sky-500 text-zinc-100 p-2 rounded-lg text-md font-semibold flex items-center justify-center gap-2"
            onClick={answerCall}
          >
            <MdPhoneCallback />
            Answer
          </button>
        </div>
      )}
    </div>
  );
};
