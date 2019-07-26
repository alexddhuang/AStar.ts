class SimpleGraph {
    private edges = {};

    public neighbors(id: number|string) {
        return this.edges[id];
    }
}
