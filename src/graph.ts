export class AbstractNode {
    public cost: number = 0;
    public passable: boolean = true;
}

export class AbstractGraph {
    // A node -> neighbors map
    private graph: Map<AbstractNode, AbstractNode[]> = new Map();

    /**
     * Build a graph from edges.
     * @param edges 
     */
    public build(edges: [AbstractNode, AbstractNode][]) {
        edges.forEach(edge => {
            this.addEdge(edge);
            this.addEdge([edge[1], edge[0]]);
        });
    }

    public neighbors(node: AbstractNode): AbstractNode[] {
        const ret = [];
        const nodes = this.graph.get(node);
        nodes.forEach(node => {
            if (node.passable) ret.push(node);
        });
        return ret;
    }

    private addEdge(edge: [AbstractNode, AbstractNode]) {
        const a = edge[0];
        const b = edge[1];

        if (this.graph.has(a)) {
            const neighbors = this.graph.get(a);
            let already_there = false;
            for (const neighbor of neighbors) {
                if (neighbor === b) {
                    already_there = true;
                    break;
                }
            }
            if (!already_there) {
                neighbors.push(b);
            }
        } else {
            this.graph.set(a, [b]);
        }
    }
}