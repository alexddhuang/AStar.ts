import { DrawableSquareGrid } from "./drawable-square-grid";

const grid = new DrawableSquareGrid();
grid.buildFromFile("grid.txt", () => {
    DrawableSquareGrid.draw(grid);
});
