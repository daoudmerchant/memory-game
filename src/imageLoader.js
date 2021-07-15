// Import all images (Webpack)
const importAll = (r) => {
  console.log("Importing images");
  let albums = [];
  r.keys().forEach((item) => {
    albums.push({
      ...r(item),
      // picture count begins at 1
      id: Number(item.slice(2, 4)) - 1,
      clicked: false,
      style: {
        display: "none",
      },
    });
  });
  return albums;
};
const images = importAll(require.context("./blue-note", false, /\.jpg$/));

export { images };
