import axios from "axios";
import React, { useEffect, useState } from "react";
import Authenticate from "src/Authenticate";
import "../posts.css";
import UrgentInfoContainer from "./UrgentInfoContainer";

const UrgentInfo = (props) => {
  const [posts, setPosts] = useState([]);
  const [available, setAvailable] = useState([]);
  useEffect(() => {
    loadPosts();
    setInterval(() => loadPosts(), 10000);
  }, []);

  const loadPosts = async () => {
    try {
      let response = await axios.post(
        process.env.REACT_APP_SERVER + "/get-all-services",
        {},
        Authenticate.header()
      );
      setPosts(response.data.posts);
      setAvailable(response.data.available);
      // console.log("ready");
      // console.log("printing posts", response.data);
    } catch (error) {}
  };

  return (
    <div>
      <h4> LIVE SERVICE UPDATES </h4>
      <div className="info-display-area">
        {available.map((p, id) => {
          return <UrgentInfoContainer key={id} post={p} />;
        })}

        {posts.map((post, id) => {
          return <UrgentInfoContainer key={id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default UrgentInfo;
