import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import Authenticate from "src/Authenticate";

export default function VoiceAssitant() {
  const [instance, setInstance] = useState(null);
  const voiceRecognition = () =>
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: (commandData) => {
        // if (commandData.command === "hello world") {
        //   logOutAlan();
        // }

        switch (commandData.command) {
          case "hello world":
            alert("Hello world");
            break;
          case "sign out":
            logOutAlan();
            break;
          default:
            console.log("commands not matched");
        }
        // console.log(commandData);
      },
    });

  const logOutAlan = () => {
    // instance.playText("ready to lgout");
    // alert("ready to logout");
    Authenticate.logout();
  };

  useEffect(() => {
    setInstance(voiceRecognition());
  }, []);
  return null;
}
