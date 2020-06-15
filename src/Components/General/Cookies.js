import React from "react";
// import CookieConsent from "react-cookie-consent";
import CookieConsent from "react-cookie-consent";

const Cookie = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="ShopNowNow"
      style={{
        background: "rgba(0,0,0,0.85)",
        minHeight: "50px",
      }}
      buttonStyle={{
        backgroundColor: "#fff",
        fontSize: "13px",
        padding: "10px",
        width: "100px",
       
      }}
      expires={100}
    >
      <p>
        We use cookies to personalise content and ads, to provide social media
        features and to analyse our traffic.<br/> We also share information about
        your use of our site with our social media, advertising and analytics
        partners{" "}
      </p>
    </CookieConsent>
  );
};

export default Cookie;
