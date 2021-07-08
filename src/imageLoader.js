// Import all images (Webpack)
const importAll = (r) => {
  console.log("Importing images");
  let albums = {};
  r.keys().forEach((item) => {
    albums[item.replace("./", "")] = {
      ...r(item),
      id: item.slice(2, 4),
      clickCount: 0,
    };
  });
  return albums;
};
const images = importAll(require.context("./blue-note", false, /\.jpg$/));

export { images };
