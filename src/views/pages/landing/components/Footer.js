import React from "react";
import logo from "../../../../assets/pictures/logo-white-sm.png";

const styles = {
  bodyStyle: {
    marginTop: "-140vh",
    minHeight: 400,
    // backgroundColor: "#333",
    backgroundColor: "#154360",
    color: "#ddd",
    padding: 30,
  },
};
export default function Footer() {
  return (
    <div style={styles.bodyStyle}>
      <img src={logo} width="200px" />
      <h6>
        A social service community which supports to save thousands of lives.
      </h6>
      <hr />
      <h5>Our partners</h5>
    </div>
  );
}
