import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SocketContext } from "../context/SocketContext";
import { useContext, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { MdCallEnd } from "react-icons/md";
import { IoCall } from "react-icons/io5";

export const Options = ({ children }) => {
  const { me, callAccepted, name, setName, leaveCall, callUser, callEnded } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");
  const [callingDisabled, setCallingDisabled] = useState(false);
  const [callIdButtonDisabled, setCallIdButtonDisabled] = useState(false);

  const handleCall = async (idToCall) => {
    try {
      setCallingDisabled(true);
      await callUser(idToCall);
      setCallingDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-5 font-sans options">
      <div className="bg-zinc-50 rounded-lg p-10 m-5 text-black shadow-md shadow-slate-700">
        <form noValidate autoComplete="off">
          <div className="flex gap-20 text-center optionsFormDiv">
            <div className="flex flex-col w-1/2">
              <h6 className="font-bold text-3xl pb-5 drop-shadow-md font-serif tracking-tighter text-slate-700 optionHeading">
                Account Info
              </h6>
              <input
                className="optionInput text-zinc-400 border-b-2 rounded-md p-1 text-lg"
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CopyToClipboard text={me}>
                <button
                  type="button"
                  disabled={callIdButtonDisabled}
                  onClick={() => setCallIdButtonDisabled(true)}
                  className="callButton bg-gradient-to-r font-mono tracking-tight from-blue-900 to-blue-600 hover:from-indigo-950 hover:to-indigo-500 text-zinc-100 mt-5 p-2 rounded-lg text-md font-semibold flex items-center justify-center gap-2"
                >
                  Copy Your ID <FaCopy />
                </button>
              </CopyToClipboard>
            </div>
            <div className="flex flex-col w-1/2">
              <h6 className="font-bold text-3xl pb-5 font-serif drop-shadow-md tracking-tighter optionHeading">
                Make a call
              </h6>
              <input
                className="optionInput text-zinc-400 border-b-2 rounded-md p-1 text-lg"
                label="ID To Call"
                placeholder="ID to Call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
              />
              {callAccepted && !callEnded ? (
                <button
                  type="button"
                  className="callButton bg-gradient-to-r font-mono tracking-tight from-red-900 to-red-600 hover:from-rose-900 hover:to-rose-500 text-white mt-5 p-2 rounded-lg text-md font-semibold flex items-center justify-center gap-2"
                  onClick={leaveCall}
                >
                  <MdCallEnd /> Hang Up
                </button>
              ) : (
                <button
                  type="button"
                  disabled={callingDisabled}
                  className={`callButton bg-gradient-to-r font-mono tracking-tight from-green-900 to-green-600 ${
                    callingDisabled
                      ? ""
                      : "hover:from-lime-950 hover:to-lime-500"
                  } text-white mt-5 p-2 rounded-lg text-md font-semibold flex items-center justify-center gap-2`}
                  onClick={() => handleCall(idToCall)}
                >
                  <IoCall /> Call
                </button>
              )}
            </div>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
};

Options.propTypes = {
  children: PropTypes.any,
};
