import { CInput } from "@coreui/react";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import ServiceCard from "./components/ServiceCard";
import { SearchRounded } from "@material-ui/icons";
import axios from "axios";

export default function OurServicesContent(props) {
  const [postsFull, setPostsFull] = useState([]);
  const [posts, setPosts] = useState([]);
  const [available, setAvailable] = useState([]);

  const styles = {
    landingStyle: {
      display: "flex",
      flexDirection: "row",
      scrollBehavior: "smooth",
      overflowX: "scroll",
      minHeight: "190px",
      width: "100%",
    },
  };
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/get-all-services")
      .then((response) => {
        setPosts(response.data.posts);
        setPostsFull(response.data.posts);
        setAvailable(response.data.available);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <div className="text-center py-4">
        {" "}
        <SearchRounded style={{ fontSize: 45 }} />
        <CInput type="text" />{" "}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {/* <ServiceCard
            id={1}
            title={"School Services"}
            body={
              "We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
            image={
              "https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"
            }
          /> */}

        <div
          style={
            props.landing
              ? styles.landingStyle
              : {
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }
          }
        >
          {posts.map((post) => {
            return (
              <ServiceCard
                id={post.id}
                title={post.title}
                body={post.body}
                image={
                  post.images.length > 0
                    ? post.images[0].url
                    : "https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"
                }
              />
            );
          })}
        </div>

        {/* <ServiceCard
            id={2}
            title={"Flood Relief Services"}
            body={
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            }
            image={
              "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/PTI_Kerala_Flood_Kochi_19_Aug_2.jpg?itok=l9SwQ5C1"
            }
          />

          <ServiceCard
            id={1}
            title={"School Services"}
            body={
              "We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
            image={
              "https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"
            }
          />

          <ServiceCard
            id={2}
            title={"Flood Relief Services"}
            body={
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            }
            image={
              "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/PTI_Kerala_Flood_Kochi_19_Aug_2.jpg?itok=l9SwQ5C1"
            }
          />

          <ServiceCard
            id={1}
            title={"School Services"}
            body={
              "We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
            image={
              "https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"
            }
          /> */}
      </div>
    </div>
  );
}
