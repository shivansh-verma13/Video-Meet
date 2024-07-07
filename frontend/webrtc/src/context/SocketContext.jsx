// import "secure-random";
import { createContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import Peer from "simple-peer";

export const SocketContext = createContext(null);

const socket = io("https://videomeetbackend.onrender.com");

export const SocketProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const getUserCapture = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };
    getUserCapture();
    socket.on("me", (id) => setMe(id));
    socket.on("calluser", ({ signal, from, name: callerName }) => {
      console.log("Received call from:", callerName);
      setCall({
        isReceivedCall: true,
        from,
        signal,
        name: callerName,
      });
    });
    return () => {
      socket.off("me");
      socket.off("calluser");
    };
  }, []);

  const getVideoStream = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return videoStream;
  };

  const getAudioStream = async () => {
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    return audioStream;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      // setName(call.name);
      peer.signal(signal);
      console.log(call.name);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        setName,
        name,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        getVideoStream,
        getAudioStream,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
