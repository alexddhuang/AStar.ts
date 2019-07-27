import { Queue } from "./structures";

export function BreadthFirstSearch(graph, start, goal) {
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