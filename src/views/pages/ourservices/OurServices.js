import React, { useEffect } from "react";
import { CContainer, CInput } from "@coreui/react";
import TheLandingPageHeader from "src/containers/TheLandingPageHeader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ServiceCard from "./components/ServiceCard";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Typography } from "@material-ui/core";
import { Fade } from "react-reveal";
import { useHistory } from "react-router";
import OurServicesContent from "./OurServicesContent";

export default function OurServices() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <TheLandingPageHeader />
      <div style={{ paddingTop: 100 }}>
        <CContainer size="sm">
          <Button
            variant="outlined"
            color="default"
            onClick={() => history.goBack()}
          >
            {" "}
            <ArrowBackIcon /> Back{" "}
          </Button>
          <Typography className="py-3" variant="h2" align="center">
            {" "}
            Our Services{" "}
          </Typography>
          <OurServicesContent />
        </CContainer>
      </div>
    </div>
  );
}
