import React from "react";

const Album = (props) => {
  const { src, reportLoaded } = props;
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5",
        zIndex: "2",
      }}
    >
      <img
        src={src}
        alt="album-art"
        style={{ zIndex: "1" }}
        onLoad={reportLoaded}
      />
    </div>
  );
};

export default Album;
