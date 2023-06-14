import React, { useEffect, useRef } from "react";

const TileMapCanvas = ({ mapData, tileSize }) => {
  const canvasRef = useRef(null);

  const numRows = mapData.length;
  const numColumns = numRows > 0 ? mapData[0].length : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Resize canvas to match the size of the tile map
    canvas.width = numColumns * tileSize;
    canvas.height = numRows * tileSize;
    canvas.style.imageRendering = "pixelated";
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Render the tile map
    mapData.forEach((row, y) => {
      row.forEach((tile, x) => {
        const { Component } = tile;
        const tileX = x * tileSize;
        const tileY = y * tileSize;

        if (Component) {
          const tileImage = new Image();
          tileImage.src = Component;

          tileImage.onload = () => {
            context.drawImage(tileImage, tileX, tileY, tileSize, tileSize);
          };
        }
      });
    });
  }, [mapData, tileSize]);

  return <canvas ref={canvasRef} />;
};

export default TileMapCanvas;
