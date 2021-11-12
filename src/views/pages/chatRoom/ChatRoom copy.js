import { CButton } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import VoiceAssitant from "../voiceRecognition/VoiceAssitant";

export default function ChatRoom() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([{ message: "hsljsjldf", name: "thanish" }]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    console.log("submited");
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div>
      <h1> Chat Room </h1>
      <form onSubmit={onMessageSubmit}>
        <TextField
          name="name"
          onChange={(e) => onTextChange(e)}
          value={state.name}
          label={"Name"}
        />

        <TextField
          name="message"
          onChange={(e) => onTextChange(e)}
          value={state.message}
          label={"Message"}
        />

        <button type="submit"> Send Message </button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
      <VoiceAssitant />
    </div>
  );
}
