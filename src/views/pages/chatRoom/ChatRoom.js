import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import Authenticate from "src/Authenticate";
import { useSelector } from "react-redux";
import StartComponent from "./components/StartComponent";
import "./style.css";
import { Fade } from "react-reveal";

export default function ChatRoom() {
  const user = useSelector((state) => state.user.data);
  const [chatEngineData, setChatEngineData] = useState({
    username: "",
    secret: "",
  });
  const [verifiedUser, setVerifiedUser] = useState({ chat_room: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoggedInUser();
  }, []);

  const loadLoggedInUser = () => {
    axios
      .get(
        process.env.REACT_APP_SERVER + "/user/" + user.id,
        Authenticate.header()
      )
      .then((response) => {
        console.log(response.data);
        setVerifiedUser(response.data);
        if (response.data.chat_room) {
          setChatEngineData(response.data.chat_room);
        }
        setLoading(false);
      })
      .catch((error) => console.log(error.response));
  };

  const prepareChatAccountToUser = () => {
    setLoading(true);
    var timestamp = Date.now().toString();
    axios
      .post(
        process.env.REACT_APP_SERVER + "/addChatRoomUser",
        {
          username:
            user.f_name + "-" + timestamp.slice(6, timestamp.length - 1),
        },
        Authenticate.header()
      )
      .then((response) => {
        addUserToChatEngine(response.data.username, response.data.secret);
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  };

  const addUserToChatEngine = (name, password) => {
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: name,
          secret: password,
        },
        Authenticate.headerWithChatAdmin()
      )
      .then((response) => {
        addUserToMainChat(process.env.REACT_APP_CHAT_PROJECT_CHAT_ID, name);
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  };

  const addUserToMainChat = (chatid, name) => {
    axios
      .post(
        "https://api.chatengine.io/chats/" + chatid + "/people/",
        {
          username: name,
        },
        {
          ...Authenticate.headerWithChatAdmin(),
          "Project-ID": process.env.REACT_APP_CHAT_PROJECT_ID,
          "User-Name": chatEngineData.username,
          "User-Secret": chatEngineData.secret,
        }
      )
      .then((response) => {
        loadLoggedInUser();
        console.log(response.data);
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <Fade>
      <div className="starter-style">
        <div className="chat-container">
          {loading ? (
            <h1 align="center" style={{ marginTop: 150 }}>
              Processing...
            </h1>
          ) : verifiedUser.chat_room ? (
            <div>
              <ChatEngine
                height="85vh"
                projectID="9818e1a5-4277-4eb7-bc47-a31ef69b668f"
                userName={chatEngineData.username}
                userSecret={chatEngineData.secret}
              />
            </div>
          ) : (
            <div style={{ maxWidth: 600, textAlign: "center", margin: "auto" }}>
              <StartComponent
                prepareChatAccountToUser={prepareChatAccountToUser}
              />
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
}
