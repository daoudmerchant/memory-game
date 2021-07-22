import React from "react";

// pure component
const Album = React.memo(
  ({ src, reportClick, albumId, opacity, filterColor }) => {
    const onClickClass = filterColor ? filterColor[albumId] : "clickableImg";
    return (
      <img
        key={`image-${albumId}`}
        src={src}
        alt={`album-art-${albumId}`}
        style={{ opacity: opacity }}
        className={onClickClass}
        onClick={() => {
          reportClick(albumId);
        }}
      />
    );
  }
);

export default Album;
