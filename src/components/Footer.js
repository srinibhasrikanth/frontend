import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#3893c2",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        position: "fixed",
        left: "0",
        marginTop: "10px",
        bottom: "0",
        width: "100%",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Your Website. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
