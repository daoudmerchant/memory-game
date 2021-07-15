import React from "react";

const Album = ({ src, reportClick, albumId }) => {
  return (
    <img
      key={`image-${albumId}`}
      src={src}
      alt={`album-art-${albumId}`}
      onClick={() => {
        reportClick(albumId);
      }}
    />
  );
};

export default Album;
