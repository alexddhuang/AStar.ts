import { Location, SquareGrid } from "./square-grid";

export class DrawableSquareGrid extends SquareGrid {

    public static draw(grid: DrawableSquareGrid) {
        for (let j = 0; j < grid.height; j++) {
            for (let i = 0; i < grid.width; i++) {
                process.stdout.write(grid.passable(new Location(i, j)) ? ". " : "##");
            }
            process.stdout.write("\n");
        }
    }

    public buildFromFile(filename: string, callback: () => void) {
        this.readFile(filename, (text) => {
            const lines = text.split("\n");
                    
            this.height = lines.length;
            if (this.height <= 0)
                return;
            
            this.width = lines[0].length / 2;
            if (this.width <= 0)
                return;

            for (let j = 0; j < lines.length; j++) {
                const line = lines[j];
                for (let i = 0; i < line.length; i += 2) {
                    const point = line.slice(i, i+2);
                    if (point == "##") {
                        this.walls.push(new Location(i / 2, j));
                    }
                }
            }   

            if (callback) callback();
        });
    }

    private readFile(filename: string, parse: (text: string) => void) {
        const fs = require("fs");
        fs.readFile(filename, 'utf8', (err, contents) => {
            if (err) {
                throw err;
            }

            parse(contents);
        });
    }
}