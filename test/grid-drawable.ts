import { Grid, Cell } from "./grid";

export class DrawableGrid extends Grid {

    public buildFromFile(filename: string, callback: () => void) {
        this.cells = [];

        this.readFile(filename, (text) => {
            const lines = text.split("\n");

            this.height = lines.length;
            if (this.height == 0)
                return;

            this.width = lines[0].length / 2;
            if (this.width == 0)
                return;

            for (let j = 0; j < this.height; j++) {
                const row = [];
                this.cells.push(row);

                const line = lines[j];
                for (let i = 0; i < line.length; i += 2) {
                    const x = i / 2;
                    const y = j;
                    const id = y * this.width + x;
                    const point = line.slice(i, i+2);
                    const cell = new Cell(id, x, y, point == "##" ? false : true);
                    row.push(cell);
                }
            }

            callback();
        });
    }

    public draw(start?: [number, number], goal?: [number, number], cameFrom?: Object, path?: Cell[]) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.cells[y][x];
                if (cell.passable) {
                    if (start && start[0] == x && start[1] == y) process.stdout.write("A ");
                    else if (goal && goal[0] == x && goal[1] == y) process.stdout.write("Z ");
                    else if (cameFrom && cameFrom[cell.id()]) {
                        let inPath = false;
                        if (path) {
                            for (let p of path) {
                                if (cell.id() == p.id()) {
                                    inPath = true;
                                    break;
                                }
                            }
                        }
                        if (inPath) process.stdout.write("* ");
                        else {
                            const prev: Cell = cameFrom[cell.id()];
                            if      (prev.x == x && prev.y < y) process.stdout.write("v ");
                            else if (prev.x < x && prev.y == y) process.stdout.write("> ");
                            else if (prev.x == x && prev.y > y) process.stdout.write("^ ");
                            else if (prev.x > x && prev.y == y) process.stdout.write("< ");
                        }
                    } else process.stdout.write(". ");
                } else process.stdout.write("##");
            }
            process.stdout.write("\n");
        }
    }

    public cell(location: [number, number]): Cell {
        const x = location[0];
        const y = location[1];
        return this.cells[y][x];
    }

    private readFile(filename: string, consume: (text: string) => void) {
        const fs = require("fs");
        fs.readFile(filename, "utf8", (err, contents) => {
            if (err) throw err;
            consume(contents);
        });
    }
}