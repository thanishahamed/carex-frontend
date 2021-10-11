import { CContainer, CInput } from "@coreui/react";
import { Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TheLandingPageHeader from "src/containers/TheLandingPageHeader";
import SearchIcon from "@material-ui/icons/Search";
import PostItem from "./components/PostItem";
import { Fade } from "react-reveal";
import { useHistory } from "react-router";
import OurServicesContent from "../ourservices/OurServicesContent";

export default function LoggedOutPostsList() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <TheLandingPageHeader />
      <CContainer
        size="sm"
        style={{ paddingTop: 70, backgroundColor: "#F7F7F7" }}
      >
        <Button
          variant="outlined"
          color="default"
          onClick={() => history.goBack()}
        >
          {" "}
          <ArrowBackIcon /> Back{" "}
        </Button>
        <Typography variant="h2" align="center">
          {" "}
          Community Posts & Services{" "}
        </Typography>
        {/* <div className="text-center py-4">
          {" "}
          <SearchIcon style={{ fontSize: 45 }} />
          <CInput type="text" />{" "}
        </div> */}
        <h4 align="center" className="py-3">
          {" "}
          Displaying Latest Posts & Services{" "}
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {/* <Fade>
                            <PostItem 
                                id = {15} 
                                title = {"School Services"}
                                body = {"We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} 
                                image = {"https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"}
                            />

                            <PostItem 
                                id = {12} 
                                title = {"School Services"}
                                body = {"We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} 
                                image = {"https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"}
                            />

                            <PostItem 
                                id = {34} 
                                title = {"School Services"}
                                body = {"We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} 
                                image = {"https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"}
                            />

                            <PostItem 
                                id = {11} 
                                title = {"School Services"}
                                body = {"We offered aLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} 
                                image = {"https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"}
                            />
                        </Fade> */}
          <OurServicesContent />
        </div>
      </CContainer>
    </div>
  );
}
