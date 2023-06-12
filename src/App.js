import { useMemo } from "react";
import Grass from "./components/Grass";
import Water from "./components/Water";
import Sand from "./components/Sand";
import Rock from "./components/Rock";
import weightedRandom from "./utils/weightedRandom";

const rows = 64;
const columns = 64;

const tileTypes = [
  {
    identifier: "rock",
    density: 1,
    connectsTo: ["rock", "grass"],
    Component: Rock,
  },
  {
    identifier: "grass",
    density: 5,
    connectsTo: ["sand", "grass", "rock"],
    Component: Grass,
  },
  {
    identifier: "sand",
    density: 2,
    connectsTo: ["water", "grass", "sand"],
    Component: Sand,
  },
  {
    identifier: "water",
    density: 8,
    connectsTo: ["sand", "water"],
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
  tileMap[startY][startX] = {
    counter: getNumber(),
    ...startingTile,
  };

  const queue = [{ x: startX, y: startY }];

  while (queue.length > 0) {
    const currentTile = queue.shift();

    const neighbors = getNeighbors(currentTile.x, currentTile.y);

    neighbors.forEach((neighbor) => {
      if (tileMap[neighbor.y][neighbor.x] === null) {
        const possibleTiles = getCandidateTiles(
          neighbor.x,
          neighbor.y,
          tileMap
        );
        const selectedTile = selectTile(possibleTiles);
        tileMap[neighbor.y][neighbor.x] = {
          counter: getNumber(),
          ...selectedTile,
        };
        queue.push(neighbor);
      }
    });
  }

  return tileMap;
};

function getNumber() {
  const counter = Number(localStorage.getItem("counter"));

  localStorage.setItem("counter", counter + 1);

  return counter;
}

function selectTile(candidates) {
  const tilesDensities = candidates.map((candidate) => candidate.density);

  const randomTile = weightedRandom(candidates, tilesDensities);

  return randomTile.item;
}

function getNeighbors(x, y) {
  const neighbors = [];
  if (x > 0) neighbors.push({ x: x - 1, y });
  if (x < rows - 1) neighbors.push({ x: x + 1, y });
  if (y > 0) neighbors.push({ x, y: y - 1 });
  if (y < columns - 1) neighbors.push({ x, y: y + 1 });
  return neighbors;
}

function getCandidateTiles(x, y, tileMap) {
  const candidates = [];
  tileTypes.forEach((tile) => {
    if (tileFits(tile, x, y, tileMap)) {
      candidates.push(tile);
    }
  });
  return candidates;
}

function tileFits(tileType, x, y, tileMap) {
  // is tile already filled
  if (tileMap[y][x] !== null) {
    return false;
  }

  // get neighbor coordinates
  const neighbors = getNeighbors(x, y);

  for (const neighbor of neighbors) {
    const neighborTile = tileMap[neighbor.y][neighbor.x];
    if (neighborTile !== null) {
      const isAbleToConnect = neighborTile.connectsTo.includes(
        tileType.identifier
      );

      if (!isAbleToConnect) {
        return false;
      }
    }
  }

  return true;
}

function App() {
  localStorage.setItem("counter", 0);
  const tileMap = useMemo(() => generateTileMap(), []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {tileMap.map((row) => (
        <div style={{ display: "flex" }}>
          {row.map(({ Component, counter }) => (
            <div
              style={{ position: "relative", width: "64px", height: "64px" }}
            >
              {/* <span
                style={{
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {counter}
              </span> */}
              <Component />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
