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

    public draw() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.cells[y][x];
                if (cell.passable) process.stdout.write(". ");
                else process.stdout.write("##");
            }
            process.stdout.write("\n");
        }
    }

    private readFile(filename: string, consume: (text: string) => void) {
        const fs = require("fs");
        fs.readFile(filename, "utf8", (err, contents) => {
            if (err) throw err;
            consume(contents);
        });
    }
}