import React from "react";

const Album = ({ src, reportClick, albumId, opacity }) => {
  return (
    <img
      key={`image-${albumId}`}
      src={src}
      alt={`album-art-${albumId}`}
      style={{ opacity: opacity }}
      onClick={() => {
        reportClick(albumId);
      }}
    />
  );
};

export default Album;
