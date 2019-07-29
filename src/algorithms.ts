import { Queue } from "./structures";
import { Node, Graph } from "./graph";

export function BreadthFirstSearch(graph: Graph, start: Node, goal: Node) {
    const frontier = new Queue();
    frontier.push(start);

    const cameFrom = {};
    cameFrom[start.id()] = null;

    while (!frontier.empty()) {
        const current = frontier.pop();

        if (current.id() == goal.id())
            break;

        for (let next of graph.neighbors(current)) {
            if (!(next.id() in cameFrom)) {
                frontier.push(next);
                cameFrom[next.id()] = current;
            }
        }
    }

    return cameFrom;
}

export function BuildPath(cameFrom: Object, start: Node, goal: Node): Node[] {
    const path = [];
    let current = goal;
    while (current.id() != start.id()) {
        path.unshift(current);
        current = cameFrom[current.id()];
    }
    return path;
}
