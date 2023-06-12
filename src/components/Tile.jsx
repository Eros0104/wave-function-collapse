const Tile = ({ srcImg }) => {
  return <img src={srcImg} style={{ imageRendering : "pixelated" }} width={64} height={64} />
}

export default Tile;