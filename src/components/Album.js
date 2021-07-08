import React from "react";

const Album = (props) => {
  const { src, reportLoaded, albumId } = props;
  return (
    <img
      key={`image-${albumId}`}
      src={src}
      alt="album-art"
      onLoad={reportLoaded}
    />
  );
};

export default Album;
