import { Node, Graph } from "../dist/graph";

export class Cell implements Node {
    protected _id: number;
    public x: number;
    public y: number;
    public passable: boolean;
    public weight: number;

    constructor(id: number, x: number, y: number, passable: boolean, weight?: number) {
        this._id = id;
        this.x = x;
        this.y = y;
        this.passable = passable;
        this.weight = weight ? weight : 0;
    }

    public id(): number {
        return this._id;
    }
}

export class Grid implements Graph {
    protected width: number;
    protected height: number;
    protected cells: Cell[][];

    public neighbors(cell: Cell): Cell[] {
        const x = cell.x;
        const y = cell.y;

        let locations = [
            [x, y-1],
            [x-1, y],
            [x, y+1],
            [x+1, y],
        ];

        const results = [];
        locations.forEach(loc => {
            const x = loc[0];
            const y = loc[1];

            if (this.inBounds(x, y) && this.cells[y][x].passable) {
                results.push(this.cells[y][x]);
            }
        });

        return results;
    }

    public cost(current: Cell, next: Cell): number {
        return next.weight;
    }

    protected inBounds(x: number, y: number): boolean {
        return 0 <= x && x < this.width && 0 <= y && y < this.height;
    }
}