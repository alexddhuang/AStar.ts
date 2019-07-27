export function BreadthFirstSearch(graph, start, goal) {
    const frontier = new Queue();
    frontier.put(start);

    const cameFrom = {};
    cameFrom[start.id()] = null;

    while (!frontier.empty()) {
        const current = frontier.get();

        if (current.id() == goal.id())
            break;

        for (let next of graph.neighbors(current)) {
            if (!(next.id() in cameFrom)) {
                frontier.put(next);
                cameFrom[next.id()] = current;
            }
        }
    }

    return cameFrom;
}