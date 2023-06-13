import Tile from "./Tile";

const Sand = ({ waterDepth }) => {
  const depth = waterDepth || 0;
  return <Tile srcImg={`tiles/Ground/sand/${depth}.png`} />;
};

export default Sand;
