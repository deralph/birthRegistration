import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            We are a team of developers and public-health experts who built this
            system in 2024 to simplify birth registration. With React, Node.js,
            and MongoDB, we created a smart, user-friendly tool that replaces
            paper with secure digital records.
          </p>
          <p>We work with real clinics and real users.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
