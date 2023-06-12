import Grass from "./components/Grass";
import Water from "./components/Water";
const rows = 32;
const columns = 32;

const generateTileMap = () => {
  const tileMap = [];
  for (let i = 0; i < rows; i++) {
    tileMap[i] = [];
    for (let j = 0; j < columns; j++) {
      const randomBoolean = Math.random() < 0.5;
      tileMap[i][j] = randomBoolean ? "grass" : "water";
    }
  }
  return tileMap;
};

function App() {
  const tileMap = generateTileMap();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {tileMap.map((row) => (
        <div style={{ display: "flex" }}>
          {row.map((column) => (column === "grass" ? <Grass /> : <Water />))}
        </div>
      ))}
    </div>
  );
}

export default App;
