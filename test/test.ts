import { DrawableGrid } from "./grid-drawable";
import { BreadthFirstSearch } from "../dist/algorithms";

const grid = new DrawableGrid;
grid.buildFromFile("grid.txt", () => {
    grid.draw();
    console.log(`-----------------------------------------------------\n`);

    const start: [number, number] = [8, 7];
    const goal: [number, number] = [18, 5];
    grid.draw(start, goal);
    console.log(`-----------------------------------------------------\n`);

    const cameFrom = BreadthFirstSearch(grid, grid.cell(start), grid.cell(goal));
    grid.draw(start, goal, cameFrom);
});