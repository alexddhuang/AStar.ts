export interface Node {
    id(): number|string;
}

export interface Graph {
    neighbors(node: Node): Node[];
    cost(current: Node, next: Node): number;
}