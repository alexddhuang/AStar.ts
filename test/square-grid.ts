import { Node, Graph } from "../dist/graph";

export class Location implements Node {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class SquareGrid implements Graph {
    protected width: number;
    protected height: number;
    protected walls: Location[];

    constructor(width?: number, height?: number) {
        this.width = width;
        this.height = height;
        this.walls = [];
    }

    public inBounds(location: Location): boolean {
        const x = location.x;
        const y = location.y;
        return 0 <= x && x < this.width && 0 <= y && y < this.height;
    }

    public passable(location: Location): boolean {
        const x = location.x;
        const y = location.y;
        for (let brick of this.walls) {
            if (brick.x == x && brick.y == y)
                return false;
        }
        return true;
    }

    public neighbors(node: Node): Node[] {
        const location = <Location>node;
        const x = location.x;
        const y = location.y;

        let results = [
            new Location(x-1,y),
            new Location(x,y-1),
            new Location(x+1,y),
            new Location(x,y+1),
        ];

        results = results.filter(loc => this.inBounds(loc));
        results = results.filter(loc => this.passable(loc));

        return results;
    }
}