import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useNavigate } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdCall } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";

const socket = io("http://localhost:8080");

export default function VideoPage() {
  const [myself, setMyself] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] =
    useState(false);
  const [callAccepted, setCallAccepted] =
    useState(false);
  const [callEnded, setCallEnded] =
    useState(false);
  const [users, setUsers] = useState({});
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] =
    useState();

  const myVideo = useRef();
  const peerVideo = useRef();
  const connectionRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    //set myself as id of came back from server//
    socket.on("me", (id) => {
      setMyself(id);
    });

    socket.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    // set camera and audio on and set as a current stream//
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
  }, []);

  //function for making call//
  const callUser = (id) => {
    // a peer for caller//
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: myself,
      });
    });

    peer.on("stream", (stream) => {
      if (peerVideo.current) {
        peerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  //function for receiving a call//
  const answerCall = () => {
    setCallAccepted(true);
    // crete a peer for receiver//

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: caller,
      });
    });

    peer.on("stream", (stream) => {
      peerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  // function for  peer and me leaving the call//
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const createCallButton = Object.keys(users).map(
    (key, i, arr) => {
      if (
        key !== myself &&
        arr[arr.length - 1] === key
      ) {
        return (
          <div key={i} className="btn-video">
            <span onClick={() => callUser(key)}>
              Call
            </span>
            <FaVideo className="video__icon" />
          </div>
        );
      } else {
        return null;
      }
    }
  );

  const backToMain = () => {
    navigate("/");
  };

  return (
    <div className="video">
      <div className="video__container">
        <div className="video__left">
          {callAccepted && !callEnded ? (
            <video
              className="video__peer"
              playsInline
              ref={peerVideo}
              autoPlay
            />
          ) : (
            <div className="video__peer-empty">
              {receivingCall && !callAccepted ? (
                <p className="video__receive">
                  {" "}
                  Receiving Call...
                  <FiPhoneCall />
                </p>
              ) : (
                <p>
                  {" "}
                  Your professional will call
                  you....
                </p>
              )}

              <img
                src="https://cdn-icons-png.flaticon.com/512/3062/3062992.png"
                alt="iconImage"
              />
            </div>
          )}
        </div>

        <div className="video__right">
          <div>
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="video__myself"
              />
            )}
          </div>

          <div>
            {callAccepted && !callEnded ? (
              <button
                className="btn-video"
                onClick={leaveCall}
              >
                End Call
                <MdCallEnd className="video__icon" />
              </button>
            ) : (
              <div>{createCallButton}</div>
            )}
          </div>
          <div>
            {receivingCall && !callAccepted ? (
              <div>
                <button
                  className="btn-video"
                  onClick={answerCall}
                >
                  Answer
                  <MdCall className="video__icon" />
                </button>
              </div>
            ) : null}
          </div>
          <div>
            <button
              className="btn-video"
              onClick={backToMain}
            >
              Back to Main
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
