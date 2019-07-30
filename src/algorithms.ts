import { Queue, PriorityQueue } from "./structures";
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

export function DijkstraSearch(graph: Graph, start: Node, goal: Node) {
    const frontier = new PriorityQueue();
    frontier.push(start, 0);

    const cameFrom = {};
    cameFrom[start.id()] = null;

    const costSoFar = {}
    costSoFar[start.id()] = 0;

    while (!frontier.empty()) {
        const current = frontier.pop();

        if (current.id() == goal.id())
            break;

        for (let next of graph.neighbors(current)) {
            const newCost = costSoFar[current.id()] + graph.cost(current, next);
            if (!(next.id() in costSoFar) || newCost < costSoFar[next.id()]) {
                costSoFar[next.id()] = newCost;
                const priority = newCost;
                frontier.push(next, priority);
                cameFrom[next.id()] = current;
            }
        }
    }

    return cameFrom;
}

export function AStarSearch(graph: Graph, start: Node, goal: Node) {
    const frontier = new PriorityQueue();
    frontier.push(start, 0);

    const cameFrom = {};
    cameFrom[start.id()] = null;

    const costSoFar = {}
    costSoFar[start.id()] = 0;

    while (!frontier.empty()) {
        const current = frontier.pop();

        if (current.id() == goal.id())
            break;

        for (let next of graph.neighbors(current)) {
            const newCost = costSoFar[current.id()] + graph.cost(current, next);
            if (!(next.id() in costSoFar) || newCost < costSoFar[next.id()]) {
                costSoFar[next.id()] = newCost;
                const priority = newCost + graph.heuristic(goal, next);
                frontier.push(next, priority);
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
