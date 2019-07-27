import { DrawableGrid } from "./grid-drawable";

const grid = new DrawableGrid;
grid.buildFromFile("grid.txt", () => {
    grid.draw();
});