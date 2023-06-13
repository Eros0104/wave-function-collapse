const Tile = ({ srcImg }) => {
  return (
    <img
      src={srcImg}
      style={{ imageRendering: "pixelated" }}
      width={16}
      height={16}
    />
  );
};

export default Tile;
