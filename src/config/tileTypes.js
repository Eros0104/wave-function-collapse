const tilesConfig = [
  {
    identifier: "tree",
    density: 3,
    connectsTo: ["tree", "grass"],
    Component: "tiles/trees/tree-tile.png",
  },
  ,
  {
    identifier: "rock",
    density: 1,
    connectsTo: ["rock", "grass", "tree"],
    Component: "rock-tile.png",
  },
  {
    identifier: "grass",
    density: 6,
    connectsTo: ["sand", "grass", "rock", "tree"],
    Component: "grass-tile.png",
  },
  {
    identifier: "sand",
    density: 3,
    connectsTo: ["grass", "sand", "sand-1"],
    Component: `tiles/Ground/sand/${0}.png`,
  },
  {
    identifier: "sand-1",
    density: 3,
    connectsTo: ["sand-1", "sand"],
    Component: `tiles/Ground/sand/${1}.png`,
  },    
  {
    identifier: "water",
    density: 6,
    connectsTo: ["sand-1", "water"],
    Component: "water-tile.gif",
  },
];

export default tilesConfig;
