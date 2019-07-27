import { Queue } from "./structures";
import { Node, Graph } from "./graph";

export function BreadthFirstSearch(graph: Graph, start: Node, goal: Node) {
    const frontier = new Queue();
    frontier.put(start);

    const came_from = new Map();
    came_from.set(start, null);

    // expanding the frontier
    while (!frontier.empty()) {
        const current = frontier.get();
        
        if (current == goal) // early exit
            break;

        for (const next in graph.neighbors(current)) {
            if (!(next in came_from)) {
                frontier.put(next);
                came_from[next] = current;
            }
        }
    }

    // construct the path
    let current = goal;
    const path = [];
    while (current != start) {
        path.unshift(current);
        current = came_from.get(current);
    }
    path.unshift(current);

    return path;
}
