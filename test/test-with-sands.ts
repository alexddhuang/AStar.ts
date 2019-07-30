import { DrawableGrid } from "./grid-drawable";
import { Cell } from "./grid";
import { BreadthFirstSearch, BuildPath, DijkstraSearch, AStarSearch } from "../dist/algorithms";

const grid = new DrawableGrid;
grid.buildFromFile("grid-with-sands.txt", () => {
    grid.draw();
    console.log(`-----------------------------------------------------\n`);

    const start: [number, number] = [8, 7];
    const goal: [number, number] = [18, 5];
    grid.draw(start, goal);
    console.log(`-----------------------------------------------------\n`);

    const cameFrom = DijkstraSearch(grid, grid.cell(start), grid.cell(goal));
    grid.draw(start, goal, cameFrom);
    console.log(`-----------------------------------------------------\n`);

    const path = BuildPath(cameFrom, grid.cell(start), grid.cell(goal));
    grid.draw(start, goal, cameFrom, <Cell[]>path);
    console.log(`-----------------------------------------------------\n`);

    const cameFrom2 = AStarSearch(grid, grid.cell(start), grid.cell(goal));
    const path2 = BuildPath(cameFrom2, grid.cell(start), grid.cell(goal));
    grid.draw(start, goal, cameFrom2, <Cell[]>path2);
});