/**
 * A simple graph wherein each node is represented by an ID.
 */
export class SimpleGraph {
    private edges = {};

    public neighbors(id: number|string) {
        return this.edges[id];
    }
}
