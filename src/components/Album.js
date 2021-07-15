import React from "react";

const Album = (props) => {
  const { src, reportLoaded, reportClick, albumId } = props;
  return (
    <img
      key={`image-${albumId}`}
      src={src}
      alt="album-art"
      onLoad={reportLoaded}
      onClick={() => {
        console.log("Reporting click");
        reportClick(albumId);
      }}
    />
  );
};

export default Album;
