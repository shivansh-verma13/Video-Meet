import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
// import { AiFillAudio } from "react-icons/ai";
// import { BsMicMuteFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";

export const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    getVideoStream,
    getAudioStream,
  } = useContext(SocketContext);

  useEffect(() => {
    console.log(call.name);
  }, [call.name]);

  // const [isMutedUser, setIsMutedUser] = useState(false);
  // const [isMutedOwn, setIsMutedOwn] = useState(true);
  const [isOwnVideoOn, setIsOwnVideoOn] = useState(true);

  const toggleCamera = async () => {
    if (isOwnVideoOn) {
      myVideo.current.srcObject = await getAudioStream();
      setIsOwnVideoOn(false);
    } else {
      myVideo.current.srcObject = await getVideoStream();
      setIsOwnVideoOn(true);
    }
  };

  return (
    <div className="videoPlayer flex gap-2 justify-center items-center p-4 w-full">
      {/* Our Own Video */}
      {stream && (
        <div
          className={
            "flex flex-col justify-center items-center relative  h-3/4 rounded-lg p-2 " +
            (stream && !callAccepted ? "w-1/2" : "w-1/2")
          }
        >
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className="rounded-md w-full hover:shadow-md hover:shadow-zinc-700"
          />
          {!isOwnVideoOn && (
            <div className="w-full h-1/2 absolute  rounded-full flex items-center justify-center text-slate-700 bg-blue-300">
              <div className="text-center mb-2 w-full opacity-70 font-black text-6xl">
                {name ? name[0] : "You"}
              </div>
            </div>
          )}
          <h5 className="font-bold text-md text-zinc-300 mt-5 text-center absolute bottom-5 left-5">
            {name || "You"}
          </h5>
          <div className="buttonsDiv flex gap-5 mt-5 absolute bottom-4">
            {/* <button
              onClick={() => setIsMutedOwn((prev) => !prev)}
              className="w-12 h-12 rounded-full text-2xl bottom-5 bg-slate-700 flex items-center justify-center"
            >
              {isMutedOwn ? (
                <BsMicMuteFill className="text-red-500" />
              ) : (
                <AiFillAudio />
              )}
            </button> */}
            <button
              type="button"
              onClick={toggleCamera}
              // style={{ left: "20px" }}
              className="w-12 h-12 rounded-full text-2xl bottom-5 bg-slate-700 flex items-center justify-center"
            >
              {isOwnVideoOn ? (
                <BsFillCameraVideoFill />
              ) : (
                <BsFillCameraVideoOffFill className="text-red-500" />
              )}
            </button>
          </div>
        </div>
      )}
      {/* User's Video */}
      {callAccepted && !callEnded && (
        <div className="flex flex-col justify-center relative items-center rounded-lg p-2 w-1/2 h-3/4">
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className="rounded-md w-full hover:shadow-md hover:shadow-zinc-700"
          />
          <h5 className="font-bold text-md absolute text-zinc-300 mt-5 bottom-5 left-10">
            {call.name || "User"}
          </h5>
          {/* {isMutedOwn ? (
            <BsMicMuteFill className="text-red-500 absolute top-5 right-5 w-8 h-8 rounded-full text-lg" />
          ) : (
            <AiFillAudio className="text-white absolute top-5 right-5 w-8 h-8 rounded-full text-lg" />
          )} */}
          {/* <button
            type="button"
            onClick={() => setIsMutedUser((prev) => !prev)}
            className="w-12 h-12 rounded-full text-2xl absolute bottom-5 bg-slate-700 flex items-center justify-center"
          >
            {isMutedUser ? (
              <BsMicMuteFill className="text-red-500" />
            ) : (
              <AiFillAudio />
            )}
          </button> */}
        </div>
      )}
    </div>
  );
};
