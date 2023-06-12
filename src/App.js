import Grass from "./components/Grass";
import Water from "./components/Water";
import Sand from "./components/Sand";
const rows = 64;
const columns = 64;

const tileTypes = [
  {
    identifier: "grass",
    Component: Grass,
  },
  {
    identifier: "sand",
    Component: Sand,
  },
  {
    identifier: "water",
    Component: Water,
  },
];

function getRandomTile() {
  return tileTypes[Math.floor(Math.random() * tileTypes.length)];
}

const generateTileMap = () => {
  const tileMap = [];
  for (let i = 0; i < rows; i++) {
    tileMap[i] = [];
    for (let j = 0; j < columns; j++) {
      tileMap[i][j] = null;
    }
  }

  const startX = Math.floor(Math.random() * rows);
  const startY = Math.floor(Math.random() * columns);

  const startingTile = getRandomTile();
  tileMap[startY][startX] = startingTile;

  const queue = [{ x: startX, y: startY }];

  while (queue.length > 0) {
    const currentTile = queue.shift();

    const neighbors = getNeighbors(currentTile.x, currentTile.y);

    neighbors.forEach((neighbor) => {
      if (tileMap[neighbor.y][neighbor.x] === null) {
        const possibleTiles = getCandidateTiles(neighbor.x, neighbor.y);
        const selectedTile = selectTile(possibleTiles);
        tileMap[neighbor.y][neighbor.x] = selectedTile;
        queue.push(neighbor);
      }
    });
  }

  return tileMap;
};

function selectTile(candidates) {
  let random = Math.floor(Math.random() * candidates.length);
  return candidates[random];
}

function getNeighbors(x, y) {
  const neighbors = [];
  if (x > 0) neighbors.push({ x: x - 1, y });
  if (x < rows - 1) neighbors.push({ x: x + 1, y });
  if (y > 0) neighbors.push({ x, y: y - 1 });
  if (y < columns - 1) neighbors.push({ x, y: y + 1 });
  return neighbors;
}

function getCandidateTiles(x, y) {
  const candidates = [];
  tileTypes.forEach((tile) => {
    if (tileFits(tile, x, y)) {
      candidates.push(tile);
    }
  });
  return candidates;
}

function tileFits(tile, x, y) {
  return true;
}

function App() {
  const tileMap = generateTileMap();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {tileMap.map((row) => (
        <div style={{ display: "flex" }}>
          {row.map(({ Component }) => (
            <Component />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
